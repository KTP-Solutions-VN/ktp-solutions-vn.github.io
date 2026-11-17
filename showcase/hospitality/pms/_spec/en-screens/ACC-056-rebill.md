# ACC-056 — Rebill

**Type:** Full page

**Route:** `AccountController::rebill()` — default `/account/rebill`

**Module:** Accounting & HR

## Overview
List of Rebill records (Property expenses that need to be re-invoiced/recalculated for a specific month), allowing add, edit, and delete.

## Detailed Description

List (`#zero_config` table, data source `VillaExpense` with `expense_type = rebill`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `villa.name` | |
| 2 | Rebill Month | `rebill_month` | |
| 3 | Expense Month | `expense_month` | |
| 4 | Created At | `created_at` (format `d M Y H:i`) | |
| 5 | Action | — | Edit button (link to ACC-056-P2) and Delete (opens confirmation popup) |

Delete confirmation popup (`#exampleModal` modal):
- Contains only a single confirmation text line, no input fields.

## Functions / Actions
- **Add new:** navigates to ACC-056-P1 (`addRebill`).
- **Edit (pencil icon, on each row):** navigates to ACC-056-P2 (`editRebill/<id>`).
- **Delete (trash icon, on each row):** opens a confirmation popup; clicking Save in the popup navigates to `AccountController::deleteRebill(base64(id))` — deletes the `VillaExpense` record, logs an access record, shows a flash message, then returns to the Rebill list.

## Navigation
- Entered from: Sidebar > "Rebill" item under the Account/Expenses group.
- Navigates to: ACC-056-P1 (Add Rebill popup), ACC-056-P2 (Edit Rebill popup).
