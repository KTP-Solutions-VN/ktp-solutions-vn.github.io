# BOOK-002-P1 — Reservation Preview
**Type:** Full page (NOTE: see the note at the end of this document — despite being named "Quick View," this is not a popup)
**Route:** Booking/viewBooking/:id (default: `/booking/view-booking/:id`, id is base64_encoded)
**Module:** Reservations

## Overview
A page displaying the detailed (read-only) information of a booking: booking code, booking channel, booking date, status, check-in/check-out date and time, amount, OTA commission, net amount received, and guest information (language, number of guests, adults/children, phone number).

## Detailed Description
Field table displayed (entirely text/label, with no editable inputs):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking code (Beds24) | `beds_24_booking_id` | Text (readonly) | - | Displayed in the card title |
| 2 | Booking channel | `referer` | Text (readonly) | - | E.g. Booking.com, Expedia... |
| 3 | Booking date | `booking_date` | Text (readonly) | - | Format d, D M Y H:i:s |
| 4 | Status | `status` | Text (readonly) | - | Confirmed/Cancelled/New/Request/Black |
| 5 | Check-in date | `check_in_detail.check_in_date` + `check_in_time` | Text (readonly) | - | |
| 6 | Check-out date | `check_in_detail.check_out_date` + `check_out_time` | Text (readonly) | - | |
| 7 | Amount | `amount` | Number (readonly) | - | Rounded to 2 decimal places |
| 8 | OTA commission | Calculated from `commission` | Number (readonly) | - | For Booking.com, an additional 7% GST is added |
| 9 | Net amount | Calculated `net_amount` | Number (readonly) | - | = Gross amount minus OTA commission |
| 10 | Guest language | `guest.language` | Text (readonly) | - | N/A if blank |
| 11 | Total number of guests | `guest.guest_no` | Number (readonly) | - | |
| 12 | Number of adults | `guest.adult` | Number (readonly) | - | |
| 13 | Number of children | `guest.child` | Number (readonly) | - | |
| 14 | Mobile phone number | `guest.mobile_number` | Text (readonly) | - | |

## Functions / Actions
- View-only; there are no edit/save buttons on this screen.

## Navigation
- Opened from: BOOK-002 (All Reservations — "View Details" button), BOOK-004 (Recent Reservations — "View Booking" button)
- Navigates to: none (this is the final screen of the flow, view-only)
- Sub-popups: none

## Technical Notes (recommended adjustment)
Upon reviewing `view_booking.ctp`, the view renders a full `page-breadcrumb` + `container-fluid` structure as a standalone layout page, and is opened via a regular `<a href>` link (`$this->Html->link(..., ['action' => 'viewBooking', ...])`) from `latest_bookings.ctp` and `booking_list.ctp` — it does NOT use a `.modal`/AJAX structure loaded into a popup. Therefore, this is in fact a **standalone page (Full page)**, not a Popup as originally described in the requirements. It is recommended to change the screen Type to "Full page" (opened from BOOK-002/BOOK-004).
