# BU-010 — Payment & Accounts

**Type:** Full page (3 tabs)

**Route:** `BusinessUnitController::paymentMethod($tab, $page_action, $id)` — default `/business-unit/payment-method/{tab}`

**Module:** Business Unit

## Overview
A central configuration page for payment methods (Payment Means), receiving/disbursement accounts (Accounts), and the applicability matrix per business unit, consisting of 3 tabs: "Payment Methods" (`main-list`), "Accounts" (`accounts`), and "Business Unit List" (`business-unit-list`).

## Detailed Description

### Tab 1 — Payment Methods (`main-list`)
List with search/pagination (`pm_search`, `pm_limit`, `pm_page`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Payment Method | `name`, `image` | Icon + name |
| 2 | Applies To (Business Units) | `business_unit_ids` (JSON) | Number of selected units; click to expand the row and toggle each unit (chip) |
| 3 | Linked Accounts | `account_ids` (JSON) | Up to 2 accounts displayed + balance |
| 4 | Updated At | `updated_at`/`created_at`, `updated_by` | |
| 5 | Actions | — | Edit, Delete |

### Tab 2 — Accounts (`accounts`)
List with search/pagination (`account_search`, `acc_limit`, `acc_page`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Account Name | `name`, `account_type` | Cash Account / Bank Account |
| 2 | Account Owner | `owner` | |
| 3 | Account Number | `number` | |
| 4 | Country | `country` | |
| 5 | Currency | `currency_id` → `currency.code` | |
| 6 | Business Units Served | `business_unit_ids` (JSON) | Click to expand the row and toggle via chips |
| 7 | Accepted Payment Methods | `payment_means_ids` (JSON) | Click to expand the row and toggle via cards |
| 8 | Actions | — | Edit (opens the Add/Edit sub-page), Delete, Open Statement/View Statement |

### Tab 3 — Business Unit List (`business-unit-list`)
A read-only table summarizing payment routes per business unit:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Business Unit | `name` | |
| 2 | Payment Methods | — | List of methods applicable to the unit |
| 3 | Method → Account | — | Click to expand and view payment-route details, with a warning for methods that have no linked account or accounts not attached to any route ("Unreachable accounts") |
| 4 | Status | `status` | |

## Functions / Actions
- **Add new (Payment Methods tab):** opens the BU-010-P1 popup in Add mode.
- **Edit payment method:** opens the BU-010-P1 popup in Edit mode.
- **Delete payment method:** opens the BU-010-P2 delete confirmation popup.
- **Toggle applicable business unit or account** directly on the row (chip toggle) — saved immediately via AJAX, no form submission required.
- **Add new / Edit account (Accounts tab):** navigates to the BU-010-P3 sub-page (Add/Edit Account) — using the sub-route `accounts/add` or `accounts/edit/{id}`.
- **Delete account:** opens the BU-010-P4 delete confirmation popup.
- **Open Statement / View Statement:** the "Open Statement" icon opens the BU-010-P5 popup to enter the Opening Date + Opening Balance (`openStatement` action); once opened, the icon links to `Account::statements`.
- **Toggle accepted payment method by account** directly on the row (card toggle) — saved immediately via AJAX.

## Navigation
- Accessed from: Settings menu; or from BU-011 ("Payment methods" button).
- Navigates to: BU-010-P1, BU-010-P2, BU-010-P3, BU-010-P4, BU-010-P5, BU-011 (Payment method by Business Unit).
