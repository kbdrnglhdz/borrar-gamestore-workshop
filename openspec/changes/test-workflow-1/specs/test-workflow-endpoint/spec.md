## ADDED Requirements

### Requirement: Test-workflow endpoint returns test message

The system SHALL provide a GET endpoint at `/api/test-workflow-1` that returns a fixed JSON response with the message "Prueba de validación de openspec".

#### Scenario: Successful response

- **WHEN** a client sends a GET request to `/api/test-workflow-1`
- **THEN** the system SHALL respond with HTTP 200 and body `{ "success": true, "data": { "message": "Prueba de validación de openspec" } }`
