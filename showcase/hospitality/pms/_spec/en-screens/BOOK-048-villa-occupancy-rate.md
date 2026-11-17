# BOOK-048 — Villa Occupancy Rate

**Type:** Full page (can be embedded/shared with partners — public widget based on `referer`/`bu`)
**Route:** Booking/occupancy/:string? (default: `/booking/occupancy`)
**Module:** Booking

## Overview
Page displaying villa occupancy statistics by month, filterable by business unit or district, villa type, villa category, displayed as a monthly table along with pricing.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Filter Type | `type` | Select | No | "business" (by business unit) / "district" (by district) |
| 2 | Villa Category | `villa_category` | Select | No | |
| 3 | Business Unit | `business_unit` | Select | No | |
| 4 | Location/Address | `location`/`address` | Select/Text | No | |
| 5 | Partner (Referer) | `referer` | Query param | No | Changes the displayed brand logo |

### Display
Monthly occupancy rate table (`monthly_text`, `occupancy_text`) for each villa, along with pricing.

## Functions / Actions
- Filter by type (business/district), villa category, business unit
- **Book** button — proceeds to the booking flow
- **Download** button — downloads the occupancy report

## Navigation
- Opened from: Booking module menu > Occupancy, or a link shared directly with partners
- Navigates to: the booking flow when clicking Book
