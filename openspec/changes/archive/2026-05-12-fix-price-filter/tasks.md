## 1. Database Schema

- [x] 1.1 Change `price` field type from `String` to `Float` in `backend/prisma/schema.prisma`
- [x] 1.2 Delete SQLite DB file and run `prisma db push` to apply schema change

## 2. Backend Routes

- [x] 2.1 Remove `String(price)` casts in product create and update routes (`backend/src/routes/products.ts`)
- [x] 2.2 Remove `as string` casts on `minPrice` and `maxPrice` filter params
- [x] 2.3 Update seed data to use numeric prices (`backend/prisma/seed.ts`)

## 3. Frontend

- [x] 3.1 Change `price` type from `string` to `number` in `Product` interface (`frontend/src/pages/Products.tsx`)
