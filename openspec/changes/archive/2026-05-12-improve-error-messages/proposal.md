## Why

Login and register forms can display raw JavaScript error messages to users (e.g., `"Cannot read properties of undefined"`) when the server crashes, and there is no input validation on the backend. This is a poor UX and a security concern — internal errors should not leak to the client.

## What Changes

- Backend: Add input validation for required fields in register and login routes
- Backend: Replace raw `error.message` in 500 catch blocks with a generic "Something went wrong" message
- Frontend: Handle network/fetch errors in `api.ts` instead of letting them propagate as unhandled exceptions
- Frontend: Display user-friendly error messages for server errors

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `auth`: Update the login and register requirements to validate inputs server-side and return safe error messages on server errors.

## Impact

- **Backend**: `backend/src/routes/auth.ts` — add input validation, sanitize 500 errors
- **Frontend**: `frontend/src/services/api.ts` — handle network errors gracefully
- **Frontend**: `frontend/src/pages/Login.tsx`, `frontend/src/pages/Register.tsx` — may need minor adjustments
