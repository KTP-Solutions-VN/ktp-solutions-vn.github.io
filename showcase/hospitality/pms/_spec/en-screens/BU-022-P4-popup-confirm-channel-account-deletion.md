# BU-022-P4 — Popup: Confirm Channel Account Deletion

**Type:** Popup (opened from BU-022, Channel Account tab)

**Route:** Static Bootstrap modal (`#deleteModal`) within `channels.ctp`; submits via POST to `BusinessUnitController::channels('accounts')` with `action=delete`.

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting a channel account.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the account to be deleted |
| 2 | ID (hidden) | `id` | Hidden | Yes | |

## Functions / Actions
- **Delete:** submits a POST request to delete the `Chanel` record.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-022 (Channel Account tab) — Delete icon on each row.
- After submission: remains on BU-022 (`accounts` tab).
