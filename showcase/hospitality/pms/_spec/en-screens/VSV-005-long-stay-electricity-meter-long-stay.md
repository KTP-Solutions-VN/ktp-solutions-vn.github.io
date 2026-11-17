# VSV-005 — Long Stay Electricity Meter (Long Stay)

**Type:** Full page

**Route:** `VillaServicesController::partial()` — defaults to `/villa-services/partial`; filters are read via query string (`?villa=&guest_name=&check_in_date=&check_out_date=`)

**Module:** Villa Services — Electricity

## Overview
A list of long-stay bookings with an electricity meter that needs periodic monitoring/entry, kept separate from the regular short-stay check-in/check-out flow.

## Detailed Description

Filters: Business Unit (`business_unit`), Property (`villa`), Guest Name (`guest_name`), Check-in Date (`check_in_date`), Check-out Date (`check_out_date`).

Booking list table:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Guest | `Guest.first_name` | |
| 3 | Check-in | `check_in_date` | |
| 4 | Check-out | `check_out_date` | +1 day |
| 5 | Nights | `nights` | Calculated at runtime |
| 6 | Entered By | `check_in_by` | `ElectricalBill.modified_by` |
| 7 | Last Updated By | `last_updated_by` | `ElectricalBill.end_meter_modified_by` |
| 8 | Action | — | "Enter" → opens VSV-005-P1 (Enter Long Stay Electricity Meter) |

## Functions / Actions
- **Filter by Business Unit / Property / Guest Name / check-in–check-out date range.**
- **Enter** (per row): opens VSV-005-P1 (`addLongStayMeter`).

## Navigation
- Entered from: Main menu (Long Stay item) or after saving VSV-005-P1 (redirect back).
- Navigates to: VSV-005-P1 (Enter Long Stay Electricity Meter).
