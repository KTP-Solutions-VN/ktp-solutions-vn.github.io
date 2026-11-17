# VSV-015 — Guest Electricity Bill Lookup (Check Stay)

**Type:** Full page

**Route:** `VillaServicesController::checkStay()` — defaults to `/villa-services/check-stay`; supplementary suggestion data via AJAX `getCheckStay` (no dedicated view)

**Module:** Villa Services — Electricity

## Overview
A quick lookup tool for a villa's electricity data, either by date range (start/end meter readings, amount collected) or by a specific check-in date (full electricity bill detail for a stay: units consumed, charges, discounts, amount paid, payment method).

## Detailed Description

### Filters — "By Date Range" Tab (`tab = villa`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select (select2) | No | |
| 2 | Property | `villa` | Select (select2) | Yes | Only lists villas with electricity management |
| 3 | Start Date | `start_date` | Text (datepicker) | Yes | |
| 4 | End Date | `end_date` | Text (datepicker) | Yes | |

Results table: Date | Amount Paid | Check-out Meter | Check-in Meter (2 rows: start and end of period matching the filtered date, or the nearest ±1 day if there is no exact match).

### Filters — "By Check-in Date" Tab (`tab != villa`)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `villa_in` | Select | Yes | |
| 2 | Check-in Date | `check_in_date` | Text (datepicker) | Yes | |

Results displayed as label/value pairs: Check In Date/Meter, Check Out Date/Meter, Units Consumed/Free Units, Charge/Discount, Amount Paid/Payment Means.

- If no data matches the filter conditions → shows a "No data available..." / "No Check in for property..." message.

## Functions / Actions
- **Search** (each tab): POST submits a search based on the corresponding filters.

## Navigation
- Entered from: Main menu (Electricity/Check Stay item).
- Navigates to: no child page.
