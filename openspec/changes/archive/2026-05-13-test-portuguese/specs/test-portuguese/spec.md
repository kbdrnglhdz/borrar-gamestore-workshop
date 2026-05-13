## ADDED Requirements

### Requirement: Endpoint de teste de idioma português
The system SHALL expose a GET endpoint at `/api/test/portuguese` that returns a confirmation message in Portuguese.

#### Scenario: Successful request
- **WHEN** a GET request is made to `/api/test/portuguese`
- **THEN** the system SHALL respond with HTTP 200 and JSON body `{ "success": true, "data": { "message": "El lenguaje se cambio a Portuguese" } }`
