# BOOK-074 — Seasonal Rate Log

**Type:** Full page (has 2 display modes within the same view)
**Route:** Booking/seasonPriceLogs (default: `/booking/season-price-logs`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Booking

## Overview
Page for reconciling villa selling prices in the internal system (VM/PMS) against the prices listed on the OTA channel (Beds24) for each season, detecting discrepancies/sync gaps; it also allows viewing detailed revenue/price fluctuation information for a specific season ("Season Revenue" mode).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select | No | |
| 2 | Villa | `villa_id` | Select | No | Defaults to the first villa within the permission scope |

### Mode 1 — Seasonal Price Reconciliation Table (default, when no season detail view is selected)
There are 2 table variants depending on the data state:

**a) When VM and Beds24 prices match across all seasons (no discrepancy detected):** a table of daily price log history is shown, with columns for each season plus an "LM" (Last Minute) column when multiple price levels are detected within the same recent season:
| # | Column | Notes |
|---|---|---|
| 1 | (Date) | Date the price was recorded; the "Today" row is directly editable |
| 2..n | Each season | Applicable price; the current row shows a "Season Revenue" (eye) icon that opens Mode 2 for that season; past rows show an increase/decrease/equal marker (↑/↓/=) with the % change versus the previous row |

Next to the table are a **Validation** icon (checkmark, confirms the price) and a **Comment** icon (opens a note popup). The **Show Logs** button shows/hides the table of saved comment logs.

**b) When a discrepancy/missing price is detected between VM and Beds24:** a comparison table with 2 fixed rows is shown:
| # | Column | Notes |
|---|---|---|
| 1 | Source | "VM" (internal system price) or "Beds24" (OTA price) |
| 2..n | Each season (color-coded by season name: low/mid/high/peak) | Corresponding price; may display "N/A", "Missing", "Part. missing" (partial Beds24 data missing), or "Mixed-up <price range>" if multiple different price levels are detected within the same season on Beds24 |

### Mode 2 — Season Revenue Detail (shown when `season_id` is present in the query string)
- Season title bar with navigation arrows to the preceding/following season (`getPriceLogDataAjax` AJAX call)
- 4 groups of KPI cards (3 cards per group: Last year / Current / Future): **Occupancy** (%), **Price** (new price, ฿), **Revenue** (% change), **Advance** (days remaining until the end of the season)
- **Occupancy over time** chart (canvas, with left/right arrows to view a different period)
- **Price Change History** chart within the season (by date)
- **Average Price by Year** chart for this season (comparing from 2022 to the present)

## Functions / Actions
- Filter by Business Unit / Villa
- **Season Revenue** icon (eye) on the current day's price cell — opens Mode 2 for the corresponding season
- **Validation** icon — confirm/record the current price
- **Comment** icon — opens a popup to add a note (`rates_comment`) to the price log
- **Show Logs** button — shows/hides the comment log table
- Left/right arrows on the season title bar (Mode 2) — switch to the adjacent season, reloading data via AJAX

## Navigation
- Opened from: BOOK-066 (Season Logs button)
- Navigates to: no navigation to another page; switches between the 2 display modes on the same page via the `season_id`/`villa_id` query string
