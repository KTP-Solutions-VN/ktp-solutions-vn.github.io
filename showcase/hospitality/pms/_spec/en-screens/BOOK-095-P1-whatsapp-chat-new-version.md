# BOOK-095-P1 — Chat Thread

**Type:** Full page (opened from BOOK-095, opens in a new tab)

**Route:** Booking/whatsappChatNew/:booking_id (id is base64_encode'd)

**Pretty route:** `/VM/booking/whatsapp-chat-new/:booking_id` (used directly in the link in the view; not declared in config/Routes.php)

**Module:** Reservations

## Overview

An upgraded version of BOOK-094-P1: a WhatsApp chat window with the guest, adding a calculation of the standard check-in time (priority order: actual declared check-in time → villa's standard time → business unit's standard time → system default constant) for display/reminders within the chat, along with a list of villas by BU/zone for quick filtering.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa, Guest Name, Phone Number | guest_detail.villa/guest | Display | — | |
| 2 | Applicable Check-in Time | check_in_time | Display | — | Calculated by priority order: actual check-in → villa standard time → BU standard time (BOOK-107) → system default |
| 3 | Chat Group Access Code | access_code | Display | — | |
| 4 | List of Access Codes Allowed to View (Concierge) | concierge_access_code | Hidden (used by JS) | — | |
| 5 | Business Unit (secondary filter) | business_unit | Select | No | Includes zones combining multiple BUs |
| 6 | List of Villas by BU (used for client-side filtering) | business_unit_villa | Hidden data (JS) | — | |

## Functions / Actions

- Send/receive real-time messages via AJAX (`getWhatsappChatData`, `saveWhatsappChat`).
- End the chat session (`finishWhatsappChat`).
- Rename the chat participant's display name (`updateChatName`).

## Navigation

- Opened from: BOOK-095 (Chat Inbox) via the Chat button, opening in a new browser tab.
- No further navigation; close the tab to return to BOOK-095.
