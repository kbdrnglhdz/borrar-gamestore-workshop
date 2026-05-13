## ADDED Requirements

### Requirement: Password visibility toggle
The login form SHALL include a button to toggle password visibility between hidden (password) and visible (text).

#### Scenario: Toggle shows password
- **WHEN** the user clicks the eye icon on the password field (default: hidden)
- **THEN** the input type changes to `text`
- **AND** the eye icon changes to indicate visible state

#### Scenario: Toggle hides password
- **WHEN** the user clicks the eye icon while the password is visible
- **THEN** the input type changes back to `password`
- **AND** the eye icon changes to indicate hidden state

#### Scenario: Default state is hidden
- **WHEN** the login form is rendered
- **THEN** the password field SHALL have `type="password"`
- **AND** the eye icon SHALL indicate the hidden state
