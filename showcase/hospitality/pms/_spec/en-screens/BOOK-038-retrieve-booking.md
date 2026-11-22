# BOOK-038 — Reservation Lookup

**Type:** Full page
**Route:** Booking/retrieveBooking (default: `/booking/retrieve-booking`)
**Module:** Reservations

## Overview
Screen for retrieving all bookings by booking date/check-in date range and status (including cancelled statuses), used for looking up/retrieving booking information, together with a link to the guest Access Portal, SGAC declaration status, and the responsible person (Leader).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking Date | `booking_date` | Datepicker | No | |
| 2 | Booking Date Range | `booking_range` | Date range picker | No | |
| 3 | Check-in Date | `check_in_date` | Datepicker | No | |
| 4 | Check-in Date Range | `check_in_range` | Date range picker | No | |
| 5 | Status | `status[]` | Multi-select checkbox | No | Includes cancelled statuses |

### List Display Columns
| # | Column | Notes |
|---|---|---|
| 1 | Booking Date | |
| 2 | Check-in | |
| 3 | Check-out | |
| 4 | Villa | |
| 5 | Name | Guest name |
| 6 | Nationality | Nationality |
| 7 | OTA | Booking channel |
| 8 | Access Portal | Link to access the guest information portal |
| 9 | SGAC | SGAC (SG Arrival Card) declaration status |
| 10 | Leader | Person in charge |
| 11 | Status | Booking status |
| 12 | Actions | Actions |

## Functions / Actions
- Filter by booking/check-in date range and status (including Cancelled)
- View details / retrieve information for each booking
- Quick access to the Access Portal, view SGAC status

## Navigation
- Opened from: Reservations module menu > Reservation Lookup
- Navigates to: BOOK-028 (Reservation Record) when viewing details
