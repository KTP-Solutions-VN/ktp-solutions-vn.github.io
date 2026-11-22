# BOOK-065 — Recent Reservations

**Type:** Full page
**Route:** Booking/latestBookings (default: `/booking/latest-bookings`)
**Module:** Reservations

## Overview
A tracking table of newly created bookings (default: within the last 24 hours, or a selected date range), accompanied by a monthly net revenue chart. Used to quickly monitor incoming bookings and to exclude owner bookings from actual revenue.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | |
| 2 | Period | `period` | Date range | No | Defaults to the last 24 hours |
| 3 | Chart Display Interval | `duration` | Select | No | Day/Week/Month |
| 4 | Conversion Currency | `currency` | Select2 | No | Used for the net revenue chart |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | Booking Date | |
| 2 | Check-in Date | |
| 3 | Check-out Date | |
| 4 | Channel | OTA channel |
| 5 | Property | |
| 6 | Guest Name | |
| 7 | Currency | |
| 8 | Value | Net revenue (after OTA commission) |
| 9 | Actions | View details/download |

## Functions / Actions
- Filter by business unit/date range/currency
- View the monthly net revenue chart
- Download the list (`downloadLatestBooking`)

## Navigation
- Opened from: Reservations module menu > Recent Reservations
- Navigates to: BOOK-028 (Reservation Record) when clicking on a row
