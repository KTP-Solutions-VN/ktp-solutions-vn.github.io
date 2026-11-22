# OWP-012 — Upcoming Arrivals

**Type:** Full page

**Route:** `ExternalUserController::checkIn()` — no dedicated friendly route (default `/external-user/check-in`)

**Module:** Owner Hub

## Overview

List of bookings in check-in status, with filters by property and check-in date range; supports exporting data to an Excel file (.xls).

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date filter type | select_date | Select | No | "Date" or "Date Range" |
| 2 | Check-in date range | check_in_range | Date range | No | |
| 3 | Property | villa_id | Select2 | No | |

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Check-in staff | check_in_detail.check_in_staff | |
| 2 | Property | villa.name | |
| 3 | Booking channel | referer | |
| 4 | Guest name | guest.first_name + family_name | |
| 5 | Country | guest.country | Displays flag |
| 6 | Check-in time | check_in_date | |
| 7 | Transfer information | pre_arrival_detail.transfer_data | |
| 8 | Estimated arrival time | pre_arrival_detail.estimated_arrival | |
| 9 | Assigned concierge | user.first_name + family_name | |
| 10 | Guest chat status | pre_arrival_detail.guest_chat_status | |

## Functions / Actions

- Search/filter by property and date range
- Export the list to an Excel file (.xls)

## Navigation

- Accessed from the main menu (Upcoming Arrivals)
- No dedicated detail navigation (this is a consolidated list)
