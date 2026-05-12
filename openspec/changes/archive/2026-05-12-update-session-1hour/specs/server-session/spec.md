## ADDED Requirements

### Requirement: Inactivity Tracking
The system SHALL track the last activity time for each authenticated user and enforce a 1-hour inactivity timeout at the API layer.

#### Scenario: Activity recorded on API request
- **WHEN** an authenticated user makes any API request
- **THEN** the system records the current timestamp as the user's last activity time

#### Scenario: Request within timeout window
- **WHEN** an authenticated user makes a request within 60 minutes of their last recorded activity
- **THEN** the request is processed normally
- **AND** the last activity timestamp is updated

#### Scenario: Request after timeout
- **WHEN** an authenticated user makes a request more than 60 minutes after their last recorded activity
- **THEN** the server returns a 401 Unauthorized response
- **AND** the user must re-authenticate

### Requirement: Configurable Timeout
The system SHALL allow the inactivity timeout duration to be configured via an environment variable.

#### Scenario: Custom timeout via env var
- **WHEN** the `SESSION_INACTIVITY_TIMEOUT_MINUTES` environment variable is set
- **THEN** the system uses that value as the inactivity timeout instead of the default 60 minutes
