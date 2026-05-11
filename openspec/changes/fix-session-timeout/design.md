## Context

The current auth implementation issues JWT access tokens with a fixed 15-minute expiration. The token's `exp` claim is set at login and never refreshed, meaning the session ends exactly 15 minutes later regardless of user activity. Additionally, the `/auth/refresh` endpoint returns the same refresh token instead of rotating it.

## Goals / Non-Goals

**Goals:**
- Extend session inactivity timeout from 15 to 60 minutes
- Implement sliding expiration: the 60-minute timer resets on each authenticated request
- Rotate refresh tokens on each refresh call

**Non-Goals:**
- Password hashing (bcrypt integration) — separate change
- Storing refresh tokens in HTTP-only cookies — separate change
- Rate limiting on auth endpoints — separate change

## Decisions

1. **JWT `exp` claim for access tokens → change from `15m` to `60m`**
   - Simplest change with immediate effect
   - Sliding expiration is achieved client-side by refreshing the token on activity, not by modifying the JWT mid-life

2. **Refresh token rotation on `/auth/refresh`**
   - Generate a new refresh token + store it in DB, then return both new access and refresh tokens
   - Prevents replay attacks and aligns with security best practices

3. **Client-side activity detection**
   - The frontend will intercept all authenticated API calls and attempt a token refresh if more than 55 minutes have passed since the last refresh
   - This avoids adding server-side session state while providing sliding window behavior

## Risks / Trade-offs

- **JWT cannot be invalidated mid-life** → Mitigation: short 60min window + refresh rotation limits exposure
- **Client-side clock drift** → Mitigation: server still validates `exp`, client uses conservative 55min threshold
- **Refresh token rotation race condition** → Mitigation: token reuse detection can be added in a future iteration
