# SET-004 — Hostex Set-up

**Type:** Full page

**Route:** `SettingController::hostexSetup()` — default `/setting/hostex-setup`; data loaded via AJAX GET `getHostexData()` (`/setting/get-hostex-data`)

**Module:** SET = System Settings

## Overview
A screen for configuring the Hostex distribution-channel integration: for each OTA channel (Booking.com, Airbnb, Agoda, Expedia, Trip.com, etc.), declare the Hostex accounts (email/account name) holding listings, link each account to its corresponding OTA Account, and specify whether the account belongs to **Azura Stays** or an external partner **Agency**. The number of properties linked to each account is automatically calculated from OTA data stored on the Villa and shown as an expandable property list when clicked.

## Detailed Description

The page is rendered 100% dynamically via JavaScript from the AJAX data `getHostexData` (channel list `BookingPlatform`, accounts `HostexAccount` with `Agency`, OTA Account list by channel from `Chanel`, and property counts matched by email/channel from OTA JSON data stored on `Villa`).

Each channel displays one section containing an account table:

| # | Column Name | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Account Email or Name | `email` | Text (display) | |
| 2 | OTA Account | `ota_account_id` | Select (change is saved immediately via AJAX `saveHostexOtaAccount`) | List of OTA Accounts (`Chanel` table) belonging to the corresponding channel |
| 3 | Owner | `owner` | Badge display | "Azura Stays" or "Agency · {agency_name}" |
| 4 | Properties linked | `props` | Number + expand link | Click to load the property list via AJAX `getHostexAccountProperties`; shows "None yet" if 0 |
| 5 | Actions | — | Edit / Delete icons | Edit reopens the add-account form in edit mode (inline, not a modal); Delete opens popup SET-004-P2 |

Channels with no accounts show an empty state: "No account mapped — {channel} bookings arriving from Hostex cannot be matched to a property."

Add/Edit account form (shown/hidden inline below each channel's table, not a modal) — see field details in SET-004-P1.

## Functions / Actions
- **Add account (per channel):** opens/closes the inline add-account form (SET-004-P1) directly below that channel's table.
- **Edit (pencil icon, per account row):** loads that row's data into the inline form (SET-004-P1) in edit mode.
- **Delete (trash icon, per account row):**
  - If the account is linked to at least one property (`props > 0`): opens warning popup SET-004-P3, preventing deletion.
  - If not linked to any property: opens delete-confirmation popup SET-004-P2.
- **Change OTA Account (dropdown):** saved immediately via AJAX `saveHostexOtaAccount`, shows a checkmark icon once saved, then reloads the page.
- **View Properties linked:** expands a sub-row showing the property list (image + name, link to the villa's OTA management page) via AJAX `getHostexAccountProperties`.

## Navigation
- Accessed from: SET-001, or System Settings menu > Hostex Set-up.
- Navigates to: SET-004-P1 (add/edit account form, inline), SET-004-P2 (delete confirmation popup), SET-004-P3 (cannot-delete warning popup).
- External link: from the linked property list, opens the Villa's OTA management page (`/property/villa/ota management/:id`) in a new tab.
