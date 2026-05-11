## Why

The current 15-minute session timeout expires regardless of user activity, forcing users to re-authenticate frequently even when actively using the application. This creates a poor user experience.

## What Changes

- Extend session inactivity timeout from 15 minutes to 60 minutes
- Implement sliding expiration: the 60-minute timer resets on each authenticated request
- Renew the refresh token on each refresh call so sessions can be sustained beyond 7 days with continued activity

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md -->

### Modified Capabilities
- `auth`: Change "Session Persistence" requirement from 15 minutes to 60 minutes of inactivity, and add sliding expiration behavior

## Impact

- **Backend**: Update JWT `expiresIn` in `backend/src/middleware/auth.ts` from `15m` to `60m`; implement refresh token rotation in `backend/src/routes/auth.ts`
- **Frontend**: Update `fetchWithAuth` in `frontend/src/services/api.ts` to avoid unnecessary redirects during the 60-minute window; add periodic token refresh on user activity
- **Specs**: Update `openspec/specs/auth/spec.md` Requirement: Session Persistence

## Risks
- Cambiar el TTL puede invalidar tokens existentes.
- Necesitamos migrar sesiones activas o invalidarlas.
