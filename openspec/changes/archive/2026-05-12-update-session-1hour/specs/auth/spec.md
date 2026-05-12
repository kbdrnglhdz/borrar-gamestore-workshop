## MODIFIED Requirements

### Requirement: Session Persistence
Users SHALL maintain their session for 60 minutes of inactivity after login. The inactivity timer SHALL be enforced server-side on every authenticated API request.

#### Scenario: Session timeout
- **WHEN** 60 minutes pass without any request from an authenticated user
- **THEN** the session expires
- **AND** the user must log in again

#### Scenario: Activity resets timeout
- **WHEN** an authenticated user makes a request before 60 minutes of inactivity have elapsed
- **THEN** the inactivity timer resets to 60 minutes
- **AND** the session remains valid

#### Scenario: Server-side enforcement
- **WHEN** an authenticated user sends a request with a valid JWT but the server-side inactivity timeout has expired
- **THEN** the server rejects the request with a 401 status
- **AND** the user must log in again

### Requirement: Refresh Token Storage
Refresh tokens SHALL be stored in HTTP-only cookies to prevent access from client-side JavaScript.

#### Scenario: Login sets refresh cookie
- **WHEN** a user successfully logs in
- **THEN** the server sets an HTTP-only cookie containing the refresh token

#### Scenario: Refresh uses cookie
- **WHEN** the frontend calls the refresh endpoint
- **THEN** the browser automatically sends the refresh token cookie
- **AND** the server returns a new access token and sets a new refresh token cookie

#### Scenario: Logout clears refresh cookie
- **WHEN** a user logs out
- **THEN** the server clears the refresh token cookie
- **AND** invalidates the refresh token on the server

## REMOVED Requirements

### Requirement: Session Persistence (original bug note)
**Reason**: The stale "KNOWN BUG: Refresh token never renews automatically" entry and "Refresh token stored in HTTP-only cookie" scenario text are superseded by the implementation in this change.
**Migration**: The MODIFIED requirement above replaces all prior Session Persistence scenarios.

### Requirement: Refresh Token in localStorage
**Reason**: Security improvement — localStorage is accessible to JavaScript (XSS vulnerability), which the old requirement incorrectly specified.
**Migration**: Refresh tokens are now managed via HTTP-only cookies. The frontend no longer needs to store or handle refresh tokens.
