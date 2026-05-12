## Why

The price filter and sort functionality sorts products alphabetically instead of numerically (e.g., `[100, 20, 5]` instead of `[5, 20, 100]`). This makes the feature unusable for finding products by price range or ordering.

## What Changes

- Change the `price` field from `String` to `Float` in the Prisma schema
- Update seed data to use numeric prices
- Remove `String(price)` casts in backend routes
- Update the frontend `Product` interface to use `number` for price
- Delete and recreate the SQLite database to apply the schema change

## Capabilities

### New Capabilities

- None

### Modified Capabilities

- `catalog`: Fix the Price Filter requirement so filtering and sorting by price works numerically instead of alphabetically.

## Impact

- **Database schema**: `price` column type changes from `String` to `Float` — requires DB reset
- **Backend**: `backend/prisma/schema.prisma`, `backend/src/routes/products.ts`, `backend/prisma/seed.ts`
- **Frontend**: `frontend/src/pages/Products.tsx` — `Product` interface type change
