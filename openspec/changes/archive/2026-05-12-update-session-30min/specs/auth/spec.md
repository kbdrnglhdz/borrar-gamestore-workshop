## MODIFIED Requirements

### Requirement: Session Persistence
Users SHALL maintain their session for 30 minutes of inactivity after login.

#### Scenario: Session timeout
- **WHEN** 30 minutes pass without any request from an authenticated user
- **THEN** the session expires
- **AND** the user must log in again

#### Scenario: Activity resets timeout
- **WHEN** an authenticated user makes a request before 30 minutes of inactivity have elapsed
- **THEN** the inactivity timer resets to 30 minutes
- **AND** the session remains valid
