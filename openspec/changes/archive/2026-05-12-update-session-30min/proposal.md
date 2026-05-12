## Why

The current 60-minute session inactivity timeout leaves a wider window for unauthorized access if a user forgets to log out on a shared or public device. Reducing the timeout to 30 minutes tightens this security window while still providing a comfortable session length for active users.

## What Changes

- Reduce session inactivity timeout from 60 minutes to 30 minutes
- Update JWT access token `expiresIn` from `60m` to `30m`
- Adjust client-side proactive refresh threshold from 55 minutes to 25 minutes
- Update all related spec documentation and comments

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `auth`: Change "Session Persistence" requirement from 60 minutes to 30 minutes of inactivity

## Impact

- **Backend**: Change `expiresIn` in `backend/src/middleware/auth.ts` `generateToken()` from `'60m'` to `'30m'`
- **Frontend**: Change proactive refresh threshold in `frontend/src/services/api.ts` from 55 minutes to 25 minutes
- **Specs**: Update `openspec/specs/auth/spec.md` Requirement: Session Persistence timeout from 60 to 30 minutes
