## 1. Backend — Fix Hardcoded `skip`

- [x] 1.1 In `backend/src/routes/products.ts`, change `skip: 0` to `skip` in the Prisma `findMany` call

## 2. Frontend — API Client Signal Support

- [x] 2.1 In `frontend/src/services/api.ts`, add optional `signal?: AbortSignal` parameter to the `getAll` function signature
- [x] 2.2 Forward the signal to `fetchWithAuth` options

## 3. Frontend — AbortController in Products Page

- [x] 3.1 Add `useRef<AbortController | null>` to `frontend/src/pages/Products.tsx`
- [x] 3.2 In `loadProducts`, abort any in-flight request and create a new AbortController
- [x] 3.3 Pass `controller.signal` to `api.products.getAll`
- [x] 3.4 Add early return if `controller.signal.aborted` after fetch
- [x] 3.5 Catch `AbortError` silently (no console noise)

## 4. Frontend — Graceful Error Handling

- [x] 4.1 In the `catch` block of `loadProducts`, revert page state via `setPage(prev => prev)` on non-abort errors
