# ACC-007-P1 — New Ledger Entry

**Type:** Popup (opened from ACC-007)

**Route:** `AccountController::addStatement($account_id)` — default `/account/add-statement/<account_id>`

**Module:** Finance & Admin

## Overview
A form for adding a new statement entry to the currently open account's statement, automatically generating a sequential Ref number based on the account name.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date` | Text + datepicker (`dd-mm-yyyy`) | Yes (`required`) | Converted and saved as `Y-m-d` on submit |
| 2 | Ref | `ref` | Text, readonly | — | Auto-generated: `<account.name>-00001`, incremented based on the account's latest entry (extracts the trailing number from `ref`, +1, padded to 5 digits) |
| 3 | Business Unit | `business_unit_id` | Select2 (list of BUs belonging to `account.business_unit_ids`) | Yes (`required`) | Changing this triggers an AJAX call to `/VM/common/getBusinessUnitVilla` to reload the corresponding Property list |
| 4 | Category | `category_id` | Select2 (list of `AccountCategory`) | Yes (`required`) | |
| 5 | Description | `description` | Textarea | No | |
| 6 | Property | `villa_id` | Select2 (list of Villas for the selected BU, status = Open) | No | Includes a "(Select Property)" option |
| 7 | Payment Type | `payment_type` | Select2: Credit / Debit | Yes (`required`) | |
| 8 | Amount | `amount` | Number input | Yes (`required`) | |

## Functions / Actions
- **Save:** submits the form via POST to the `addStatement` action itself; the server additionally assigns `account_id`, reformats `date`, saves the record to the `AccountStatement` table, writes an access log, then redirects back to ACC-007 (`statements`) for that account.
- **Cancel:** returns to ACC-007 (`statements`) for the account.
- If `account_id` is invalid: displays an "Invalid URL" error and returns to the previous page.

## Navigation
- Entered from: ACC-007 (Account Ledger) — "Add new" button.
- Navigates to: back to ACC-007 after saving or canceling.
