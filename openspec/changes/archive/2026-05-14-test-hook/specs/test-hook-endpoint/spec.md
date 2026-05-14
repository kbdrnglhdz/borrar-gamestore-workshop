## ADDED Requirements

### Requirement: Test-hook endpoint returns test message

The system SHALL provide a GET endpoint at `/api/test-hook` that returns a fixed JSON response with the message "Probar Husky".

#### Scenario: Successful response

- **WHEN** a client sends a GET request to `/api/test-hook`
- **THEN** the system SHALL respond with HTTP 200 and body `{ "success": true, "data": { "message": "Probar Husky" } }`
