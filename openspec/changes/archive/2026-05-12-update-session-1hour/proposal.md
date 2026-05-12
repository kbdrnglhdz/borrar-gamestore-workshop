## Why

The current session implementation relies entirely on JWT token expiry (60-minute `exp` claim) without server-side session tracking. Once a JWT is issued, it cannot be revoked, and the "inactivity timeout" is enforced only client-side via a proactive refresh threshold. Additionally, refresh tokens are stored in `localStorage` instead of HTTP-only cookies, and the auth spec contains stale known-bug entries from before the previous session-timeout fix. These gaps create security risks and an incomplete session management story.

## What Changes

- Implement server-side inactivity timeout tracking so sessions are enforced at the API layer, not just the client
- Migrate refresh token storage from `localStorage` to HTTP-only cookies for improved security
- Remove the stale "KNOWN BUG: Refresh token never renews automatically" from the auth spec
- Align the auth spec's refresh token requirement with the new cookie-based implementation
- Ensure the 1-hour inactivity timeout is consistently enforced across backend and frontend

## Capabilities

### New Capabilities
- `server-session`: Server-side session inactivity tracking with configurable 1-hour timeout

### Modified Capabilities
- `auth`: Update "Session Persistence" requirement to specify server-side enforcement; update refresh token storage requirement from localStorage to HTTP-only cookie; remove stale known-bug entries

## Impact

- **Backend**: Add session tracking middleware that records last-activity timestamps; update `/api/auth/refresh` and `/api/auth/login` to set HTTP-only cookies instead of returning refresh tokens in the response body; update `/api/auth/logout` to clear the cookie
- **Frontend**: Remove `refreshToken` from `localStorage` storage and `fetchWithAuth` logic; rely on HTTP-only cookie for refresh; update `fetchWithAuth` to remove client-side proactive refresh threshold (server now enforces)
- **Specs**: Update `openspec/specs/auth/spec.md` to reflect server-side session enforcement and HTTP-only cookie storage; create `openspec/specs/auth/sessions.md` for server-session capability
