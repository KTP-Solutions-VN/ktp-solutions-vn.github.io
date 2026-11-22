# BU-010-P2 — Confirm Method Deletion

**Type:** Popup (opened from BU-010, Payment Methods tab)

**Route:** Bootstrap modal (`#exampleModalDeletePM`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` action with `action=delete`.

**Module:** Operating Units

## Overview
A confirmation popup shown before permanently deleting a payment method.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the payment method to be deleted |
| 2 | ID (hidden) | `id` | Hidden | Yes | |

## Functions / Actions
- **Delete:** sends an AJAX request to delete the `PaymentMethod` record, removes its link from any accounts (`_syncPaymentMethodIntoAccounts` with an empty list), and reloads the table.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-010 (Payment Methods tab) — Delete icon on each row.
- After submission: remains on BU-010; the table is reloaded via AJAX.
