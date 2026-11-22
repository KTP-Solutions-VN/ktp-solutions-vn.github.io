# BU-010-P1 — Payment Method Form

**Type:** Popup (opened from BU-010, Payment Methods tab)

**Route:** Bootstrap modal (`#exampleModal`) in the `business-unit/main_list.ctp` element; submitted via AJAX to the `BusinessUnitController::paymentMethod()` action (`main-list` tab).

**Module:** Operating Units

## Overview
A shared popup for adding a new payment method or editing an existing one, including selection of applicable business units and linked accounts.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Method Name | `name` | Text | Yes | Duplicate name validated via AJAX `checkPaymentMethod` |
| 2 | Icon | `icon_image` / `cropped_icon` | Image file (1:1 crop, ≤1.2MB) | No | Uploaded to the `payment-method-logo` folder |
| 3 | Applicable Business Units | `business_unit_id[]` | Multi-value checkbox tags | No | |
| 4 | Linked Accounts | `account_ids[]` | Multi-value checkbox tags | No | Account list is dynamically filtered by the selected business unit (AJAX `getBuAccount`) |
| 5 | Action (hidden) | `action` | Hidden (`add`/`edit`) | — | |
| 6 | ID (hidden) | `id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save/Update:** sends an AJAX request to save the `PaymentMethod` record, reverse-syncs the linked account list (`_syncPaymentMethodIntoAccounts`), and reloads the table without a page reload.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-010 (Payment Methods tab) — "Add new" button, Edit icon on each row.
- After submission: remains on BU-010; the table is reloaded via AJAX.
