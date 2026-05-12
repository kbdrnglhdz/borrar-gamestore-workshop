## MODIFIED Requirements

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
