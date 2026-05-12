## Why

Product pagination is broken — page 2 returns the same results as page 1 due to `skip: 0` being hardcoded in the backend query. Rapid page changes also cause race conditions that display stale data, and network errors leave the UI in an inconsistent state. These bugs degrade the core browsing experience and need to be fixed together.

## What Changes

- Backend: Replace hardcoded `skip: 0` with the actual `skip` parameter in the Prisma query
- Frontend: Add `AbortController` to cancel stale requests when the user changes pages rapidly
- Frontend: Revert page state on fetch errors to prevent the UI from showing an out-of-range page
- Frontend: Thread `AbortSignal` through the API client to support request cancellation

## Capabilities

### New Capabilities

*(None — this is a bug fix within the existing catalog capability.)*

### Modified Capabilities

- `catalog`: Fix product pagination so that requesting page N returns the correct items (products (N-1)*10+1 through N*10 instead of always returning the first 10). Also add race-condition protection and error-state recovery on the frontend.

## Impact

- `backend/src/routes/products.ts` — 1-line fix (`skip: 0` → `skip`)
- `frontend/src/pages/Products.tsx` — Add `AbortController` ref and error handling (~20 lines)
- `frontend/src/api.ts` — Accept optional `AbortSignal` in `getAll` and forward to `fetchWithAuth`
