# OWP-010 — Reservations

**Type:** Full page

**Route:** `ExternalUserController::bookingList()` — no dedicated friendly route (default `/external-user/booking-list`)

**Module:** Owner Hub

## Overview

List of all bookings across the Owner's properties, with filters by property, status, and check-in date/date range.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date filter type | select_date | Select | No | "Date" or "Date Range" |
| 2 | Check-in date | check_in_date | Date | No | Shown when "Date" type is selected |
| 3 | Check-in date range | check_in_range | Date range | No | Shown when "Date Range" type is selected |
| 4 | Property | villa_id | Select2 | No | |
| 5 | Status | status | Select2 | No | Cancelled/Confirmed/New/Request/Black |

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property | villa.name | |
| 2 | Booking source | referer | |
| 3 | Guest name | guest.first_name + family_name | |
| 4 | Country | guest.country | Displays country flag |
| 5 | Check-in time | check_in_date | |
| 6 | Assigned concierge | user.first_name + family_name | |
| 7 | Booking status | status | |
| 8 | Guest chat status | pre_arrival_detail.guest_chat_status | |
| 9 | Actions | — | View details |

## Functions / Actions

- Search/filter bookings
- View booking details (eye icon → OWP-010-P1)

## Navigation

- Accessed from the main menu (Reservations)
- Click the view details icon → OWP-010-P1 (booking detail popup)
