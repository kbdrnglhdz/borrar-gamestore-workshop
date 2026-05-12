# Cart Specification

## Purpose
Shopping cart operations including adding items, updating quantities, and stock validation.

## Requirements

### Requirement: Stock Validation on Add to Cart
The system SHALL validate product stock before adding an item to the cart. If the product is out of stock or the requested quantity exceeds available stock, the system SHALL reject the operation with a clear error message.

#### Scenario: Add in-stock product to cart
- **WHEN** a user adds a product with sufficient stock to their cart
- **THEN** the item is added to the cart successfully

#### Scenario: Add out-of-stock product to cart
- **WHEN** a user adds a product with 0 stock to their cart
- **THEN** the system returns a 400 error with code `OUT_OF_STOCK`
- **AND** the error message indicates the product is out of stock

#### Scenario: Add quantity exceeding stock
- **WHEN** a user adds a product with quantity greater than available stock
- **THEN** the system returns a 400 error with code `INSUFFICIENT_STOCK`
- **AND** the error message indicates the maximum available quantity

#### Scenario: Quantity from duplicate item exceeds stock
- **WHEN** a user tries to add a product already in their cart and the combined quantity would exceed available stock
- **THEN** the system returns a 400 error with code `INSUFFICIENT_STOCK`

### Requirement: Stock Validation on Quantity Update
The system SHALL validate product stock when updating cart item quantities.

#### Scenario: Update to valid quantity
- **WHEN** a user updates a cart item quantity to a value within available stock
- **THEN** the quantity is updated successfully

#### Scenario: Update to quantity exceeding stock
- **WHEN** a user updates a cart item quantity to exceed available stock
- **THEN** the system returns a 400 error with code `INSUFFICIENT_STOCK`
- **AND** the error message indicates the maximum available quantity

### Requirement: Error Message Display
The frontend SHALL display stock-related error messages to the user.

#### Scenario: Out of stock error displayed
- **WHEN** the cart API returns an `OUT_OF_STOCK` error
- **THEN** a message "This product is currently out of stock" is displayed

#### Scenario: Insufficient stock error displayed
- **WHEN** the cart API returns an `INSUFFICIENT_STOCK` error
- **THEN** a message showing the available stock quantity is displayed
