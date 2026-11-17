# ACC-064 — Payment Request List

**Type:** Full page

**Route:** `AccountController::paymentRequestList()` — default `/account/payment-request-list`

**Module:** Accounting & HR

## Overview
List of all Payment Requests created for product/service suppliers, with Add, Edit, Print, and Delete actions for each request.

## Detailed Description

List table (no server-side pagination, uses client-side `zero_config` DataTable), sorted by `id` descending:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No | — | Sequential number |
| 2 | Invoice Number | `invoice_number` | Invoice number |
| 3 | Invoice Due Date | `invoice_due_date` | Format `j M y` |
| 4 | Supplier Name | `supplier.name` | Supplier name (`Suppliers` relation) |
| 5 | Category Type | `category_type` | `product` / `service` |
| 6 | Actions | — | Edit / Delete / Print |

No dedicated filter/search beyond the DataTable's default search.

## Functions / Actions
- **Add New:** opens ACC-064-P1 (Create Payment Request).
- **Edit (pencil icon):** opens ACC-064-P2 (`editPaymentRequest`) with the id base64-encoded.
- **Print (printer icon):** opens a new tab `printPaymentRequest/<encoded id>` to view/print the payment request voucher.
- **Delete (trash icon):** opens a delete-confirmation popup; on confirm, navigates to `deletePaymentRequest/<encoded id>` — deletes the `ExpensePaymentRequest` record and all related `ExpensePaymentRequestSupplier` detail rows, logs an access record.

## Navigation
- Entered from: Sidebar > "Expenses" group > "Payment Request" item (same group as ACC-062 Petty Cash and ACC-063 Payments).
- Navigates to: ACC-064-P1 (Add), ACC-064-P2 (Edit); the print voucher page (`printPaymentRequest`, no dedicated ACC code — part of the download/print action group).
