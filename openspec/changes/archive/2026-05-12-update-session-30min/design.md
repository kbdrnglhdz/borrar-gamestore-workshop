## Context

The current auth implementation issues JWT access tokens with a 60-minute `exp` claim. The frontend proactively refreshes the token at 55 minutes to provide sliding expiration behavior. The session timeout is specified at 60 minutes of inactivity in the auth spec.

## Goals / Non-Goals

**Goals:**
- Reduce session inactivity timeout from 60 minutes to 30 minutes
- Update JWT `expiresIn` from `60m` to `30m`
- Adjust client-side proactive refresh threshold from 55 to 25 minutes

**Non-Goals:**
- Server-side session tracking — separate change
- Refresh token storage changes — separate change
- Password hashing — separate change

## Decisions

1. **JWT `exp` claim → change from `60m` to `30m`**
   - Single-line change in `backend/src/middleware/auth.ts`
   - No migration needed — existing tokens will expire naturally per their original `exp` claim

2. **Client-side proactive refresh threshold → change from 55 to 25 minutes**
   - Change the constant in `frontend/src/services/api.ts` from `55 * 60 * 1000` to `25 * 60 * 1000`
   - Maintains the same 5-minute buffer before JWT expiry

3. **Sliding expiration mechanism unchanged**
   - The same client-side proactive refresh pattern continues to work with the new expiry window

## Risks / Trade-offs

- **Users may experience more frequent re-authentication** → Mitigation: 30 minutes of activity resets the timer; only idle users are affected
- **Existing 60-minute tokens remain valid until expiry** → Mitigation: acceptable — they will phase out within 60 minutes of issuance
