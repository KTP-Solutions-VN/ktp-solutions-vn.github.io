# ACC-056-P1 — New Owner Recharge

**Type:** Popup (opened from ACC-056)

**Route:** `AccountController::addRebill()` — default `/account/add-rebill`

**Module:** Finance & Admin

## Overview
Form for adding a new Rebill record for a Property by rebill month/expense month, allowing multiple expense line items to be entered (expense type, amount, description).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + BU per user permissions) | No | Changing the value triggers AJAX `/VM/common/getBusinessUnitVilla` to reload the Property list |
| 2 | Property | `villa_id` | Select2 (Properties in the selected BU) | No | |
| 3 | Rebill Month | `rebill_month` | Text + month datepicker (`MM`), restricted to the current year | Yes (`required`) | |
| 4 | Expense Month | `expense_month` | Text + month datepicker (`MM`), restricted to the current year | Yes (`required`) | |
| 5 | Expense Name (row 1..n) | `expense_data[n][expense_type_id]` | Select2 (list of `ExpenseType`) | Yes (`required`) | Multiple rows can be added |
| 6 | Amount (row 1..n) | `expense_data[n][amount]` | Number input | Yes (`required`) | |
| 7 | Description (row 1..n) | `expense_data[n][description]` | Textarea | Yes (`required`) | |

## Functions / Actions
- **Add More (+ icon):** dynamically adds a new expense row (Expense Name/Amount/Description) to the form.
- **Remove expense row (- icon, on rows added after the first):** removes the row from the form.
- **Save:** submits POST to the `addRebill` action itself; the server looks for an existing `VillaExpense` record (`expense_type=rebill`) matching `villa_id` + `rebill_month` + the current year to update, or creates a new one if none exists, saving `data` as a JSON encoding of the full `expense_data`, then redirects to ACC-056 (`rebill`).
- **Cancel:** returns to ACC-056 (`rebill`).

## Navigation
- Entered from: ACC-056 (Owner Recharges) — "Add new" button.
- Navigates to: returns to ACC-056 after saving or canceling.
