## ADDED Requirements

### Requirement: Stock Validation on Checkout
The system SHALL validate that sufficient stock exists for all cart items before creating an order. If any item has insufficient stock, the entire order SHALL be rejected.

#### Scenario: Checkout with sufficient stock
- **WHEN** a user checks out and all cart items have sufficient stock
- **THEN** the order is created successfully
- **AND** stock is deducted for each product

#### Scenario: Checkout with out-of-stock item
- **WHEN** a user checks out and a cart item's product is out of stock
- **THEN** the system returns a 400 error with code `OUT_OF_STOCK`
- **AND** the error message identifies the product that is out of stock
- **AND** no order is created
- **AND** no stock is deducted

#### Scenario: Checkout with insufficient stock
- **WHEN** a user checks out and a cart item's quantity exceeds available stock
- **THEN** the system returns a 400 error with code `INSUFFICIENT_STOCK`
- **AND** the error message identifies the product and available quantity
- **AND** no order is created
- **AND** no stock is deducted

### Requirement: Stock Deduction on Order
The system SHALL deduct product stock atomically when an order is successfully placed.

#### Scenario: Stock deducted after successful checkout
- **WHEN** an order is created successfully
- **THEN** the stock of each product in the order is decreased by the ordered quantity
- **AND** the stock deduction occurs in the same database transaction as order creation

### Requirement: Frontend Checkout Error Handling
The frontend SHALL display stock-related errors during checkout.

#### Scenario: Checkout error for out-of-stock item
- **WHEN** the checkout API returns an `OUT_OF_STOCK` error
- **THEN** an error message identifying the out-of-stock product is displayed
- **AND** the user is returned to their cart

#### Scenario: Checkout error for insufficient stock
- **WHEN** the checkout API returns an `INSUFFICIENT_STOCK` error
- **THEN** an error message identifying the product and available quantity is displayed
- **AND** the user is returned to their cart

### Requirement: Cart Clear After Checkout
The system SHALL clear the user's cart after a successful checkout.

#### Scenario: Cart cleared on successful order
- **WHEN** an order is created successfully
- **THEN** all items are removed from the user's cart
