## Context

The GameStore frontend uses React with React Router and AuthContext for session management. The navbar (`Navbar.tsx`) renders different links based on authentication state. The backend already has a `POST /api/auth/logout` endpoint and `AuthContext.logout()` already calls it. However, there is no visible logout button — the UI never provides a way for authenticated users to trigger the logout action.

## Goals / Non-Goals

**Goals:**
- Add a visible "Logout" button to the navbar for authenticated users
- Button calls existing `AuthContext.logout()` which invokes the backend endpoint and clears tokens
- After logout, navbar updates to show Login/Register links

**Non-Goals:**
- No backend changes
- No new API endpoints
- No auth logic changes

## Decisions

1. **Placement in navbar**: The logout button sits alongside the user greeting and cart link — consistent with existing navigation patterns.
2. **Conditional rendering**: Reuse the existing `user` state from `AuthContext` to show/hide the button — no new state management needed.
3. **Direct context call**: Use `useAuth().logout()` directly — no additional wrapper needed.

## Risks / Trade-offs

- [Low] No confirmation dialog on logout — user logs out immediately on click. Acceptable for this scope; a confirmation could be added later if needed.
