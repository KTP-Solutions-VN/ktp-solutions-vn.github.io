# ACC-064-P1 — Popup: Create Payment Request

**Type:** Popup (opened from ACC-064)

**Route:** `AccountController::paymentRequest()` (displays the form) + `AccountController::addPaymentRequest()` (saves, POST) — default `/account/payment-request`

**Module:** Accounting & HR

## Overview
Form for creating a new payment request for a supplier: select Business Unit, supplier type (Product/Service), supplier, enter multiple detail lines (product/service, quantity, unit price, VAT), allocate cost by Company or Property, and attach the invoice.

## Detailed Description

**General information:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select (list of BUs per user permissions) | Yes | Changing the BU triggers AJAX `getBuData` to reload the Company list (by `subsidiary_id`) and Property list |
| 2 | Supplier Type | `category_type` | Tab selector: Product / Service | Yes | Determines the Supplier list and corresponding Product/Service list, loaded via `getSuppliersByType` |
| 3 | Select Supplier | `supplier` | Select (based on selected `category_type`) | Yes | Has a "+ Add supplier" button (opens ACC-057-P1/ACC-059-P1 depending on type) and a "Refresh" button to reload the list after adding a new supplier |
| 4 | VAT from Supplier Profile | — | Display (read-only) | — | Taken from the `vat_percent` of the selected Supplier |

**Payment Lines (multiple lines, at least 1 required, added via the "+ Add Payment Line" button):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Product / Service | `items[].product` or `items[].service` | Select (loaded via `getAllocations` by supplier + type), with a "Free entry..." option | Yes (unless Free entry) | Selecting "Free entry" shows an input `items[].other_product`/`items[].other_service` for a free-text name |
| 2 | Description | `items[].description` | Text | No | |
| 3 | Qty | `items[].quantity` | Number | Yes | |
| 4 | Unit Price | `items[].price_unit` | Number | Yes | |
| 5 | VAT | `items[].vat` | Select (%) | No | |
| 6 | Allocation Type | `items[].type` | Segmented control: Company / Property | Yes | Determines the fields below |
| 7 | Business Unit (allocation) | — | Select | Yes | Based on Company or Property allocation |
| 8 | Company | `items[].company_id` | Select (when `type=company`) | Yes if `type=company` | |
| 9 | Property | `items[].property_id` | Select (when `type=property`) | Yes if `type=property` | |
| 10 | Recharge Owner? | `items[].recharge_owner` | Yes/No switch | Applies only when `type=property` | Value `yes`/`no` |

**Invoice:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Upload supplier invoice | `invoice_file` | File (PDF) | No | Uploaded via `_fileUpload`, saved to the `expense-payment-request` folder |
| 2 | Invoice Number | `invoice_number` | Text | No | |
| 3 | Invoice Issue Date | `issue_date` | Date picker | No | Converted to `Y-m-d` on save |
| 4 | Invoice Due Date | `due_date` | Date picker | No | Converted to `Y-m-d` on save |

Right-hand summary panel (Payment Request Summary): shows real-time BU, Supplier, Invoice, line count, Subtotal, VAT, Total to Pay, and a breakdown by Company/Property/Owner recharge — calculated client-side, not an input field.

## Functions / Actions
- **+ Add supplier:** quickly opens the Add Supplier popup (ACC-057-P1 or ACC-059-P1 depending on `category_type`) without leaving the page.
- **Refresh:** reloads the Supplier list after adding a new one.
- **+ Add Payment Line:** adds a new detail line to the form.
- **Submit Payment Request / Preview Request:** submits POST to `addPaymentRequest`; the server saves an `ExpensePaymentRequest` record (business_unit_id, invoice_number, invoice_issue_date, invoice_due_date, supplier_id, category_type, invoice_file), then saves each line to `ExpensePaymentRequestSupplier` (product_id/extra_product_field, quantity, price_unit, type, company_id or property_id + owner_recharge); shows a success/error flash message then redirects to ACC-064 (`paymentRequestList`) or returns to the form on error.

## Navigation
- Entered from: ACC-064 (Payment Request List) — "Add New" button.
- Navigates to: returns to ACC-064 after a successful save or on error.
