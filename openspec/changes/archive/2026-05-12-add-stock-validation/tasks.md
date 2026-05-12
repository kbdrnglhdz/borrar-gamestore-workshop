## 1. Backend Cart Stock Validation

- [x] 1.1 Add stock validation in POST `/cart/add` — check product stock before adding, return 400 with `OUT_OF_STOCK` or `INSUFFICIENT_STOCK` code
- [x] 1.2 Add stock validation in PUT `/cart/item/:itemId` — check product stock when updating quantity, return 400 with `INSUFFICIENT_STOCK` code if exceeded

## 2. Backend Checkout Stock Validation & Deduction

- [x] 2.1 Add stock validation loop in POST `/orders/checkout` — check all cart items against available stock before creating order
- [x] 2.2 Wrap order creation and stock deduction in a Prisma `$transaction` for atomicity
- [x] 2.3 Deduct stock from each product when order is placed successfully
- [x] 2.4 Clear the user's cart after successful order creation

## 3. Frontend Error Handling

- [x] 3.1 Update `CartContext.tsx` — handle stock error codes from `addItem` and `updateItem`, propagate error info to components
- [x] 3.2 Update `Cart.tsx` — display stock error messages when cart operations fail
- [x] 3.3 Update `Checkout.tsx` — handle and display stock errors from checkout API
