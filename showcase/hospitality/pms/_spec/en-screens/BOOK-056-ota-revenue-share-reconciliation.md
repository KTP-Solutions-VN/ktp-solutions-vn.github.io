# BOOK-056 — Commission Review

**Type:** Full page (opened from BOOK-054)
**Route:** Booking/otaShare (default: `/booking/ota-share`)
**Module:** Reservations

## Overview
Reconciliation report of booking share, net revenue, and commission by OTA channel for a selected villa over a chosen date range, including a pie chart and a comparison table between the current period and the previous period.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | |
| 2 | Villa | `villa_id` | Select2 | Yes | Villa to reconcile |
| 3 | Date Range | `date_range` | Date range picker | No | Filters by check-in/check-out |

### Display
| # | Column/Component | Notes |
|---|---|---|
| 1 | Pie chart | OTA share by commission |
| 2 | Table 1 | OTA, Commission |
| 3 | Table 2 | OTA, Current Period, Rank, Previous Period, Variation |

## Functions / Actions
- Filter by BU/villa/date range
- Quick date range navigation by month (left/right arrow buttons)

## Navigation
- Opened from: BOOK-054 (Channel Toolkit) > "Share" button
