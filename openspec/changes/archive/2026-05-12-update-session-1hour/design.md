## Context

The current auth implementation uses JWT access tokens with a 60-minute `exp` claim. The inactivity timeout is enforced entirely client-side: `fetchWithAuth` proactively refreshes the token if more than 55 minutes have elapsed since the last refresh. There is no server-side session state — once a JWT is issued, it remains valid until its `exp` claim, regardless of actual user activity. Refresh tokens are stored in `localStorage`, making them accessible to JavaScript (XSS vulnerability). The auth spec also contains stale entries from before the previous session-timeout fix.

## Goals / Non-Goals

**Goals:**
- Add server-side inactivity timeout enforcement so the session is checked on every authenticated API request
- Move refresh token storage from `localStorage` to HTTP-only cookies
- Remove stale known-bug entries from the auth spec
- Keep the 60-minute inactivity timeout unchanged

**Non-Goals:**
- Password hashing with bcrypt — separate change
- Rate limiting on auth endpoints — separate change
- Multi-device session management — separate change
- JWT secret rotation — separate change

## Decisions

1. **Server-side session tracking via User `lastActivityAt` column**
   - Add a `lastActivityAt` timestamp to the User model in Prisma
   - A lightweight middleware updates it on authenticated requests (throttled to once per minute to avoid excessive writes)
   - The `authenticate` middleware checks `lastActivityAt` and rejects requests where `now - lastActivityAt > 60 minutes`
   - Alternative considered: dedicated Session table — rejected for now to keep scope minimal; User-level tracking is sufficient for single-session-per-user
   - Alternative considered: Redis — rejected to avoid new infrastructure dependencies

2. **HTTP-only cookie for refresh token**
   - Set-cookie on login and refresh responses with `HttpOnly`, `Secure` (in production), `SameSite=Strict`, and `Path=/api/auth`
   - Remove `refreshToken` from all response bodies
   - Frontend no longer stores or sends refresh tokens manually — the browser handles it via cookies
   - Alternative considered: keeping `localStorage` — rejected due to XSS vulnerability

3. **Remove client-side proactive refresh logic**
   - Since the server now enforces the inactivity timeout and refresh tokens are cookie-based, the frontend no longer needs the 55-minute proactive refresh threshold
   - `fetchWithAuth` simplifies to: attach `Authorization` header, handle 401 → redirect to login

4. **Access token still uses 60m JWT expiry**
   - The JWT `exp` claim acts as a hard upper bound; the `lastActivityAt` check provides the sliding window behavior
   - Tokens cannot exceed 60 minutes even with continuous activity (mitigation: the refresh flow issues a new access token)

## Risks / Trade-offs

- **Write amplification on every request** → Mitigation: throttle `lastActivityAt` updates to once per minute; use a simple in-memory cooldown map
- **JWT cannot be revoked mid-life** → Mitigation: 60-minute max window; on logout, clear refresh token cookie and invalidate refresh token in DB; next API call with old access token will still pass (acceptable given short window)
- **HTTP-only cookies and CSRF** → Mitigation: `SameSite=Strict` and `Path=/api/auth` limit exposure; the API does not use cookie-based auth for the access token (only for refresh), so CSRF impact is minimal
- **Clock skew** → Mitigation: server-side `lastActivityAt` uses server time, avoiding client clock issues
