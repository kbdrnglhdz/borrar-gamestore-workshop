## Why

The GameStore application has a logout endpoint and auth context but lacks a visible, accessible logout button in the UI. Users authenticated via the Login page have no way to end their session, leaving them unable to switch accounts or securely sign off on shared devices.

## What Changes

- Add a "Logout" button to the navbar when a user is authenticated
- The button calls the existing `POST /api/auth/logout` endpoint and clears local tokens
- UI updates to reflect logged-out state (show Login/Register links instead)

## Capabilities

### New Capabilities

- `auth`: The existing auth spec covers login, session, and logout requirements. No new capability needed.

### Modified Capabilities

- `auth`: Add a UI-level requirement that an authenticated user must have a visible way to trigger logout from the main navigation.

## Impact

- **Frontend**: `Navbar.tsx` — add logout button rendered conditionally when user is authenticated
- **Backend**: No changes needed; `/api/auth/logout` endpoint already exists at `backend/src/routes/auth.ts:100`
- **Auth context**: `AuthContext.tsx` already exposes a `logout()` function — no changes needed
