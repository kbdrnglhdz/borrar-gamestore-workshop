## 1. Backend - Access Token Lifetime

- [ ] 1.1 Change JWT `expiresIn` in `backend/src/middleware/auth.ts` from `15m` to `60m` for access tokens

## 2. Backend - Refresh Token Rotation

- [ ] 2.1 Update `/api/auth/refresh` in `backend/src/routes/auth.ts` to generate a new refresh token, store it in the DB, and return it alongside the new access token

## 3. Frontend - Sliding Expiration

- [ ] 3.1 Update `frontend/src/services/api.ts` to track token age and proactively refresh if approaching the 60-minute expiry (55-minute threshold)
- [ ] 3.2 Update `frontend/src/services/api.ts` to store the new refresh token returned from refresh responses

## 4. Specs - Update Auth Specification

- [ ] 4.1 Update `openspec/specs/auth/spec.md` to reflect the new 60-minute inactivity timeout and sliding expiration behavior
