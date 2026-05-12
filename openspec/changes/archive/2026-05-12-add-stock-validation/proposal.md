## Why

The GameStore currently allows users to add out-of-stock products to their cart and complete checkout even when insufficient stock exists, resulting in unfulfillable orders and poor user experience.

## What Changes

- Add stock validation when adding items to the cart — reject if product is out of stock or insufficient stock
- Add stock validation during checkout — reject if any cart item exceeds available stock
- Deduct stock from products when an order is successfully placed
- Display clear error messages on the frontend for out-of-stock scenarios
- Prevent ordering more than available quantity at both cart-add and checkout stages

## Capabilities

### New Capabilities
- `cart`: Shopping cart operations including adding items, updating quantities, and stock validation rules
- `orders`: Order placement including checkout flow, stock deduction, and validation

### Modified Capabilities
_(No existing capabilities have requirement changes — this is entirely new functionality)_

## Impact

- **Backend routes:** `cart.ts` — validate stock on add/update; `orders.ts` — validate stock on checkout and deduct stock
- **Database:** Existing `stock` field on `Product` model is used (no schema changes needed)
- **Frontend:** `CartContext.tsx`, `Cart.tsx`, `Checkout.tsx` — handle stock error responses and display messages
- **API client:** `api.ts` — error handling for new stock-related error responses
