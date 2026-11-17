# GST-003 — My Booking Details

**Type:** Full page
**Route:** `Guest::yourBooking($booking_id = null)` — default `/guest/your-booking/:booking_id`; pretty route: `/guest/your-booking` (explicitly declared in `Routes.php`, `booking_id` is not passed in the pretty URL — when omitted, the system uses the guest's default booking `user['guest_booking_id']`)
**Module:** Guest Portal

## Overview
Detail page for a specific booking: displays the villa address, check-in/check-out dates, and allows the guest to confirm or adjust the estimated arrival/departure time (pre-arrival). Once both times have been confirmed, the guest unlocks the button leading to GST-004 (Amenities Access Portal). This is also the default landing page after login (`Auth.loginRedirect`) and the destination of `home_redirect` when the most recent booking has not yet completed time confirmation.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Villa name | `Villa.name` (`property_name`) | Display text | No | |
| 2 | Villa address | `VillaLocation.address` | Display text (click to open map) | No | Clicking the entire row opens `google_map_url` in a new tab |
| 3 | Map link | `VillaLocation.google_map_url` | Link (window.open) | No | |
| 4 | Check-in date | `Booking.check_in_date` | Display text (`d M y`) | No | |
| 5 | Check-out date | `Booking.check_out_date` | Display text (`d M y`, +1 day) | No | |
| 6 | Estimated arrival time | `PreArrivalDetail.estimated_arrival` | Text input + time picker (`mdtimepicker`, `hh:mm`) | Yes, when in edit mode | Cannot select a time within the range 00:00 → the villa/business unit's standard check-in time |
| 7 | Arrival place | `PreArrivalDetail.arrival_place` | Radio: `at_the_airport` / `at_the_property` | Yes | Defaults to `at_the_property`; option list retrieved from `CommonController::_getArrivalPlace()` |
| 8 | Arrival time set by | `check_in_time_set_by` | Hidden input | No | Value is `auto` (system) or `guest` (guest-modified) |
| 9 | Arrival time confirmation status | `PreArrivalDetail.check_in_status` | System status (`no_action`/`unapproved`/`approved`/`reject`) | No | Controls the show/hide state of the edit block and the Confirm button |
| 10 | Arrival time message | (dynamically built string `check_in_message`) | Display text (HTML) | No | Combines static text + time + confirmer + last-updated timestamp |
| 11 | Estimated departure time | `PreArrivalDetail.estimated_departure` | Text input + time picker | Yes, when in edit mode | Cannot select a time within the range of the standard check-out time → 00:00 |
| 12 | Departure time set by | `check_out_time_set_by` | Hidden input | No | Value is `auto`/`guest` |
| 13 | Departure time confirmation status | `PreArrivalDetail.check_out_status` | System status | No | |
| 14 | Departure time message | (dynamically built string `check_out_message`) | Display text (HTML) | No | |
| 15 | Guest booking count | `guest_booking_count` | Number | No | Affects the banner greeting text |

## Functions / Actions
- **"Confirm" button (arrival time)**: calls AJAX `POST /guest/confirm-time` (action `confirmTime`, JSON response only) with `arrival_time`, `arrival_place`, `check_in_time_set_by`, `booking_id` → updates `PreArrivalDetail` (sets `check_in_status = unapproved`, increments `guest_checkin_request_count` if the previous status was not `unapproved`).
- **Pencil "Change" button (arrival time)**: reopens the edit form for a previously confirmed arrival time.
- **"Confirm" button (departure time)**: calls a similar AJAX request for `departure_time`, `check_out_time_set_by`.
- **Pencil "Change" button (departure time)**: reopens the edit form for the departure time.
- **"Access Portal" link/button**: only functions as an active link (navigating to GST-004) once both `check_in_modify_date` and `check_out_modify_date` have values; otherwise, it displays as a greyed-out disabled button, and clicking it shows a warning "please confirm your arrival/departure time before accessing the portal."
- **Home** icon → navigates according to `home_redirect`.
- **Logout** icon → logs out, returns to GST-001.

## Navigation
- → GST-004 (Amenities Access Portal) once both arrival and departure times are confirmed
- → GST-002 (Booking List) via the Home icon (depending on status)
- → GST-001 (logout)
