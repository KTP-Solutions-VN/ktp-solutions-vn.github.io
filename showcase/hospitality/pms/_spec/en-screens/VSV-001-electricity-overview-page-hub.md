# VSV-001 — Electricity: Overview Page (Hub)

**Type:** Full page (tile-based navigation hub)

**Route:** `VillaServicesController::list()` — defaults to `/villa-services/list`

**Module:** Villa Services — Electricity

## Overview
The hub page for the Electricity subsystem, grouping child screens into 3 sections (Set-up, Charges, Controls) displayed as tiles for quick navigation. This is not a data-entry page — it is merely the entry point of the Electricity module.

## Detailed Description
There is no data table or filter. The layout consists of 3 sections, each containing several "tiles" (icon + title + short description):

| # | Section | Tile | Link Status |
|---|---|---|---|
| 1 | 1. Set-up | Electricity Set-up | Linked → VSV-002 (`propertySetup`) |
| 2 | 2. Charges | Long Stay Charges | `javascript:void(0)` — not yet linked to a screen (placeholder) |
| 3 | 2. Charges | Payment to Providers | `javascript:void(0)` — not yet linked to a screen (placeholder) |
| 4 | 2. Charges | Payments from Guests | `javascript:void(0)` — not yet linked to a screen (placeholder) |
| 5 | 2. Charges | Balance | `javascript:void(0)` — not yet linked to a screen (placeholder) |
| 6 | 3. Controls | Check-in | Linked → VSV-011 (`electricityCheckInControl`) |
| 7 | 3. Controls | Check-out | Linked → VSV-012 (`electricityCheckOutControl`) |
| 8 | 3. Controls | Stats | `javascript:void(0)` — not yet linked to a screen (placeholder) |

## Functions / Actions
- Clicking each tile navigates to the corresponding screen; tiles marked `javascript:void(0)` are not yet connected (features planned for future addition: Long Stay Charges, Payment to Providers, Payments from Guests, Balance, Stats).
- There are no add/edit/delete buttons on this page.

## Navigation
- Entered from: Main menu ("Electricity" item in the sidebar).
- Navigates to: VSV-002 (Villa Electricity Set-up), VSV-011 (Electricity Check-in Control), VSV-012 (Electricity Check-out Control).
