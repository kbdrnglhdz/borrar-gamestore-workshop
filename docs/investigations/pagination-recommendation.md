# Pagination Bug — Recommendation

## Priority Matrix

| Bug | Severity | Effort | Fix |
|-----|----------|--------|-----|
| Backend: `skip: 0` hardcoded | **Critical** | 1 line | Replace with `skip` |
| Frontend: Race condition on page change | **High** | ~15 lines | Add `AbortController` |
| Frontend: Stale data on error | **Medium** | ~5 lines | Revert page state on error |

---

## Recommendation: Fix All Three

### 1. Backend — `skip: 0` → `skip`

**File:** `backend/src/routes/products.ts:47`

```diff
 const products = await prisma.product.findMany({
   where,
-  skip: 0,
+  skip,
   take: limitNum,
   orderBy
 });
```

**Risks:** None. This is the intended behavior.

---

### 2. Frontend — AbortController for race condition

**File:** `frontend/src/pages/Products.tsx`

Add a ref to track the latest request and abort stale ones:

```typescript
const abortRef = useRef<AbortController | null>(null);

const loadProducts = async () => {
  abortRef.current?.abort();
  const controller = new AbortController();
  abortRef.current = controller;

  setLoading(true);
  try {
    const data = await api.products.getAll(params, controller.signal);
    if (controller.signal.aborted) return;
    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    console.error('Failed to load products', err);
  } finally {
    setLoading(false);
  }
};
```

Also update `api.ts:113-115` to accept and forward the signal:

```typescript
getAll: async (params = {}, signal?: AbortSignal) => {
  const query = new URLSearchParams(params as any).toString();
  return fetchWithAuth(`/products?${query}`, { signal }).then(r => r.json());
},
```

**Risks:** Low. AbortController is standard and widely supported.

---

### 3. Frontend — Handle errors gracefully

**File:** `frontend/src/pages/Products.tsx`

```typescript
catch (err) {
  if (err instanceof DOMException && err.name === 'AbortError') return;
  console.error('Failed to load products', err);
  setPage(prev => prev); // keep current page, or revert
  // Optionally: show error toast
}
```

**Risks:** Low.

---

## Effort Summary

| Task | Files | Lines changed | Time |
|------|-------|---------------|------|
| Fix `skip: 0` | `products.ts` | 1 | ~1 min |
| Add AbortController | `Products.tsx`, `api.ts` | ~15 | ~15 min |
| Error handling | `Products.tsx` | ~5 | ~5 min |
| **Total** | 3 files | ~21 lines | ~20 min |

---

## Out of Scope (Separate Change)

These were found during investigation but affect features beyond pagination:

- `price` stored as `String` in Prisma schema (breaks filters, sorting)
- `image` stored as absolute `localhost` URL
- Cart `total` state never updated
