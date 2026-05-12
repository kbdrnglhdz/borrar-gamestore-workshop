## 1. Backend - Access Token Lifetime

- [ ] 1.1 Change JWT `expiresIn` in `backend/src/middleware/auth.ts` from `'60m'` to `'30m'` in the `generateToken` function

## 2. Frontend - Proactive Refresh Threshold

- [ ] 2.1 Change the proactive refresh threshold constant in `frontend/src/services/api.ts` from `55 * 60 * 1000` to `25 * 60 * 1000`

## 3. Specs - Update Auth Specification

- [ ] 3.1 Update `openspec/specs/auth/spec.md` Requirement: Session Persistence timeout from 60 minutes to 30 minutes
