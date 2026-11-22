# OWP-013 — Upcoming Departures

**Type:** Full page

**Route:** `ExternalUserController::checkOut()` — no dedicated friendly route (default `/external-user/check-out`)

**Module:** Owner Hub

## Overview

List of bookings in check-out status, with filters by property and check-out date range; supports exporting data to an Excel file (.xls).

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date filter type | select_date | Select | No | "Date" or "Date Range" |
| 2 | Check-out date range | check_in_range | Date range | No | Filters by `check_out_date` |
| 3 | Property | villa_id | Select2 | No | |

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Check-in staff | check_in_detail.check_in_staff | |
| 2 | Property | villa.name | |
| 3 | Country | guest.country | Displays flag |
| 4 | Check-out time | check_out_date | |
| 5 | Transfer information | pre_arrival_detail.transfer_data | |
| 6 | Assigned concierge | user.first_name + family_name | |
| 7 | Notes | notes | |

## Functions / Actions

- Search/filter by property and date range
- Export the list to an Excel file (.xls)

## Navigation

- Accessed from the main menu (Upcoming Departures)
- No dedicated detail navigation (this is a consolidated list)
