# ACC-007 — Account Ledger

**Type:** Full page

**Route:** `AccountController::statements($account_id)` — default `/account/statements/<account_id>` (`account_id` passed as base64 in the URL)

**Module:** Finance & Admin

## Overview
View the statement of a specific Account: lists all credit/debit entries recorded, calculating a running balance in entry order. Each account that is currently "open for statements" appears as its own entry in the Statements menu.

## Detailed Description

List (DataTable `#zero_config_2`, no server-side pagination, default sort by `AccountStatement.id` ASC then reversed to show the most recent entries first):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | Format `d M y` |
| 2 | Ref | `ref` | Entry reference code, in the form `<account name>-00001`, incrementing |
| 3 | Business Unit | `business_unit.name` / `business_unit_name` | If the entry originated from a Claim Expense, the BU name is taken from the claim's villa, comma-joined when multiple |
| 4 | Category | `account_category.name` (→ `account_category_name`) | "Unassigned" if not set |
| 5 | Description | `description` | |
| 6 | Property | `villa.name` (→ `villa_name`) | "Unassigned" if `villa_id` is empty; if from a Claim Expense, multiple villa names are joined |
| 7 | Payee | `payee_user_name` | Present only when the entry is linked to a Claim Expense (name of the claim's creator); defaults to "N/A" |
| 8 | In (in the account's currency) | `amount` when `payment_type = credit` | Formatted with 2 decimal places |
| 9 | Out (in the account's currency) | `amount` when `payment_type = debit` | |
| 10 | Balance (in the account's currency) | computed at runtime: added for credit, subtracted for debit | |
| 11 | Created Date | `created_at` | Format `d M y H:i:s` |
| 12 | Actions | — | Edit (if not an opening statement), Delete |

Only entries with `AccountStatement.account_id = <account_id>` and `is_deleted = 0` are retrieved, with additional containment of `BusinessUnit`, `Villa`, `AccountCategory`, `ClaimExpense` (including `Villa.BusinessUnit`, `CreatedByUser`).

## Functions / Actions
- **Add new:** opens page ACC-007-P1 (`addStatement`) to add a new entry for the account currently being viewed.
- **Edit (pencil icon, shown only when `is_opening_statement = 0`):** opens page ACC-007-P2 (`editStatement`).
- **Delete (trash icon):** opens confirmation modal `#deleteModal`; on confirmation, navigates to `account/delete-statement/<id base64>` — which effectively calls the `deleteStatement` action (soft delete, `is_deleted = 1`, no dedicated view), then returns to the statements page.
- No filters on the page; each account is its own page via the `account_id` parameter.

## Navigation
- Entered from: Sidebar > "Ledgers" group > entry named after each account currently open for statements (`filterSidebar($user, 'Account-statements')`, list `$open_statements`).
- Navigates to: ACC-007-P1 (New Ledger Entry), ACC-007-P2 (Edit Ledger Entry), Delete action (`deleteStatement` action, no dedicated view).
