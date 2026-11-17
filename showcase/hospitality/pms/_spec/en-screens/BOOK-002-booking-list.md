# BOOK-002 — Booking List
**Type:** Full page
**Route:** Booking/bookingList (default: `/booking/booking-list`)
**Module:** Booking

## Overview
A screen for looking up/searching the list of bookings by check-in date, allowing filtering by business unit, villa, and guest name. Results are displayed in a table grouped by villa/business unit, with quick action buttons: edit, view details, download booking PDF.

## Detailed Description

### Search Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | No | "All" + the list of BUs/zones per the user's permissions |
| 2 | Villa | `villa_id` | Select (select2, required) | Yes | Changing the Business Unit reloads the corresponding villa list via AJAX (endpoint `/VM/common/getBusinessUnitVilla`) |
| 3 | Guest name | `guest_name` | Text | No | Placeholder "Guest Name" |
| 4 | Date type | `calendar_date` | Select | No | `any` (Any) / `other` (Other date) — shown only when a specific villa has been selected |
| 5 | Check-in date | `check_in` | Text + Datepicker (dd-mm-yyyy) | No | Shown only when `calendar_date = other` or no villa has been selected |
| 6 | Search button | `search` | Submit button | - | Submits the form via POST to reload the list |
| 7 | Check-in date navigation | Left/right arrows + hidden datepicker | Button/Datepicker | No | Quickly view the previous/next day |

### Displayed Columns of the Results Table (grouped by villa/business unit)
- Check-in date
- Check-in time
- Villa (name)
- Guest name
- Nationality (flag icon)
- Number of nights (days)
- Booking channel/OTA (referer)
- Actions: Edit (pencil icon), View details (eye icon), Download booking PDF (download icon)

## Functions / Actions
- Search/filter the list by Business Unit, Villa, guest name, check-in date
- Quickly switch the viewed date (left/right arrows or calendar date picker)
- Edit a booking (navigates to BOOK-010)
- Quick view of booking details (navigates to BOOK-002-P1 — `viewBooking`)
- Download the booking information PDF file (`downloadBookingPdf` action, with no dedicated screen — simply a file download action)

## Navigation
- Opened from: Booking module menu ("Booking List")
- Navigates to: BOOK-010 (Edit Booking — Edit button), BOOK-002-P1 (Booking Quick View — View Details button)
- Sub-popups: none (viewBooking opens as a standalone page — see the note in BOOK-002-P1)
