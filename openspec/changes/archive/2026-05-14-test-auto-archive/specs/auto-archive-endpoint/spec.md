## ADDED Requirements

### Requirement: Auto-archive endpoint returns test message

The system SHALL provide a GET endpoint at `/api/auto-archive` that returns a fixed JSON response with the message "archive-completed.sh".

#### Scenario: Successful response

- **WHEN** a client sends a GET request to `/api/auto-archive`
- **THEN** the system SHALL respond with HTTP 200 and body `{ "success": true, "data": { "message": "archive-completed.sh" } }`
