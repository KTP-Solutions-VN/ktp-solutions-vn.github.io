# ACC-009 — Statement Reconcile

**Type:** Full page

**Route:** `AccountController::statementReconcile()` — default `/account/statement-reconcile`

**Module:** Accounting & HR

## Overview
Select an account (only accounts with `is_statement_open = open`), enter the opening/ending balance and reconciliation date, then select unreconciled entries to mark as reconciled (`is_reconcile = 1`) so that the Difference equals zero. If a difference remains after selecting everything, a manual adjustment entry (Manual Adjustment) may be added.

## Detailed Description

Filter (GET form `#account_form`):

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (Accounts with `is_statement_open = open`) | Changing the value auto-submits the form |
| 2 | Start Balance | `start_balance` | Text, readonly | = `amount` of the oldest unreconciled entry (first `AccountStatement` with `is_reconcile=0, is_deleted=0` ordered by `id ASC`) — shown only after an Account is selected |
| 3 | Ending Amount | `reconcile_amount` | Number input | Ending balance entered by the user for matching |
| 4 | Ending Date | `reconcile_date` | Text + datepicker (`dd-mm-yyyy`) | Once set, the system retrieves all entries with `date <= reconcile_date, is_deleted=0, is_reconcile=0` (excluding the first row, which is the start balance) |
| — | Search | button | Resubmits `#account_form` | |

List of entries pending reconciliation (DataTable `#zero_config_2`, no pagination, no sorting):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `date` | |
| 2 | Ref | `ref` | |
| 3 | In | `amount` when `payment_type = credit` | Inline editable |
| 4 | Out | `amount` when `payment_type = debit` | Inline editable |
| 5 | Created At | `created_at` | |
| 6 | Actions | checkbox `is_reconcile[]` (value = statement id, with `data-payment_type`, `amount`) + quick-edit button | |

Summary area (shown only when `data_array` is present): **Difference** (computed as `start_balance - reconcile_amount`, then added/subtracted per checked rows), a **Finish** button, and (hidden by default) an **Adjustment** button shown once everything is checked but a difference remains.

Adjustment popup (modal `#exampleModal`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `adjustment_date` | Text + datepicker, readonly, capped at `endDate` = reconcile_date | Yes (`required`) | |
| 2 | Amount | `adjustment_amount` | Text, readonly | — | Auto-filled with the current Difference |
| 3 | Description | `adjustment_description` | Textarea | No | |

## Functions / Actions
- **Search:** reloads the entry list for the selected Account/Ending Date (GET, page reload).
- **Checking the is_reconcile checkbox on a row:** JS recalculates the Difference in real time (added for credit, subtracted for debit).
- **Quick-edit amount (pencil icon on a row):** converts the In/Out cell into an input; clicking Save calls AJAX `updateStatementAmount` (action `updateStatementAmount()`, POST `statement_id`, `amount`) to update the entry's `amount` immediately.
- **Finish:** only runs when Difference = 0; calls AJAX `reconcileStatement` (action `reconcileStatement()`, POST array `statement_id`) to bulk-mark `is_reconcile = 1` for the checked rows plus the start-balance row, then reloads the page for the selected account.
- **Adjustment (shown only when everything is checked and Difference ≠ 0):** opens a popup for entering a manual adjustment; submits via POST to the `statementReconcile` action itself, the server automatically determines `payment_type` (debit if amount ≥ 0, otherwise credit), marks `is_manual_adjustment = 1`, generates a new `ref`, saves to `AccountStatement`, writes an access log, then returns to the previous page (`referer()`).

## Navigation
- Entered from: Sidebar > "Statements" group > "Reconcile" (`filterSidebar($user, 'Account-statementReconcile') == 1`).
- Navigates to: no other page — all reconciliation and adjustment actions are handled via AJAX on the same page.
