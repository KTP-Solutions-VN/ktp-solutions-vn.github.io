# BOOK-110 — SHA Plus Detail (SHA Plus Edit)

**Type:** Full page

**Route:** Booking/shaPlusEdit/:booking_id

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Booking

## Overview

View booking information and update the SHA+ certification status (Amazing Thailand Safety and Health Administration) along with notes for a specific booking.

Note: the links leading to this screen (the "Edit" button in the SHA+ list and the "SHA Plus" menu item) are currently commented out/hidden in the source code (`sha_plus.ctp`, `left-sidebar.ctp`), so this screen can only be accessed directly via URL with a `booking_id`, with no active entry point in the current UI.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking Date | booking.booking_date | Display (read-only) | — | Format d M Y |
| 2 | Check In Date | booking.check_in_date | Display (read-only) | — | |
| 3 | Check Out Date | booking.check_out_date | Display (read-only) | — | |
| 4 | Property Name | booking.villa.name | Display (read-only) | — | |
| 5 | Guest Name | booking.guest.first_name + family_name | Display (read-only) | — | |
| 6 | Guest Phone Number | booking.guest.phone_number | Display (read-only) | — | |
| 7 | SHA + | status | Select | Yes | List of SHA statuses from `CommonController::_getShaStatus()`; defaults to `sha_booking.status` or "Unknown" |
| 8 | Comments | comments | Textarea | Yes | |
| 9 | Business Unit ID | business_unit_id | Hidden | — | Based on the booking's villa |
| 10 | Villa ID | villa_id | Hidden | — | |
| 11 | Booking ID | booking_id | Hidden | — | |

## Functions / Actions

- "Submit" button (or "Update" if `chat_status = On`): saves/updates the `ShaBooking` record (creates new if none exists, updates if one already exists for the `booking_id`), displays a success/error flash message, then redirects to the `shaPlus` action (the SHA+ list screen — currently disabled in the menu).

## Navigation

- No active entry point currently exists in the UI (the corresponding menu item and "Edit" button are commented out); accessed directly via URL `/booking/sha-plus-edit/:booking_id`.
- After saving, redirects to the `shaPlus` action (SHA+ list, currently not linked from any menu).
