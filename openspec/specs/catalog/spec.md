# Catalog Specification

## Purpose
Product listing, filtering, and pagination for GameStore.

## Requirements

### Requirement: Product Pagination
Users SHALL browse products in pages of 10 items.

#### Scenario: First page
- **WHEN** a user requests page 1
- **THEN** products 1-10 are returned

#### Scenario: Second page
- **WHEN** a user requests page 2
- **THEN** products 11-20 are returned

#### Scenario: Rapid page changes
- **WHEN** a user rapidly clicks through pages 1, 2, 3
- **THEN** only the response for page 3 is rendered

#### Scenario: Network error during page change
- **WHEN** a page request fails due to a network error
- **THEN** the page state reverts to the previously loaded page

### Requirement: Price Filter
Users SHALL filter products by price range.

#### Scenario: Filter by price range
- **WHEN** a user applies a price filter between 10 and 30
- **THEN** products with prices 15 and 25 are shown

#### Scenario: Sort by price ascending
- **WHEN** a user selects "Price: Low to High"
- **THEN** products are ordered from lowest to highest price

#### Scenario: Sort by price descending
- **WHEN** a user selects "Price: High to Low"
- **THEN** products are ordered from highest to lowest price

### Requirement: Product Images
Users SHALL view product images correctly.

#### Scenario: Display product image
- **WHEN** a user views a product in the catalog
- **THEN** the product image is displayed from the backend URL

#### Scenario: Broken image fallback
- **WHEN** a product image URL is not accessible
- **THEN** a fallback placeholder image is shown

**KNOWN BUG:** Product images use absolute local paths (e.g., `/images/product.jpg`) instead of relative or CDN URLs, causing broken images in production.

### Requirement: Request cancellation
The frontend SHALL cancel in-flight product list requests when the user changes pages.

#### Scenario: Cancel stale request
- **WHEN** a user changes page while a previous page request is still in flight
- **THEN** the previous request is aborted via AbortController

#### Scenario: Aborted request is silent
- **WHEN** a request is aborted
- **THEN** no error is displayed to the user
- **THEN** no console error is logged for the abort
