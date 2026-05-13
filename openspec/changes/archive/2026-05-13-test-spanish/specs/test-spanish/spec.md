## ADDED Requirements

### Requirement: Endpoint de prueba de idioma español
The system SHALL expose a GET endpoint at `/api/test/spanish` that returns a confirmation message in Spanish.

#### Scenario: Successful request
- **WHEN** a GET request is made to `/api/test/spanish`
- **THEN** the system SHALL respond with HTTP 200 and JSON body `{ "success": true, "data": { "message": "Cambio de lenguaje a español" } }`
