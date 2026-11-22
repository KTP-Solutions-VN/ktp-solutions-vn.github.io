# BOOK-035 — On-site Check-out

**Type:** Full page (first step of the multi-step check-out process)
**Route:** Booking/checkOut (default: `/booking/check-out`)
**Module:** Reservations

## Overview
List of villas/bookings pending check-out for the day, allowing staff to select a villa to begin the check-out process (confirming GPS before proceeding to the detailed steps).

## Detailed Description
| # | Column | Notes |
|---|---|---|
| 1 | Property Name | Villa name |
| 2 | Check-out Date | Check-out date |
| 3 | Pending Check-out | Pending check-out status |

Hidden fields: `lat`, `lon` (device GPS coordinates) submitted when starting the process.

## Functions / Actions
- Select a villa to begin the check-out process → proceeds to BOOK-035-P2 (Step 2: Damage Check)

## Navigation
- Opened from: Reservations module menu > On-site Check-out (for on-site staff/concierge)
- Navigates to: BOOK-035-P2
