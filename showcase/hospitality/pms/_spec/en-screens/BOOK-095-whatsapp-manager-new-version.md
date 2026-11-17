# BOOK-095 — WhatsApp Manager (New Version)

**Type:** Full page (tabbed)

**Route:** Booking/whatsAppManagerNew/:tab? (default: `/booking/whats-app-manager-new`)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

An upgraded version of BOOK-094, consisting of 2 tabs: "WhatsApp Manager" (list of bookings with a WhatsApp chat channel, similar to BOOK-094 but with an added phone number change warning) and "Notifications" (configures the WhatsApp notification level for each staff member within a business unit).

## Detailed Description

**Tab 1 — WhatsApp Manager** (list, filtered by Business Unit):

| # | Displayed Column | Field Code | Notes |
|---|---|---|---|
| 1 | Booking/Check-in/Check-out Dates | booking_date, check_in_date, check_out_date | |
| 2 | Villa, Guest Name, Phone Number | villa.name, guest.* | |
| 3 | WhatsApp Status / Number Change | guest.whatsapp_status, guest.is_number_change | Warning icon if the guest's phone number has changed |
| 4 | Access Code, Leader, Status | group_chat.* | |

**Tab 2 — Notifications:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | List of Staff by Business Unit | notification_users | List (grouped: Concierge/BU Manager/Admin/Superadmin) | — | |
| 2 | Notification Level | notification_type | Select: Full / Ltd / Off | Yes | Saved via the `setUserNotification` AJAX action |

## Functions / Actions

- Switch tabs via the nav-tabs bar (`whatsapp_manager` / `notifications`).
- "Chat" button on each row (Tab 1) → opens BOOK-095-P1 (whatsappChatNew).
- End chat button → `finishWhatsappChat`.
- Change notification level (Tab 2) → saved immediately via AJAX.
- Regenerate WhatsApp token (if authorized) → `regenrateWhatsappToken`.

## Navigation

- Accessed from: WhatsApp menu (replaces BOOK-094).
- → BOOK-095-P1 (WhatsApp Chat, new version) when clicking the Chat button.
- Contains a help link to BOOK-096 (WhatsApp Help).
