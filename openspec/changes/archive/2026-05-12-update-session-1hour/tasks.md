## 1. Database - Add lastActivityAt Column

- [x] 1.1 Add `lastActivityAt DateTime?` field to the User model in `backend/prisma/schema.prisma`
- [x] 1.2 Create and run Prisma migration for the new column

## 2. Backend - Server-Side Session Tracking

- [x] 2.1 Create an activity tracking utility with in-memory throttling (once-per-minute per user) in `backend/src/middleware/activity.ts`
- [x] 2.2 Update `authenticate` middleware in `backend/src/middleware/auth.ts` to check `lastActivityAt` and reject requests where inactivity exceeds the timeout
- [x] 2.3 Apply activity tracking middleware to all authenticated routes

## 3. Backend - HTTP-Only Cookie for Refresh Tokens

- [x] 3.1 Update `POST /auth/register` to set refresh token as HTTP-only cookie instead of returning in response body
- [x] 3.2 Update `POST /auth/login` to set refresh token as HTTP-only cookie instead of returning in response body
- [x] 3.3 Update `POST /auth/refresh` to read refresh token from cookie, generate new tokens, and set a new cookie
- [x] 3.4 Update `POST /auth/logout` to clear the refresh token cookie
- [x] 3.5 Install `cookie-parser` package for reading cookies from requests

## 4. Backend - Configurable Inactivity Timeout

- [x] 4.1 Read `SESSION_INACTIVITY_TIMEOUT_MINUTES` env var with a default of 60
- [x] 4.2 Use the configurable value in the session tracking middleware instead of the hardcoded 60 minutes

## 5. Frontend - Remove Client-Side Refresh Logic

- [x] 5.1 Remove `refreshToken` and `tokenTimestamp` from localStorage management in `frontend/src/services/api.ts`
- [x] 5.2 Simplify `fetchWithAuth` — remove the proactive 55-minute refresh block and the 401-triggered refresh that sends refreshToken in the body
- [x] 5.3 Update `setTokens` to only accept and store the access token
- [x] 5.4 Update `clearTokens` to not clear refreshToken from localStorage
- [x] 5.5 Update `AuthContext.login` and `register` to handle responses without refreshToken in body
- [x] 5.6 Update `AuthContext.logout` — server clears the cookie; no need to clear refreshToken locally

## 6. Specs - Update Main Auth Specification

- [x] 6.1 Sync `openspec/specs/auth/spec.md` with the delta spec changes (modified session persistence, removed stale known-bug entries, updated refresh token storage requirements)
- [x] 6.2 Create `openspec/specs/server-session/spec.md` with the new server-side session tracking capability
