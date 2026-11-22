# ACC-057 — Goods Vendors

**Type:** Full page

**Route:** `AccountController::suppliers()` — default `/account/suppliers`

**Module:** Finance & Admin

## Overview
List of suppliers in the "Product" group (`Supplier.type = product`), used for selection when creating a Product Allocation or a Payment Request of type Product.

## Detailed Description

List (`#zero_config` table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | Sequential number |
| 2 | Code | `code` | Supplier code (auto-generated, 8 digits) |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Country | `country` | Looked up by name from the country list |
| 6 | Created On | `created_at` (format `d M y`) | |
| 7 | Created By | `added_by.usage_name` or full name | |
| 8 | Action | — | Edit (opens ACC-057-P1) and Delete (confirmation popup, calls `deleteProductSupplier`) |

## Functions / Actions
- **Add new:** navigates to ACC-057-P1 (`addSupplier`) in add mode.
- **Edit (pencil icon, on each row):** navigates to ACC-057-P1 (`addSupplier/suppliers/<base64 id>/list`) in edit mode.
- **Delete (trash icon, on each row):** opens a confirmation popup; clicking Save navigates to `deleteProductSupplier/<base64 id>` to delete the supplier.

## Navigation
- Entered from: Sidebar > "Goods Vendors" item (Goods group) under Finance Preferences.
- Navigates to: ACC-057-P1 (Goods Vendor Form popup), ACC-058 (Goods Catalog, same Finance Preferences area).
