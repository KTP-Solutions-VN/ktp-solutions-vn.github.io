# VSV-011 — Electricity Check-in Control (Electricity Check-in Control)

**Type:** Full page

**Route:** `VillaServicesController::electricityCheckInControl()` — defaults to `/villa-services/electricity-check-in-control`; all filters are read/written via the query string (GET)

**Module:** Villa Services — Electricity

## Overview
A back-office operations screen enabling staff to verify whether the concierge has recorded the electricity check-in meter reading and photos on time for each booking, monitor overall KPIs, and perform bulk correction/reminder/payment-confirmation actions.

## Detailed Description

### Filters (GET)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | Defaults to the user's authorized BU/zone; includes an "All" option |
| 2 | Date selector | `date_selector` | Select | No | Today / Yesterday / Last 3 days / Pick a past date |
| 3 | Date | `checkin_date` | Date picker | Yes, when `date_selector = pick_a_date` | Shown/hidden based on the Date selector choice |
| 4 | Status | `status` | Select | No | All / Pending / Done / Not Done / Done Late |
| 5 | Concierge | `concierge` | Select | No | List of concierges by BU (Team Leader, Employee, usage "Concierge") |

### KPIs (overview cards)
| # | KPI Name | Notes |
|---|---|---|
| 1 | Pending | Number of bookings not yet processed by the concierge |
| 2 | Done Late | Number of bookings completed but after the check-in date |
| 3 | Done | Number of bookings completed on time |
| 4 | Fixed Collected | Total amount collected via the Collect-Fixed method |
| 5 | Meters Recorded | Number of bookings with a recorded meter reading (used for check-out billing) |

### List (each row is one booking)
| # | Column | Notes |
|---|---|---|
| 1 | Status + Check-in Date | Color-coded label by status (Pending/Done/Done Late/Not Done) with the handler/timestamp |
| 2 | Villa · Guest | Includes booking channel, booking code, check-out date |
| 3 | Method | Electricity calculation method: Collect-Fixed / Collect-Quota / Collect-kWh / Combined / Platform... |
| 4 | Meter | Recorded meter reading + meter photo status |
| 5 | Payment | Amount collected/to be collected |
| 6 | Account | Receiving account/fund, "Confirmed" status if already confirmed |
| 7 | Action | Buttons vary by status: View, Correct Meter-in, Confirm, Flag |

## Functions / Actions
- **Apply**: submits the GET filters, reloads the list + KPIs.
- **Row selection (implicit checkbox)**: updates the "n check-in selected" count for bulk actions.
- **Send reminder** (bulk): opens a confirmation modal, calls the `sendConciergeReminder` AJAX endpoint to notify the concierge responsible for the selected bookings.
- **Confirm money received** (bulk): opens a confirmation modal, calls the `confirmMoneyReceived` AJAX endpoint to mark payment as received for the selected bookings.
- **View** (per row): opens VSV-011-P1 (`viewCheckinControl`) — view meter/photo/payment details for the booking.
- **Correct Meter-in** (per row, when Pending/Done Late/Not Done): opens a modal to re-enter the meter reading + photo (POST submit back to `electricityCheckInControl`, saves `ElectricalBill`).
- **Confirm** (per row, when Done + Collect-Fixed): confirms the fixed amount has been collected.
- **Flag** (per row, when Not Done): flags an unresolved booking for attention.
- List pagination (Paginator).

## Navigation
- Entered from: VSV-001 ("Check-in" tile in the Controls section) or the main menu.
- Navigates to: VSV-011-P1 (View Electricity Check-in Control Detail).
