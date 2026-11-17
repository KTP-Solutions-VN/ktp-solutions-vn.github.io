# BU-010-P4 — Delete Account Confirmation Popup

**Type:** Popup (opened from BU-010, Accounts tab)

**Route:** Bootstrap modal (`#exampleModalDelete`) in the `business-unit/accounts.ctp` element; submitted via POST to the `BusinessUnitController::paymentMethod()` action with `tab=accounts`, `page_action=delete`.

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting an account.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the account to be deleted |
| 2 | Tab (hidden) | `tab` | Hidden | — | `accounts` |
| 3 | Page Action (hidden) | `page_action` | Hidden (`delete`) | — | |
| 4 | Account ID (hidden) | `account_id` | Hidden | Yes | |

## Functions / Actions
- **Delete:** sends a POST to delete the `Account` record, removes its link from any payment methods (`_syncAccountIntoPaymentMethods`).
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-010 (Accounts tab) — Delete icon on each row.
- After submission: returns to BU-010 (Accounts tab).
