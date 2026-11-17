# BU-022-P2 — Popup: Confirm Booking Platform Deletion

**Type:** Popup (opened from BU-022, Booking Platform tab)

**Route:** Static Bootstrap modal (`#deletePlatformModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('platforms')` with `platform_action=delete`.

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting a booking platform. The system blocks deletion if any Channel Account (`Chanel`) is still using this platform, displaying the list of accounts that must be removed first.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the platform to be deleted |
| 2 | ID (hidden) | `platform_id` | Hidden | Yes | |
| 3 | Name (hidden) | `platform_name` | Hidden | Yes | |

## Functions / Actions
- **Delete:** submits a POST request to delete the `BookingPlatform` record; if linked channel accounts still exist, an error flash message with the list of accounts is displayed instead of deleting.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-022 (Booking Platform tab) — Delete icon on each row.
- After submission: remains on BU-022 (`platforms` tab).
