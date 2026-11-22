# BOOK-063 — Unsynced Reservations

**Type:** Full page
**Route:** Booking/unlinkedBookings (default: `/booking/unlinked-bookings`)
**Module:** Reservations

## Overview
List of bookings that have not been marked as modified/synced by the channel manager (`Booking.is_channel_modify = 0`), used to review bookings with potential data discrepancies between the system and OTA channels.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | No | |
| 2 | Sort By | `sort_by` | Select | No | By value (amount), or default sort by check-in date |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | Check-in Date | |
| 2 | Villa | |
| 3 | OTA | Booking channel (referer) |
| 4 | Confirmation Number | |
| 5 | Total Value | |

## Functions / Actions
- Filter by business unit; sort by value

## Navigation
- Opened from: Reservations module menu > Unsynced Reservations
