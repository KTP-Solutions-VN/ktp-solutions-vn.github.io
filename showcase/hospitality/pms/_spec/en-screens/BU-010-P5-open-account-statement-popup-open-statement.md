# BU-010-P5 — Open Account Ledger

**Type:** Popup (opened from BU-010, Accounts tab)

**Route:** Bootstrap modal (`#openStatementModal`) in the `business-unit/accounts.ctp` element; submitted via POST to `BusinessUnitController::openStatement()`.

**Module:** Operating Units

## Overview
A popup for entering the Opening Date and Opening Balance to "open a statement" (activate transaction/statement tracking) for an account that has not yet been opened. Once opened, the system automatically creates an "Opening balance" (credit) entry as the starting balance; the icon in the list changes from "Open Account" to "Statement" and links directly to `Account::statements`.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account ID (hidden) | `accounting_id` | Hidden | Yes | Set via JS when the "Open Statement" icon is clicked on a row in the Accounts table |
| 2 | Opening Date | `opening_date` | Date picker (text + date picker) | Yes | |
| 3 | Opening Balance | `opening_balance` | Number (text) | Yes | Must be a valid number (validated with `number: true`) |

The popup title dynamically displays as "Open Statement: `<account name>`".

## Functions / Actions
- **Save:** submits a POST to `openStatement`; updates `Account.opening_date`, `Account.opening_balance`, `Account.opened_by`, `Account.opened_date`, `Account.is_statement_open = open`; also creates an `AccountStatement` record (type `credit`, `is_opening_statement = 1`, description "Opening balance", `ref = <account name>-00001`); logs an Access Log entry; displays a success/error flash message; returns to the previous page.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-010 (Accounts tab) — "Open Statement" icon (shown only when the account's statement has not yet been opened, `is_statement_open != 'open'`).
- After submission: returns to BU-010 (Accounts tab).
- Once the account's statement has been opened: the icon changes to "Statement", navigating to `Account::statements` (outside the scope of the Business Unit module).
