# ACC-007-P2 — Edit Statement Entry Popup

**Type:** Popup (opened from ACC-007)

**Route:** `AccountController::editStatement($id)` — default `/account/edit-statement/<id>` (`id` passed as base64)

**Module:** Accounting & HR

## Overview
A form for editing an existing statement entry. If the entry has already been reconciled (`is_reconcile = 1`), all fields are locked (view-only, not editable).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text + datepicker (`dd-mm-yyyy`) | Yes (`required`) | Readonly if `is_reconcile = 1` |
| 2 | Ref | `ref` | Text, always readonly | — | |
| 3 | Business Unit | `business_unit_id` | Select2 | Yes (`required`) | `disabled` if `is_reconcile = 1` |
| 4 | Category | `category_id` | Select2 (`AccountCategory`) | Yes (`required`) | `disabled` if `is_reconcile = 1` |
| 5 | Description | `description` | Textarea | No | |
| 6 | Property | `villa_id` | Select2 (Villas for the BU) | No | `disabled` if `is_reconcile = 1` |
| 7 | Payment Type | `payment_type` | Select2: Credit / Debit | Yes (`required`) | `disabled` if `is_reconcile = 1` |
| 8 | Amount | `amount` | Number input | Yes (`required`) | Readonly if `is_reconcile = 1` |

Data is pre-loaded from `AccountStatement` by `id`; the Business Unit list is drawn from `account.business_unit_ids`, and Property is filtered by the entry's current BU (or the first BU if none is assigned).

## Functions / Actions
- **Update:** submits via POST to the `editStatement` action itself; the server reformats `date`, calls `_saveData('AccountStatement', ...)`, writes an access log, then redirects back to ACC-007 (`statements`) for the corresponding account.
- **Cancel:** returns to ACC-007 (`statements`) for the account.
- When the Business Unit is changed: an AJAX call to `/VM/common/getBusinessUnitVilla` reloads the Property list.
- If `id` is invalid: displays an "Invalid URL" error and returns to the previous page.

## Navigation
- Entered from: ACC-007 (Account Statements) — Edit button on each row (shown only when the entry is not `is_opening_statement`).
- Navigates to: back to ACC-007 after saving or canceling.
