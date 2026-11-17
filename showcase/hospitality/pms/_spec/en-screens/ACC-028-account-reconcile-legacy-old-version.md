# ACC-028 — Account Reconcile (legacy/old version)

**Type:** Full page (suspected no longer in use — see Navigation section)

**Route:** `AccountController::reconcile()` — default `/account/reconcile`

**Module:** Accounting & HR

## Overview
A very short action: it simply retrieves the full list of `Account` records (no filtering by `is_statement_open`) and renders the `reconcile.ctp` page with a static form (select Account, enter Start Balance/Reconcile Amount/Reconcile Date) and a Save button — but this form does not submit anywhere (no `Form->create`, no action, and no POST handling in the controller). This appears to be an incomplete/legacy build of the reconciliation feature, superseded by ACC-009 (`statementReconcile`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (all `Account` records, no status filter) | Marked with the `required` CSS class in the UI but has no JS validation | |
| 2 | Start Balance | `start_balance` | Number input | No | No default value, not read from the database |
| 3 | Reconcile Amount | `reconcile_amount` | Number input | No | |
| 4 | Reconcile Date | `reconcile_date` | Number input (actually a date field but typed as number, no datepicker attached) | No | |

No entry list table, no DataTable, no POST handling in the controller (`reconcile()` only sets `accounts` and renders the view).

## Functions / Actions
- **Save:** a button that is NOT inside any `Form->create` block, and the controller does not handle POST requests — clicking Save has no actual data-saving effect (the view has no wrapping form, only standalone inputs).
- **Cancel:** a static link pointing to `User::list` (unrelated to accounts/statements).
- No AJAX calls are attached anywhere in the `reconcile.ctp` file other than a breadcrumb update.

## Navigation
- Entered from: NO link pointing to the `reconcile` action was found anywhere in the templates (searched `account-sidebar.ctp` and other views). This action shares the same `active_menu = 'acc-statementReconcile'` as ACC-009 (`statementReconcile`), but the "Reconcile" sidebar menu item points directly to `statementReconcile`, not to `reconcile`. Conclusion: this screen appears to be no longer linked in the current menu, and is likely an old/legacy version superseded by ACC-009.
- Navigates to: none (the Save/Cancel buttons do not function as a genuine reconciliation workflow).
