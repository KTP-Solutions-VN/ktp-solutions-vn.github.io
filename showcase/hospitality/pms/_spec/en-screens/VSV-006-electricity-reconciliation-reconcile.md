# VSV-006 — Electricity Reconciliation (Reconcile)

**Type:** Full page

**Route:** `VillaServicesController::reconcile()` — defaults to `/villa-services/reconcile`

**Module:** Villa Services — Electricity

## Overview
Reconciles electricity bills (`ElectricalBill`) that have ended (end_date) within the last 3 months, split into 2 groups: fully reconciled (has an end meter reading) and still outstanding (no end meter reading yet/not completed).

## Detailed Description

Filter: Business Unit (`business_unit`, select with "All").

Two data tables:

| # | Column Name (common to both tables) | Field Code | Notes |
|---|---|---|---|
| 1 | Villa | `villa.name` | |
| 2 | Start / End Date | `start_date` / `end_date` | |
| 3 | Start / End Reading | `start_meter` / `end_meter` | |
| 4 | Amount Due | `bill` | |
| 5 | Amount Received | `recieved` | |
| 6 | Paid By | `paid_by` → name (`PAYMERCHANT`) | |
| 7 | Status | `meter_status` | "Reconcile" table: has `end_meter`; "Outstanding" table: no `end_meter` yet |

Data retrieval conditions: `ElectricalBill.end_date` within the range `[today - 3 months, today)`; excludes villas with `electricity_management = no` (electricity not managed) or `inclusion = yes` (electricity already included in the room rate).

## Functions / Actions
- **Filter by Business Unit.**
- **Mark as reconciled** (per row, AJAX `updateMeterStatus`): sets `meter_status = Cleared` for the electricity bill; no dedicated view.
- No direct add/edit/delete actions on this page (view and status-confirmation only).

## Navigation
- Entered from: Main menu (Reconcile/Electricity Reconciliation item).
- Navigates to: no child page; there is an implicit link to data in VSV-004-P1/VSV-005-P1 (no direct navigation).
