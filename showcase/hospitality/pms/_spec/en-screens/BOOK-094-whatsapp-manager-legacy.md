# BOOK-094 — Chat Inbox (Classic)

**Type:** Full page

**Route:** Booking/whatsAppManager (default: `/booking/whats-app-manager`)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Reservations

## Overview

A list of bookings with an active WhatsApp chat channel (chat_platform_id = 14), allowing staff/concierges to open a direct chat window or end (finish) a chat session. This is the previous version of BOOK-095 (whatsAppManagerNew, which adds a Notifications tab).

## Detailed Description

**List (table), filtered by Business Unit (business_unit, defaults to the logged-in/permission-based BU):**

| # | Displayed Column | Field Code | Notes |
|---|---|---|---|
| 1 | Booking/Check-in/Check-out Dates | booking_date, check_in_date, check_out_date | |
| 2 | Villa | villa.name | |
| 3 | Guest Name | guest.first_name/family_name | |
| 4 | Phone Number | guest.phone_number, phone_number_type | Flags fake phone numbers |
| 5 | OTA | referer | |
| 6 | Access Code | group_chat.access_code | Quick copy |
| 7 | Leader | group_chat.leader_name | |
| 8 | Status | group_chat.status | |
| 9 | Assigned Concierge | group_chat.members | Used to restrict access code visibility for users with the Concierge role |

## Functions / Actions

- "Chat" button (chat bubble icon) opens a new tab → BOOK-094-P1 (whatsappChat).
- End chat button → calls `finishWhatsappChat` (navigates to `/booking/finish-whatsapp-chat/...`).
- Filter by business unit (change BU via the `?id=` query parameter).

## Navigation

- Accessed from: Chat Inbox menu.
- → BOOK-094-P1 (Chat Thread (Classic)) when clicking the Chat button on each row.
- Current replacement version: BOOK-095 (Chat Inbox, which adds a Notifications tab).
