# BOOK-090 — Link Chat to Another Booking

**Type:** Full page (opened from BOOK-089)

**Route:** Booking/linkChat/:booking_id (id is base64_encode'd)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

Allows linking (merging) the chat of a new booking into an already-open chat group belonging to another booking (for example, a guest making consecutive bookings for the same villa/group), avoiding the need to open a new chat channel. After linking, the Firebase data of the old chat is copied to the current booking and the old chat is closed.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking Date | booking_date | Display | — | |
| 2 | Check-in / Check-out Date | check_in_date / check_out_date | Display | — | |
| 3 | Villa | villa.name | Display | — | |
| 4 | Guest Name | guest.first_name/family_name | Display | — | |
| 5 | Guest Nationality | guest.country | Display (if available) | — | |
| 6 | Current Chat Status | chat_status | Display | — | "To Open" if Off, otherwise "Active" |
| 7 | Business Unit | business_unit_id | Select | Yes | Used to look up the villa to link to |
| 8 | Villa to Link | villa_id | Select | Yes | Loaded based on the selected BU |
| 9 | Check-in Date to Search | check_in | Text (datepicker) | Yes | Used to search for the target booking to link |
| 10 | Booking Search Results for Linking | (`#link_booking` panel) | AJAX table | — | Displays the list of bookings matching the criteria for selecting a link target |

## Functions / Actions

- "Retrieve and Link" button: calls an AJAX action to search for matching bookings by villa/check-in date, displaying the results in the `#link_booking` panel for selection.
- Selecting a target booking and confirming the link → submits the form (POST) → sets the old chat status to "Inactive", creates a new GroupChat record with `status = Link`, copies Firebase data (`copyFirebaseData`), closes the old Firebase chat (`updateFirebaseChatStatus`), displays a success/error message, and redirects back to BOOK-089.

## Navigation

- Opened from: BOOK-089 (Link button on rows with status "New").
- After a successful link → returns to BOOK-089.
- Once linked, the booking's link relationship can be reviewed at BOOK-091 (View Linked Chat).
