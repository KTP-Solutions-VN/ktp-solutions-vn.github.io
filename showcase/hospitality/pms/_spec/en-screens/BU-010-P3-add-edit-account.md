# BU-010-P3 — Add/Edit Account

**Type:** Sub-page (opened from BU-010, Accounts tab — replaces the list table when the `page_action=add|edit` parameter is present)

**Route:** `BusinessUnitController::paymentMethod('accounts', 'add')` or `paymentMethod('accounts', 'edit', $id)` — default `/business-unit/payment-method/accounts/add` or `/business-unit/payment-method/accounts/edit/{id}`

**Module:** Business Unit

## Overview
A full form for adding a new Account or editing an existing one, used for receiving/disbursing funds, including account type, banking details, the business units it serves, and the accepted payment methods.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account Name | `account_name` | Text | Yes | Duplicate name validated via AJAX `checkAccountName` |
| 2 | Account Type | `account_type` | Radio (`Cash Account` / `Bank Account`) | Yes | |
| 3 | Account Owner | `owner` | Text | Yes | |
| 4 | Account Number | `number` | Text | Yes | |
| 5 | Country | `country` | Select (select2) | Yes | |
| 6 | Currency | `currency_id` | Select (select2) | Yes | |
| 7 | Business Units Served | `business_units[]` | Multi-value checkbox, with an "All" option | No | |
| 8 | Accepted Payment Methods | `payment_means_ids[]` | Multi-select (select2) | No | List is dynamically filtered by the selected business units (AJAX `ajaxGetPaymentMeans`) |
| 9 | Tab (hidden) | `tab` | Hidden | — | `accounts` |
| 10 | Page Action (hidden) | `page_action` | Hidden | — | `add`/`edit` |
| 11 | Account ID (hidden) | `account_id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save:** saves the `Account` record, syncs the linked list of payment methods (`_syncAccountIntoPaymentMethods`).
- **Cancel:** returns to the account list (BU-010, Accounts tab).

## Navigation
- Opened from: BU-010 (Accounts tab) — "Add new" button, Edit icon on each row.
- After submission: returns to BU-010 (Accounts tab).
