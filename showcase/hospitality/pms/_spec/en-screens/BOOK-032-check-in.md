# BOOK-032 — Check-in

**Type:** Full page
**Route:** Booking/checkIn (default: `/booking/check-in`)
**Module:** Booking

## Overview
A list of villas/bookings pending check-in for the day, allowing staff to select one to begin the on-site check-in process (confirming GPS location before proceeding to the detailed workflow).

## Detailed Description
| # | Column | Notes |
|---|---|---|
| 1 | Property Name | Villa name |
| 2 | Check-in Date | Check-in date |
| 3 | Pending Check-in | Pending check-in status |

Hidden fields: `lat`, `lon` (device GPS coordinates), `date` — submitted along with the request when starting the process.

## Functions / Actions
- Select a villa to begin the check-in process (GPS confirmation) → navigates to BOOK-033 (Check-in Progress)

## Navigation
- Opened from: Booking module menu > Check-in (for on-site staff/concierge)
- Navigates to: BOOK-033 (Check-in Progress)
