# OWN-005 — Owner Occupancy Calendar

**Type:** Full page

**Route:** `/Owner/calendar` (controller `Owner`, action `calendar()`)

**Module:** Owner Relations (Admin)

## Overview

A calendar view screen showing the booking status of villas by Business Unit and selected date range, supporting booking tracking from the owner management perspective. Allows downloading booking data based on the applied filters.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date Range | `date_range` | Date range picker | No | |
| 2 | Business Unit | `business_unit` | Select2 | No | Defaults to "All" |
| 3 | Villa | `villa` | Select2 | No | Villas belonging to the selected business unit |

Calendar (booking) data is loaded via AJAX (`getVillaBookingDetail`) and displayed as a monthly calendar grid (`#calendar-html`), not a fixed-column list table.

## Functions / Actions

- **Search**: reloads the calendar data based on the selected filters.
- **Download** (Download button): downloads the filtered booking data (action `getVillaBookingDownload`).

## Navigation

- Entered from: main menu (sidebar) item "Owner Occupancy Calendar".
- No child popups; this is a standalone screen.
