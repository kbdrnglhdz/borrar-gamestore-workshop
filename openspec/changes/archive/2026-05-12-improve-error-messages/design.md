## Context

The auth routes (`backend/src/routes/auth.ts`) lack input validation and expose raw error messages in 500 catch blocks. The frontend API client (`api.ts`) does not handle network errors, and AuthContext re-throws whatever error string the backend sends — including raw JS runtime errors.

## Goals / Non-Goals

**Goals:**
- Backend validates required fields (email, password, name) before processing
- Backend 500 errors return "Something went wrong" instead of raw error messages
- Frontend API client catches fetch/network errors and converts to user-friendly messages
- Frontend login/register pages display clean error messages only

**Non-Goals:**
- No new UI components or toast systems
- No per-field inline validation on the frontend
- No changes to logout, refresh, or /me endpoints

## Decisions

1. **Manual validation over library**: Adding a validation library (e.g., Joi, Zod) is overkill for 2-3 fields. Inline checks with early returns keep the change minimal.
2. **Broad 500 catch-all**: Use a single catch in each route handler that returns `{ error: "Something went wrong" }` regardless of the actual error. No special-casing of error types at this stage.
3. **Frontend api.ts catch**: Wrap fetch calls in try/catch and return `{ error: "Network error. Please try again." }` for network failures. This prevents unhandled promise rejections.
4. **No changes to AuthContext**: The existing `if (data.error) throw new Error(data.error)` pattern is fine — the errors it receives will now be clean strings.

## Risks / Trade-offs

- [Low] Server errors are hidden — internal debugging requires server logs. Acceptable for a production-facing app where users should never see internals.
