# Pagination Bug Investigation

## Summary

`GET /api/products?page=2` returns the same products as `page=1`. Three interconnected bugs were found across the stack.

---

## Bug 1 (Root Cause): `skip` hardcoded to 0

**File:** `backend/src/routes/products.ts:47`

The `skip` variable is calculated correctly at line 16:

```typescript
const skip = (pageNum - 1) * limitNum; // page=2 → skip=10
```

But the `findMany` call at line 47 ignores it:

```typescript
const products = await prisma.product.findMany({
  where,
  skip: 0, // BUG: should be `skip`
  take: limitNum,
  orderBy
});
```

### Flow

```
Request: /api/products?page=2&limit=10
                │
                ▼
pageNum = 2, limitNum = 10
                │
                ▼
skip = (2-1) * 10 = 10   ← calculation is correct
                │
                ▼
prisma.product.findMany({ skip: 0, take: 10 })  ← ignores `skip`
                │
                ▼
Always returns products 1-10, never 11-20
```

### Fix

Replace `skip: 0` with `skip` (the calculated variable).

---

## Bug 2 (Frontend): Race condition on rapid page changes

**File:** `frontend/src/pages/Products.tsx:27-46`

Each `page` state change triggers a new `loadProducts()` via `useEffect`, but there is no mechanism to cancel or ignore stale requests.

### Timeline

```
t0: page=1 → fetch(/api/products?page=1)  ← fires
t1: page=2 → fetch(/api/products?page=2)  ← fires
t2: response for page=2 arrives → setProducts(page 2 data) ✓
t3: response for page=1 arrives → setProducts(page 1 data) ✗ OVERWRITES!
```

User sees page 1 products while the pagination UI shows page 2 as active.

### Fix

Use an `AbortController` or a stale-request flag (e.g., a ref tracking the latest page) to discard out-of-order responses.

---

## Bug 3 (Frontend): Stale data on fetch error

**File:** `frontend/src/pages/Products.tsx:41-43`

```typescript
catch (error) {
  console.error('Failed to load products', error);
  // ← No cleanup. Products and page state are inconsistent.
}
```

If page 3 fails, the user still sees page 2's products while the pagination button indicates page 3.

### Fix

Reset products or revert the page state on error, or keep the previous successful data and show an error toast.

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     PAGINATION DATA FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Products.tsx            api.ts            products.ts           │
│  ───────────            ──────            ───────────           │
│                                                                  │
│  page=2 ──────────────────────────────────────────────────────┐  │
│    │                      │                      │           │  │
│    │  setPage(2)          │                      │           │  │
│    ├──useEffect────────────>                      │           │  │
│    │                      │                      │           │  │
│    │  loadProducts()      │                      │           │  │
│    │  ┌──────────────┐    │                      │           │  │
│    │  │ 1. loading    │    │                      │           │  │
│    │  │ 2. fetch      │────> URLSearchParams      │           │  │
│    │  │               │    │ (?page=2&limit=10)───> skip: 0  │  │
│    │  │ 3. setProducts│<───│ response.json      <── ─ ─ ─ ─ │  │
│    │  └──────────────┘    │                      │  (bug)   │  │
│    │                      │                      │          │  │
│    └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│   ✗ Backend: skip: 0 ignores page=2                             │
│   ✗ Frontend: race condition between requests                   │
│   ✗ Frontend: error leaves UI inconsistent                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Related Issues Found (Same File)

| Line | Issue |
|------|-------|
| `products.ts:30-34` | `minPrice`/`maxPrice` filters compare strings, not numbers |
| `products.ts:39-42` | `sort=price_asc` sorts alphabetically (`"9" > "59"`) |
| `products.ts:90,113` | `price` is `String(price)` — stored as string in DB |
| `products.ts:91` | `image` stored as absolute `localhost` URL |
| `CartContext.tsx:37-38` | `total` state never updated after cart changes |
| `Cart.tsx:8` | `localTotal` captures stale `total` at render time |
