# BOOK-089 — Villa Chat List (Villa Chat)

**Type:** Full page

**Route:** Booking/villaChats (default: `/booking/villa-chats`)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

A list of all bookings currently in the messaging/guest-care stage (from 5 days before the booking date up to the present, not cancelled), together with the chat group (GroupChat) status for each booking, allowing staff to open/activate chats, link a chat to another booking, or view a linked chat. This is the central screen for managing guest messaging channels (Messenger/Zalo/WhatsApp AI, etc.) by villa.

## Detailed Description

**Filters/Search:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit | Select (list of BUs + "All") | Yes | Defaults to the logged-in BU / `property_business_unit_id` cookie; supports grouped BUs (zone) |
| 2 | Sort By | sort_by | Select: Newest First / Check In Date / Status / Property Name | Yes | Defaults to "Newest First" |

**List (table):**

| # | Displayed Column | Field Code | Notes |
|---|---|---|---|
| 1 | Booking Date | booking_date | Format d M y; highlighted orange if it matches the check-in date |
| 2 | Check-in Date | check_in_date | |
| 3 | Check-out Date | check_out_date | Actual check_out_date = DB check_out_date + 1 day |
| 4 | Villa | villa.name | |
| 5 | Guest Name | guest.first_name + guest.family_name | |
| 6 | Nationality | country_icon | Country flag inferred from phone number/declared nationality |
| 7 | OTA | referer | Icon for Booking.com/Agoda/Expedia/Airbnb/other |
| 8 | Portal | (QR code/copy code) | Copy access code for the guest portal |
| 9 | TDAC | beds_24_booking_id | Copy TDAC link + button to automatically send TDAC email (sendTdacEmail) |
| 10 | Chat Group Leader | group_chat.leader_name | |
| 11 | Status | status/status_name | New / Active / Archived / Not required / To Open; warning icon for fake phone numbers, WhatsApp blocked, etc. |
| 12 | Actions | — | View linked chat / Open (activate) / Link / Edit |

## Functions / Actions

- Filter by BU and sort, submit the form to reload the list.
- "Retrieve Booking" button (top right) → opens BOOK-038 (Retrieve Booking, `retrieveBooking` action).
- For each row where `GroupChat.status = Link`: view button (👁) → BOOK-091 (viewLinkedChat).
- For rows with status "New": open button (🔗 external) → BOOK-089-P1 (activateChat); link button (🔗) → BOOK-090 (linkChat).
- For rows with status Active/Archived/Not required: edit button (✏️) → BOOK-089-P1 (activateChat, edit mode).
- Row toggle to quickly open an inline chat group confirmation form (select language, leader, add members, send welcome message) — calls the `updateGroupChat` AJAX action.
- Copy access code, copy TDAC link via icon.
- Toggle to block communication (Mobile/WhatsApp/Do Not Disturb) via the `banCommunication` AJAX action.

## Navigation

- Accessed from: "Chat" / "Guest Messaging" menu item in the sidebar.
- → BOOK-089-P1 (Activate/Edit Chat) when clicking Open or Edit.
- → BOOK-090 (Link Chat) when clicking Link.
- → BOOK-091 (View Linked Chat) when clicking the eye icon.
- → BOOK-038 (Retrieve Booking) when clicking "Retrieve Booking".
