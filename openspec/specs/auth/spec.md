# Auth Specification

## Purpose
Authentication and session management for GameStore.

## Requirements

### Requirement: User Login
Users SHALL authenticate with email and password to access the system. The system SHALL validate that email and password are provided and return a clear error message if either is missing. On unexpected server errors, the system SHALL return a generic "Something went wrong" message.

#### Scenario: Valid credentials
- **WHEN** a user submits the login form with email "test@example.com" and password "secret"
- **THEN** a JWT access token is returned
- **AND** a refresh token is stored in HTTP-only cookie

#### Scenario: Invalid credentials
- **WHEN** a user submits the login form with invalid email or password
- **THEN** an error message "Invalid credentials" is displayed
- **AND** no tokens are issued

#### Scenario: Missing fields
- **WHEN** a user submits the login form without an email or password
- **THEN** an error message "Email and password are required" is displayed

#### Scenario: Server error
- **WHEN** the server encounters an unexpected error during login
- **THEN** a generic "Something went wrong" message is displayed

### Requirement: Password visibility toggle in login form
The login form SHALL include a password visibility toggle button as part of the auth UI.

#### Scenario: Toggle available on login
- **WHEN** the login form is displayed
- **THEN** the password field SHALL have a visibility toggle button
- **AND** the password is hidden by default

### Requirement: Input Validation
The system SHALL validate that required fields are present before processing registration or login requests.

#### Scenario: Registration with missing fields
- **WHEN** a user submits the registration form without a name, email, or password
- **THEN** an error message indicating which field is required is displayed

#### Scenario: Network error handling
- **WHEN** a network error occurs during login or registration
- **THEN** a user-friendly "Network error. Please try again." message is displayed

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

### Requirement: Password Storage
Users SHALL have their passwords stored securely.

#### Scenario: Password hashing on registration
- **WHEN** a new user registers with a password
- **THEN** the password is stored as a hashed value

#### Scenario: Password verification on login
- **WHEN** a user provides the correct password during login
- **THEN** the system verifies the hash matches before granting access

**KNOWN BUG:** Passwords are stored in plain text in the database.
**VIOLATION:** This does NOT follow security best practices.

### Requirement: User Logout
Users SHALL end their session by logging out of the system. An authenticated user SHALL have a visible logout control accessible from the main navigation.

#### Scenario: Successful logout
- **WHEN** an authenticated user clicks the logout button in the navbar
- **THEN** the session is terminated
- **AND** tokens are invalidated
- **AND** the UI updates to show Login/Register links

#### Scenario: Post-logout access
- **WHEN** a logged-out user attempts to access a protected resource
- **THEN** the system returns a 401 Unauthorized error

### Requirement: Logout Button Visibility
The system SHALL display a logout button in the main navigation when a user is authenticated.

#### Scenario: Authenticated user sees logout
- **WHEN** a user is authenticated
- **THEN** a "Logout" button is visible in the navbar

#### Scenario: Unauthenticated user does not see logout
- **WHEN** a user is not authenticated
- **THEN** no logout button is shown
- **AND** "Login" and "Register" links are shown instead
