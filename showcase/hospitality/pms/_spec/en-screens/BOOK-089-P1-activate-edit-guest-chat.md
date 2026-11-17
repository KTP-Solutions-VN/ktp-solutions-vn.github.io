# BOOK-089-P1 — Activate / Edit Guest Chat

**Type:** Full page (opened from BOOK-089)

**Route:** Booking/activateChat/:booking_id (id is base64_encode'd)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route, e.g. `/booking/activate-chat/<base64_id>`)

**Module:** Booking

## Overview

A form for activating a chat group (GroupChat) for a specific booking: select the chat platform, assign the leader/concierge/villa owner-manager, and send a welcome message in the guest's language. If the "Whatsapp AI" platform is selected, the system automatically sends a template message via the WhatsApp API before saving.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking Date | booking_date | Display | — | Read-only |
| 2 | Check-in / Check-out Date | check_in_date / check_out_date | Display | — | check_out_date +1 day |
| 3 | Villa | villa.name | Display | — | |
| 4 | Guest Name | guest.first_name/family_name | Display | — | |
| 5 | Phone Number | phone_number | Text | No | Has an icon marking a fake phone number |
| 6 | Personal Email | personal_email | Text | No | |
| 7 | OTA Email | guest_email | Text (readonly) | — | |
| 8 | Guest Nationality | country | Select | No | List of countries |
| 9 | OTA | referer/confirmation_number | Display | — | Icon per OTA channel |
| 10 | Chat Platform | chat_platform_id | Select | Yes | List of ChatPlatform values, default id=2; if "Whatsapp AI" is selected, an automatic welcome message is sent via the API |
| 11 | Opened By | opened_by / opened_by_user | Hidden + display | — | Defaults to the current user |
| 12 | Opened Date | opened_on | Display | — | Only shown if already set |
| 13 | Leader | leader_id | Select | Yes | List filtered by BU + guest language |
| 14 | Concierge | concierge_id[] | Select multiple | No | Concierges speaking the same language are prioritized (highlighted) |
| 15 | Villa Owner/Manager | owner_manager_id[] | Select multiple | No | |
| 16 | Send Welcome Message | welcome | Select Yes/No | No | Disabled if already sent previously |
| 17 | Welcome Message Title | welcome_title_id | Select | No | Per villa/language |

## Functions / Actions

- Save/Confirm button (form submit) — calls `activateGroupChat` to create/update the GroupChat, logs to Firebase when Whatsapp AI is used, and redirects back to BOOK-089.
- Fake call icon next to the phone number.

## Navigation

- Opened from: BOOK-089 (Open/Edit button on each row).
- After saving → returns to BOOK-089 (Villa Chat List).
