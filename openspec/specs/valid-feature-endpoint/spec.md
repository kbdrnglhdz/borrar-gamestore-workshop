# valid-feature-endpoint Specification

## Purpose
TBD - created by archiving change add-valid-feature. Update Purpose after archive.
## Requirements
### Requirement: Valid-feature endpoint returns test message

The system SHALL provide a GET endpoint at `/api/add-valid-feature` that returns a fixed JSON response with the message "Probando todo el flujo".

#### Scenario: Successful response

- **WHEN** a client sends a GET request to `/api/add-valid-feature`
- **THEN** the system SHALL respond with HTTP 200 and body `{ "success": true, "data": { "message": "Probando todo el flujo" } }`

