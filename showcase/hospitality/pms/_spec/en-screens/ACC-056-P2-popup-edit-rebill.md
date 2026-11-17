# ACC-056-P2 — Popup: Edit Rebill

**Type:** Popup (opened from ACC-056)

**Route:** `AccountController::editRebill($id)` — default `/account/edit-rebill/<id>`

**Module:** Accounting & HR

## Overview
Form for editing an existing Rebill record — the same field structure as ACC-056-P1, pre-loaded from the `VillaExpense` record (the `data` column JSON is decoded into expense line items).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + BU per user permissions) | No | |
| 2 | Property | `villa_id` | Select2 (Properties in the BU) | No | Pre-loaded with the record's value |
| 3 | Rebill Month | `rebill_month` | Text + month datepicker | Yes (`required`) | Pre-loaded with value |
| 4 | Expense Month | `expense_month` | Text + month datepicker | Yes (`required`) | Pre-loaded with value |
| 5 | Expense Name (row 1..n) | `expense_data[n][expense_type_id]` | Select2 (`ExpenseType`) | Yes (`required`) | Pre-loaded from each saved row |
| 6 | Amount (row 1..n) | `expense_data[n][amount]` | Number input | Yes (`required`) | |
| 7 | Description (row 1..n) | `expense_data[n][description]` | Textarea | Yes (`required`) | |

## Functions / Actions
- **Add More / Remove expense row:** same behavior as ACC-056-P1.
- **Save:** submits POST to the `editRebill` action itself; the server updates the `VillaExpense` record by `id`, saving `data` as a JSON encoding of `expense_data`, then redirects to ACC-056 (`rebill`).
- **Cancel:** returns to ACC-056 (`rebill`).
- If `id` is invalid: shows an "Invalid URL" error and returns to ACC-056.

## Navigation
- Entered from: ACC-056 (Rebill) — Edit button on each row.
- Navigates to: returns to ACC-056 after saving or canceling.
