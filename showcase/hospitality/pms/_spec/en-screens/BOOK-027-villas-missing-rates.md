# BOOK-027 — Villas Missing Rates
**Type:** Full page
**Route:** booking/missingRates (query `?id=<business_unit_id>`)
**Module:** Booking

## Overview
Lists villas that have not had a daily rate (villa daily price) configured from the current date up to the "threshold date" configured in BOOK-027-P1, so that managers know which villas need rates added before they can be booked/displayed on OTA channels.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (dropdown) | No | Changing the value navigates to the page with the corresponding `?id=` query; defaults to "All" |

**Displayed List Columns:**
- Villa Name (Property) — only villas missing a rate on any date within the range [today, threshold date] appear in this list.

The page title also displays the "threshold date" currently applied for comparison (retrieved from the configuration set in BOOK-027-P1).

## Functions / Actions
- Filter by Business Unit.
- View the list of villas with missing rates (no direct edit action on this screen — the corresponding villa rate/season management screen must be used to add the missing rates).

## Navigation
- Opened from: Settings menu → Villas Missing Rates.
- Navigates to: villa rate configuration screens (BOOK-023 Villa Rates, BOOK-028 Season Management, BOOK-030 Update Room Rates from OTA Channels) to add the missing rates.
- Sub-popups: BOOK-027-P1 (Missing Rate Alert Configuration).
