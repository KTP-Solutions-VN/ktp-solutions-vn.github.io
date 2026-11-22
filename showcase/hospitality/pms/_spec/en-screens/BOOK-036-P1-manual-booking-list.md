# BOOK-036-P1 — Offline Reservations

**Type:** Full page (directly related to BOOK-036)
**Route:** Booking/addBookingList (default: `/booking/add-booking-list`)
**Module:** Reservations

## Overview
List of bookings created manually (manual booking) via BOOK-036, along with their approval status.

## Detailed Description
| # | Column | Notes |
|---|---|---|
| 1 | No | Sequence number |
| 2 | Name | Guest name |
| 3 | Property | Villa |
| 4 | Referer | Booking channel |
| 5 | Created | Creation date |
| 6 | Status | Status |
| 7 | Action | Actions |

## Functions / Actions
- View/edit each manual booking (reopens BOOK-036 with the id)
- View approval status details

## Navigation
- Opened from: BOOK-036 (New Reservation)
- Navigates to: BOOK-036 (when editing)
