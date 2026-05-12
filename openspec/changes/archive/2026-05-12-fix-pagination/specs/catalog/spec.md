## MODIFIED Requirements

### Requirement: Product Pagination
Users SHALL browse products in pages of 10 items.

#### Scenario: First page
- **WHEN** a user requests page 1
- **THEN** products 1-10 are returned

#### Scenario: Second page
- **WHEN** a user requests page 2
- **THEN** products 11-20 are returned

#### Scenario: Rapid page changes
- **WHEN** a user rapidly clicks through pages 1, 2, 3
- **THEN** only the response for page 3 is rendered

#### Scenario: Network error during page change
- **WHEN** a page request fails due to a network error
- **THEN** the page state reverts to the previously loaded page

## ADDED Requirements

### Requirement: Request cancellation
The frontend SHALL cancel in-flight product list requests when the user changes pages.

#### Scenario: Cancel stale request
- **WHEN** a user changes page while a previous page request is still in flight
- **THEN** the previous request is aborted via AbortController

#### Scenario: Aborted request is silent
- **WHEN** a request is aborted
- **THEN** no error is displayed to the user
- **THEN** no console error is logged for the abort
