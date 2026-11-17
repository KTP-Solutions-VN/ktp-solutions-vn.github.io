# OWN-004 — Villa Status by Owner

**Type:** Full page

**Route:** `/Owner/status/{tab}` (controller `Owner`, action `status($tab)`)

**Module:** Owner Management (Admin)

## Overview

A screen consolidating the operational status of a villa from the owner's perspective: daily rental status, garden service history, pool cleaning, check-out, rate change history (rates-logs), cleaning schedule, and expenses/receipts — displayed as data tabs loaded via AJAX according to the selected villa and date.

## Detailed Description

### General Filters

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | Changing this reloads the villa list |
| 2 | Villa | `villa` | Select2 | No | Villas belonging to the selected business unit |

### Data Tabs

| # | Tab | Field Code | Data Source (ajax) | Notes |
|---|---|---|---|---|
| 1 | Rental | `rental` | `getVillaStatusAjax` | Room/villa status by day of the month |
| 2 | Garden | `garden` | `getGardenCleanings` | Completed garden service history: date, performed by, service, start/end time, PDF document |
| 3 | Pool | `pool` | `getPoolCleanings` | Pool cleaning history |
| 4 | Check-out | `check-out` | `getCheckOut` | Check-out list |
| 5 | Rates-logs | `rates-logs` | `getRatesLogs` | Room rate/commission change history |
| 6 | Cleaning | `cleaning` | `getCleaningData` | Cleaning schedule |
| 7 | Receipts | `receipts` | `getClaimExpenseData` | List of claim expenses charged to the owner: approver, amount, date, supplier, description, status, receipt |

## Functions / Actions

- **Filter by Business Unit/Villa**: reloads the data for the currently active tab.
- **Sync Bookings** (Sync button, Rental tab): calls `GetBooking/index` to sync bookings.
- **View Comments** (icon, Rental tab): opens a small modal within the page showing the comment content for a given day/villa.
- **View Garden Service Details** (eye icon, Garden tab): opens OWN-004-P1.
- **Download Garden Report PDF** (download icon, Garden tab): downloads a PDF file (action `downloadFile`).
- **View Claim Details** (eye icon, Receipts tab): opens OWN-004-P2 (opens in a new browser tab).
- **Download Receipt** (download icon, Receipts tab): downloads the attached receipt file.

## Navigation

- Entered from: main menu (sidebar) item related to Owner/Status, or internal navigation carrying `bu_id`/`villa_id` in the query string.
- Navigates to:
  - OWN-004-P1 — View Garden Service Details (Garden tab)
  - OWN-004-P2 — View Expense Claim Details (Receipts tab)
