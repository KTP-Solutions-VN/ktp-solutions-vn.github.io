# BU-022-P3 — Channel Account Form

**Type:** Popup (opened from BU-022, Channel Account tab)

**Route:** Static Bootstrap modal (`#chanelModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')`.

**Module:** Operating Units

## Overview
A shared popup for adding and editing a channel account (`Chanel`) belonging to a specific Booking Platform, configuring ownership, management, applicable Business Units, and payment collection/disbursement terms.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account Name | `name` | Text | Yes | |
| 2 | Ownership | `ownership` | Select (`Azura Stays` / `Partner`) | Yes | |
| 3 | Platform | `booking_platform_id` | Select | Yes | |
| 4 | Manager | `manager` | Text | No | |
| 5 | Applicable Business Unit | `business_unit_ids[]` | Select multiple (select2) | Yes | |
| 6 | Payment Receiving Account | `paid_to_account` | Select (select2) | No | List of `Account` records |
| 7 | Paid Out | `paid_out` | Number (days) | No | Includes a timing selector: Check In/Check Out |
| 8 | Payout Timing Type | `paid_out_type` | Select (`Check In` / `Check Out`) | No | |
| 9 | Received | `received` | Number (days) | No | |
| 10 | Action (hidden) | `action` | Hidden (`add`/`edit`) | — | |
| 11 | ID (hidden) | `id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save:** saves the `Chanel` record, logs the activity.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-022 (Channel Account tab) — "Add new" button, Edit icon on each row.
- After submission: remains on BU-022 (`accounts` tab).
