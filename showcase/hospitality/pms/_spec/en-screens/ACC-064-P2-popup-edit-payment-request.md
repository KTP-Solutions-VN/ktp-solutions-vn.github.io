# ACC-064-P2 — Edit Payment Request

**Type:** Popup (opened from ACC-064)

**Route:** `AccountController::editPaymentRequest($id)` (displays the form) + `AccountController::updatePaymentRequest()` (saves, POST) — default `/account/edit-payment-request/<base64 id>`

**Module:** Finance & Admin

## Overview
A wizard-style form for editing an existing payment request (general information, Product/Service detail lines, invoice), pre-loading all existing data from `ExpensePaymentRequest` and `ExpensePaymentRequestSupplier`.

## Detailed Description

Same field set as ACC-064-P1 (Business Unit, Category Type, Supplier, the list of Payment Lines with Product/Service — Free entry, Quantity, Price Unit, Company/Property allocation, Recharge Owner, and the Invoice block: Invoice Number/Issue Date/Due Date/Invoice File), with these differences:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Request Id | `payment_id` | Hidden | Yes | Encoded id used to identify the record to update when calling `updatePaymentRequest` |
| 2 | Existing Invoice File | `is_owner_remove_doc` | Hidden + delete link | No | Allows removing a previously uploaded invoice file (shows the current file if present) |

All Payment Lines are pre-loaded from `payment->expense_payment_request_supplier`: if `product_id = 0`, it is displayed in "Free entry" mode with the `extra_product_field` value; if `type=company`, `company_id` is shown; if `type=property`, `property_id` + `recharge_owner` are shown.

## Functions / Actions
- **Step-by-step wizard (steps):** moves through the General Info → Payment Lines → Invoice → Summary blocks before saving.
- **+ Add Payment Line / remove line:** add/remove detail lines as in ACC-064-P1.
- **Remove current invoice file:** flags `is_owner_remove_doc`, removes the file link on save.
- **Save/Update:** submits POST to `updatePaymentRequest`; if `payment_id` is missing, shows an "Invalid Request" error and returns to ACC-064-P1; otherwise updates the `ExpensePaymentRequest` record and re-syncs all `ExpensePaymentRequestSupplier` lines (add/edit/delete based on the submitted data), shows a flash message with the result, redirects to ACC-064.
- If no data is found (invalid `id`): shows a "Data not found" flash error and redirects to ACC-064.

## Navigation
- Entered from: ACC-064 (Payment Approvals) — "Edit" icon on each row.
- Navigates to: returns to ACC-064 after saving or when the data is invalid.
