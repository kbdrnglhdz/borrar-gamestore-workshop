## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Logout Button Visibility
The system SHALL display a logout button in the main navigation when a user is authenticated.

#### Scenario: Authenticated user sees logout
- **WHEN** a user is authenticated
- **THEN** a "Logout" button is visible in the navbar

#### Scenario: Unauthenticated user does not see logout
- **WHEN** a user is not authenticated
- **THEN** no logout button is shown
- **AND** "Login" and "Register" links are shown instead
