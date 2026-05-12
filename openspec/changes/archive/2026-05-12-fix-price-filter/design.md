## Context

The `price` field is stored as `String` in the Prisma schema, causing SQLite to perform lexicographic comparison instead of numeric comparison. This affects three areas: price range filtering (`minPrice`/`maxPrice`), sorting by price (`price_asc`/`price_desc`), and price storage on create/update.

## Goals / Non-Goals

**Goals:**
- Change `price` from `String` to `Float` in the database schema
- Fix all backend routes to handle price as a number
- Update seed data to use numeric prices
- Update the frontend `Product` interface to use `number`

**Non-Goals:**
- No new API endpoints or filters
- No changes to pagination or other catalog features
- No changes to the cart or checkout flow

## Decisions

1. **Use `Float` over `Decimal`**: SQLite doesn't natively support `Decimal` — Prisma maps both to `REAL`. `Float` is simpler and sufficient for game prices (no extreme precision needs).
2. **DB reset over migration**: Since this is a development/workshop project with no production data, deleting the SQLite DB and recreating it is the simplest approach.
3. **One-shot change**: Backend schema, seed data, routes, and frontend type are updated together in a single change since they're tightly coupled.

## Risks / Trade-offs

- [Low] DB reset loses existing data — acceptable for a workshop project. The seed script recreates all data.
