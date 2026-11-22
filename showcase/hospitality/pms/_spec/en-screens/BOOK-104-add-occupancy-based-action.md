# BOOK-104 — New Pricing Adjustment

**Type:** Full page (opened from BOOK-103)

**Route:** Booking/addAction (default: `/booking/add-action`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

Screen for analyzing villa occupancy rates by business unit, villa type, and date range, then allowing entry of "action" notes to be taken for each villa based on high/low occupancy, which are then saved as a new Villa Action record.

## Detailed Description

**Step 1 — Analysis Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit | Select | Yes | Defaults to the user's business unit; "All" option = 0 |
| 2 | Date Range | date_range | Text (date range picker) | Yes | Format `DD-MM-YYYY/DD-MM-YYYY` |
| 3 | Villa Type | property_type | Select | Yes | "All" = 0, list of Villa Categories |

The "Analyse" button calls AJAX `getAnalysisAction`, returning: number of days, number of villas, average occupancy %, low/high thresholds (lo_percent/hi_percent = occupancy/2 and 50+lo_percent), number of villas below the low threshold, number of villas above the high threshold, and a daily occupancy rate line chart (Google Charts).

**Step 2 — Adjust Thresholds and Check Actions:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 4 | High Threshold | high_percent | Text (input within a colored table) | Yes | Defaults to hi_percent from the analysis step |
| 5 | Low Threshold | low_percent | Text (input within a colored table) | Yes | Defaults to lo_percent |

The "Check Actions" button calls AJAX `updateHighLowOccupancy`, returning a list of villas with occupancy % (color-coded green/yellow/red per threshold) and an "Action" input field (action notes) for each villa.

**Step 3 — Save:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 6 | Action Notes per Villa | data[action][] | Text (input per villa row) | No | |

## Functions / Actions

- "Analyse": runs the occupancy analysis (AJAX `getAnalysisAction`) and draws the chart.
- "Check Actions": recalculates the villa list based on the adjusted high/low thresholds (AJAX `updateHighLowOccupancy`), displaying the villa table with the action input field.
- "Save" (the button's id dynamically changes from "Check Actions" to "Save" once the villa table is displayed): saves all data via AJAX `saveActionData` (creating a new `VillaAction` record), then redirects back to BOOK-103.

## Navigation

- Opened from BOOK-103 ("+ Action" button).
- After successful save, returns to BOOK-103.
