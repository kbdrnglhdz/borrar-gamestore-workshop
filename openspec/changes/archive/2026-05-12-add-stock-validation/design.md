## Context

GameStore has no stock validation. Users can add out-of-stock products to their cart and complete checkout for items with insufficient inventory. The `Product` model already has a `stock` field (Int), but it is never checked during cart or order operations. This leads to unfulfillable orders and poor user experience.

## Goals / Non-Goals

**Goals:**
- Validate stock when adding items to cart — reject if product is out of stock or insufficient stock
- Validate stock when updating cart item quantities — reject if requested quantity exceeds available stock
- Validate stock for all cart items during checkout — reject entire order if any item exceeds stock
- Deduct stock from products atomically when an order is successfully placed
- Return clear, structured error messages from the API for stock-related failures
- Display user-friendly stock error messages on the frontend

**Non-Goals:**
- Fixing the existing cart duplicate-item bug (adding new row instead of incrementing quantity)
- Adding admin stock management UI
- Real-time or WebSocket-based stock updates
- Reservation or hold-based inventory system
- Back-in-stock notifications

## Decisions

**Decision: Validate stock on the backend, not just the frontend**
- Stock validation must happen server-side to prevent API abuse. Frontend validation is a UX enhancement, not a security measure.

**Decision: Return 400 status with structured error payloads**
- Stock errors return HTTP 400 with `{ error: string, code: string }` where `code` indicates the specific issue (e.g., `OUT_OF_STOCK`, `INSUFFICIENT_STOCK`). This allows the frontend to handle different scenarios.

**Decision: Use Prisma transactions for atomic checkout + stock deduction**
- Stock deduction must happen in the same transaction as order creation to prevent race conditions. Use `prisma.$transaction` with the interactive API.

**Decision: Check stock on cart item update (PUT /cart/item/:itemId)**
- When a user updates quantity, validate the new quantity against available stock. This prevents adding a large quantity incrementally.

**Decision: Frontend error handling via toast/alert with specific messages**
- The frontend CartContext and Checkout page will check for stock error codes and display appropriate messages instead of generic errors.

## Risks / Trade-offs

- **Race condition on stock**: Multiple users could pass validation simultaneously for the last item in stock → Mitigated by transactional stock deduction during checkout; cart-level validation is best-effort to prevent obvious over-ordering.
- **Stale stock display**: Stock levels shown on the frontend may be outdated between page refreshes → Acceptable; this is a soft constraint, not a hard one. Checkout will always do the definitive validation.
