## Context

The product listing page uses pagination with `page` and `limit` query parameters. The backend correctly parses these into `skip` and `limitNum` variables, but the Prisma query hardcodes `skip: 0` instead of using the parsed `skip` variable — causing every page to return the first 10 products. On the frontend, rapid page changes trigger overlapping async requests that can resolve out of order, displaying stale data. Network errors can also leave `page` state pointing to a page that doesn't exist or failed to load.

## Goals / Non-Goals

**Goals:**
- Page N returns products (N-1)*10+1 through N*10
- Rapid page changes cancel in-flight requests so only the latest response is rendered
- Failed requests revert the UI page state to its previous value

**Non-Goals:**
- Not fixing the `price` stored as `String` issue (separate change)
- Not fixing the `image` absolute URL issue (separate change)
- Not adding a toast/notification system for errors (future enhancement)

## Decisions

1. **Backend fix — single variable swap** over refactoring the query builder.
   - The root cause is literally `skip: 0` instead of `skip`. Changing one variable is the minimal fix with zero risk.
   - Alternatives considered: rewriting to use a Prisma pagination helper — unnecessary complexity for a 1-character bug.

2. **Frontend race condition — `AbortController`** over debouncing or ignoring stale responses.
   - Debouncing adds latency (user waits before request starts). Ignoring stale responses via a counter/token adds complexity.
   - `AbortController` is native, well-supported, and immediately cancels the HTTP request — freeing browser resources.
   - The `AbortError` is caught and silently ignored so users see no console noise from cancelled requests.

3. **Error handling — revert page** over showing an error state.
   - Reverting `page` to its previous value keeps the UI consistent. The user sees the last successfully loaded page and can retry.
   - A full error state/overlay would be more disruptive for transient network issues.
   - Future improvement: add a toast notification, but out of scope for this fix.

## Risks / Trade-offs

- `AbortController` requires threading an optional `AbortSignal` parameter through the API client. Existing callers that don't pass a signal continue to work unchanged — the parameter is optional and backward-compatible.
- If the backend fix is deployed without the frontend fix, existing race conditions remain on the client side — but pagination will at least return correct data. Recommend deploying backend and frontend together.
