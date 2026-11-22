# VSV-012 — Departure Reading Audit

**Type:** Full page

**Route:** `VillaServicesController::electricityCheckOutControl()` — defaults to `/villa-services/electricity-check-out-control`; filters are read/written via the query string (GET)

**Module:** In-Stay Services — Metering

## Overview
An operations screen for verifying electricity check-out collection: end meter reading, calculated amount, amount actually paid by the guest, proof of payment, and discounts requiring approval.

## Detailed Description

### Filters (GET)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | Based on BU/zone authorization |
| 2 | Date selector | `date_selector` | Select | No | Today / Yesterday / Last 3 days / Pick a past date |
| 3 | Date | `checkout_date` | Date picker | Yes, when selecting "Pick a past date" | |
| 4 | Status | `status` | Select | No | All / Blocked / Pending / Collected / Done Late |
| 5 | Check-in status | `check_in_status` | Select | No | All / Done / Done Late / Not Done |
| 6 | Concierge | `concierge` | Select | No | List of concierges by BU |

### KPIs (overview cards)
| # | KPI Name | Notes |
|---|---|---|
| 1 | Blocked | Bookings blocked (missing prerequisite, e.g., no start meter) |
| 2 | Pending Collection | Payment not yet collected |
| 3 | Discounts | Number of discounts pending/already applied |
| 4 | Collected | Payment collected |
| 5 | Amount Collected | Total amount collected |

### List (each row is one booking)
| # | Column | Notes |
|---|---|---|
| 1 | Status + check-out date | Label by Blocked/Pending/Collected/Done Late |
| 2 | Villa · Guest | Channel, booking code |
| 3 | Method | Electricity calculation method |
| 4 | Meter | End meter reading, meter photo |
| 5 | Payment | Calculated/collected amount, proof of payment |
| 6 | Account | Receiving account |
| 7 | Action | Buttons vary by status, e.g., View, Correct Meter-out |

## Functions / Actions
- **Apply**: submits the GET filters.
- **Send reminder** (bulk): reminds the concierge to complete the electricity check-out (AJAX `sendConciergeReminder`).
- **Confirm payment received** (bulk): confirms payment received for the selected bookings (AJAX `confirmMoneyReceived`).
- **Validate discounts**: confirms/approves pending electricity discounts.
- **View** (per row): opens VSV-012-P1 (`viewCheckOutControl`) — view details.
- **Correct Meter-out** (per row): opens a modal to edit the end meter reading/photo, POST submit back to `electricityCheckOutControl`.
- List pagination.

## Navigation
- Entered from: VSV-001 ("Departure Reading Audit" tile in the Controls section) or the main menu.
- Navigates to: VSV-012-P1 (Departure Reading Detail).
