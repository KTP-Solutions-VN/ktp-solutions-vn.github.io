# BOOK-101 — Property Status

**Type:** Full page

**Route:** Booking/propertyStatus (default: `/booking/property-status`)

**Friendly route:** no dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

Real-time dashboard tracking the cleaning (housekeeping/makeup) status and guest status of each villa within a business unit, helping dispatchers quickly identify which villas need cleaning and which are ready to receive guests.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit_id | Select | Yes | Defaults to the first business unit the user is authorized for |
| 2 | Cleaning Scope | radio (option) | Radio: "Cleaning By Azura" / "Cleaning By Azura & Owner" | Yes | Defaults to "Cleaning By Azura" (value 1) |

**List (table loaded via AJAX `propertystatusAjax`):**

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Villa | — | House icon |
| 2 | Guest (Status) | guest status | Current guest status (in-house/checked out, etc.) |
| 3 | Cleaning | cleaning status | Room/makeup cleaning status, compared against the previous day |
| 4 | Actions | — | Opens the staff detail popup (BOOK-101-P1) |

## Functions / Actions

- Changing the Business Unit or cleaning scope reloads the table via AJAX (`fetchpropertystatus`).
- Quick updates to cleaning/guest/makeup status via AJAX calls `updateCleaningstatus`, `updateGueststatus`, `updateMakeupstatus` (performed directly on the table, without navigating away).
- Clicking a villa row opens popup BOOK-101-P1 (Villa Staff Detail).

## Navigation

- Accessed from the operations/villa management menu.
- Navigates to BOOK-101-P1 (Villa Staff Detail) when a villa row is clicked.
