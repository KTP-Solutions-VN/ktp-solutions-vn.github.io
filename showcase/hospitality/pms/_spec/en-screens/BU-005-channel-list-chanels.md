# BU-005 — Channel List (Chanels)

**Type:** Full page

**Route:** `BusinessUnitController::chanels()` — default `/business-unit/chanels`

**Module:** Business Unit

## Overview
A list of sales/payment channels (Chanel) associated with business units — used to configure the payment counterparty (manager, receiving account, payment type). This is the legacy channel management screen; a newer version that also incorporates Booking Platform and OTA Content Elements is available at BU-007.

## Detailed Description

List (DataTable):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Channel Name | `name` | |
| 3 | Ownership | `ownership` | `Azura Stays` / `Partner` |
| 4 | Created On | `created_at` | |
| 5 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add new:** opens the BU-005-P1 popup in Add mode.
- **Edit (pencil icon):** opens the BU-005-P1 popup in Edit mode, pre-populated with data.
- **Delete (trash icon):** opens the BU-005-P2 delete confirmation popup.
- All three actions (add/edit/delete) log an activity entry.

## Navigation
- Accessed from: Business Unit menu > Channels (Chanels).
- Navigates to: BU-005-P1 (add/edit channel popup), BU-005-P2 (delete confirmation popup).
