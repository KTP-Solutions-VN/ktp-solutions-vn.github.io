# BU-005-P1 — Add/Edit Channel Popup

**Type:** Popup (opened from BU-005)

**Route:** Static Bootstrap modal (`#chanelModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action.

**Module:** Business Unit

## Overview
A shared popup for adding a new channel (Chanel) or editing an existing one — configuring the channel name, ownership, manager, applicable business units, and payment receipt/disbursement method.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Channel Name | `name` | Text | Yes | Duplicate name validated via AJAX `checkChanel` |
| 2 | Ownership | `ownership` | Select (`Azura Stays` / `Partner`) | Yes | |
| 3 | Manager | `manager` | Text | No | |
| 4 | Applicable Business Units | `business_unit_ids` | Multi-select (select2) | No | List of Active business units |
| 5 | Payment Receiving Account | `paid_to_account` | Select (select2) | No | List of `Account` records |
| 6 | Paid Out | `paid_out` | Input | No | |
| 7 | Payout Timing Type | `paid_out_type` | Select (`Check In` / `Check Out`) | No | |
| 8 | Received | `received` | Input | No | |
| 9 | Image | `image` / `cropped_image` | Image file (crop) | No | Uploaded to the `villas` folder |
| 10 | Logo | `logo` / `cropped_logo` | Image file (crop) | No | Uploaded to the `chanels-logo` folder |
| 11 | Action (hidden) | `action` | Hidden (`add`/`edit`) | — | |
| 12 | ID (hidden) | `id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save/Update** (label changes depending on the action): saves the `Chanel` record, logs the activity, displays a flash message.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-005 (Channel list) — "Add new" button, Edit icon on each row.
- After submission: redirects back to BU-005 (`referer()`), displays a flash message.
