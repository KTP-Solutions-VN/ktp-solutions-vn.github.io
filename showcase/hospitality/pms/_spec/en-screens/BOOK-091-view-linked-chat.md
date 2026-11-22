# BOOK-091 — Merged Conversation

**Type:** Full page / view-only (opened from BOOK-089)

**Route:** Booking/viewLinkedChat/:booking_id (id is base64_encode'd)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Reservations

## Overview

A read-only screen displaying information for the current booking alongside the original booking that its chat was linked to (see BOOK-090), helping staff quickly trace the origin of a merged chat.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Current booking: booking/check-in/check-out dates | booking_date, check_in_date, check_out_date | Display | — | |
| 2 | Current booking: villa, guest name, phone, nationality | villa.name, guest.* | Display | — | |
| 3 | Linked-to booking (link_id): booking/check-in/check-out dates, villa, guest name, phone, nationality | linked_booking.* | Display | — | Retrieved via GroupChat.link_id → original booking |

## Functions / Actions

- View only; no edit/save actions on this screen.

## Navigation

- Opened from: BOOK-089 (eye icon on rows where `GroupChat.status = Link`).
- No further navigation; use the browser's back button to return to BOOK-089.
