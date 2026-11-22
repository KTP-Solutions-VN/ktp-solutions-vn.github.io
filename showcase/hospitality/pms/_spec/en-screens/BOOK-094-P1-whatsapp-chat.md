# BOOK-094-P1 — Chat Thread (Classic)

**Type:** Full page (opened from BOOK-094, opens in a new tab)

**Route:** Booking/whatsappChat/:booking_id (id is base64_encode'd)

**Pretty route:** `/VM/booking/whatsapp-chat/:booking_id` (used directly in the link in the view; not declared in config/Routes.php)

**Module:** Reservations

## Overview

A direct WhatsApp chat window with a booking's guest, displaying guest/villa information and the chat group access code, allowing the assigned concierge staff member to send/receive messages via the WhatsApp API.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | guest_detail.villa.name | Display | — | |
| 2 | Guest Name, Phone Number | guest_detail.guest.* | Display | — | |
| 3 | WhatsApp Status | guest_detail.guest.whatsapp_status | Display | — | |
| 4 | Chat Group Access Code | access_code | Display | — | Used to look up chat history via AJAX |
| 5 | List of Access Codes Allowed to View (Concierge) | concierge_access_code | Hidden (used by JS) | — | Restricts chat viewing permission for users with the Concierge role |
| 6 | Message Template List | template_list | Select | No | Defaults to one template, "Welcome to azurastays" |

## Functions / Actions

- Send/receive real-time messages via AJAX (`getWhatsappChatData`, `saveWhatsappChat`).
- View the read/sent status of each message.
- End the chat session (linked to `finishWhatsappChat`).

## Navigation

- Opened from: BOOK-094 (Chat Inbox (Classic)) via the Chat button, opening in a new browser tab.
- No further navigation; close the tab to return to BOOK-094.
