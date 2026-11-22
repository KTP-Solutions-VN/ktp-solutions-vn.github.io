# ACC-057-P1 — Goods Vendor Form

**Type:** Popup (opened from ACC-057)

**Route:** `AccountController::addSupplier($tab, $id, $show_page, $payment_detail_id)` — default `/account/add-supplier/<tab>/<id>/<show_page>/<payment_detail_id>`

**Module:** Finance & Admin

## Overview
A multi-tab form shared by both adding and editing a "Product" type supplier: supplier information, the list of allocated products (Product Allocation), and bank account details — all 3 tabs are shown only when an `id` is present (editing); when adding a new supplier only the "Suppliers" tab is shown.

## Detailed Description

**Suppliers** tab (main information, element `account/suppliers`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Supplier Code | `supplier_code` | Text, read-only | — | Auto-generated 8-digit number, incrementing from the `MAX(code)` of product-type suppliers |
| 2 | Supplier Name | `supplier_name` | Text | Yes (`required`, min 2 characters) | |
| 3 | Supplier Category | `supplier_category` | Select2 (`ProductCategory` of type product) | Yes (`required`) | |
| 4 | Contact Person | `contact_person` | Text | Yes (`required`, min 2 characters) | |
| 5 | Address | `address` | Text | Yes (`required`, min 2 characters) | |
| 6 | Country | `country` | Select2 | Yes (`required`) | |
| 7 | Latitude / Longitude | `latitude` / `longitude` | Number input | No | |
| 8 | Google Map Link | `google_map_link` | URL input | No | |
| 9 | Phone Number | `phone_number` | Text | Yes (`required`) | |
| 10 | Email | `email` | Text | Yes (`required`) | |
| 11 | Messenger / Messenger ID | `messenger` / `messenger_id` | Text | No | |
| 12 | Currency | `currency` | Select2 | Not explicitly marked required | |
| 13 | GST (%) | `vat` | Number input (0–100, step 0.01) | No | |
| 14 | Status | `status` | Select: Active/Inactive | Yes (`required`) | |
| 15 | Business Units | `business_units[]` | Multi-select checkboxes | Yes (`required`, JS validation) | |

**Products** tab (element `account/supplier_products`): list of the supplier's Product Allocations — select Products to assign/unassign.

**Bank Account Detail** tab (element `account/bank_account_detail`, shown only when `id` is present):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Method | `payment_method_id` | Select | Yes (`required`) | Defaults to "Bank Transfer" |
| 2 | Bank Name | `bank_name` | Text | Yes (`required`) | |
| 3 | Bank Swift | `bank_swift` | Text | Yes (`required`) | |
| 4 | Currency | `currency_id` | Select | Yes (`required`) | |
| 5 | Account Name | `account_name` | Text | Yes (`required`) | |
| 6 | Account Number | `account_number` | Text | Yes (`required`) | |
| 7 | Document | `document` | File (image/PDF, max 5 MB) | No | Shows an image preview or a "View PDF" button; has a Remove button |
| 8 | Preference (Preferred/Other) | `payment_type[]` | Radio-style checkbox (single selection only) | No | Marks the account preferred for payment |

## Functions / Actions
- **Save (Suppliers tab):** submits POST to the `addSupplier` action itself; the server saves/creates the `Supplier` (`type=product`), logs an access record, and redirects to this same popup with the newly saved `id` (switching to edit mode, `list` tab).
- **Save (Bank Account Detail tab):** submits POST, saves the `SupplierBankAccount` (if marked Preferred, clears Preferred on the supplier's other accounts), redirects back to the current tab.
- **Cancel:** returns to ACC-057.

## Navigation
- Entered from: ACC-057 (Goods Vendors) — "Add new" button or the Edit button on each row.
- Navigates to: returns to itself (`list` tab) after a successful save, or back to ACC-057 on Cancel.
