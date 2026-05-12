## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Input Validation
The system SHALL validate that required fields are present before processing registration or login requests.

#### Scenario: Registration with missing fields
- **WHEN** a user submits the registration form without a name, email, or password
- **THEN** an error message indicating which field is required is displayed

#### Scenario: Network error handling
- **WHEN** a network error occurs during login or registration
- **THEN** a user-friendly "Network error. Please try again." message is displayed
