# BOOK-093 — Guest Chat Window (Legacy)

**Type:** Full page (standalone, currently has no access point in the menu/UI)

**Route:** Booking/chat/:booking_id (id is base64_encode'd)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

A legacy WhatsApp chat window for a specific booking: displays message history (WhatsappChat table) and allows sending template messages or free-text messages. This is a predecessor version, now superseded by BOOK-094-P1/BOOK-095-P1 (whatsappChat/whatsappChatNew); no link pointing to this action was found in any current views — it remains accessible only via direct URL.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest Name | guest_detail.first_name/family_name | Display | — | |
| 2 | WhatsApp Status | guest_detail.whatsapp_status | Display | — | null/waiting → allows selecting a message template |
| 3 | Message History | data_array (WhatsappChat) | List | — | Sorted by id ascending |
| 4 | Select Message Template | template_id | Select | No | Only shown when whatsapp_status is null/waiting |
| 5 | Free-Text Message Content | text_message | Textarea | No | |

## Functions / Actions

- Send a template message (calls `WhatsAppUtility::sendTemplateMessage`) or a free-text message (`WhatsAppUtility::sendMessage`), logs to the WhatsappChat table, displays a flash notification, and redirects back to the previous page.

## Navigation

- No link into this screen exists in the current UI (the functionality has been superseded); previously opened from the WhatsApp management list.
- Current equivalent functionality: BOOK-094-P1 (WhatsApp Chat) and BOOK-095-P1 (WhatsApp Chat, new version).
