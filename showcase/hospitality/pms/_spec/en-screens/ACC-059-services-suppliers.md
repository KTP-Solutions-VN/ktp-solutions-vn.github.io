# ACC-059 — Services Suppliers

**Type:** Full page

**Route:** `AccountController::servicesSupplier()` — default `/account/services-supplier`

**Module:** Accounting & HR

## Overview
List of suppliers in the "Services" group (`Supplier.type = services`) — similar to ACC-057 but for the Services type.

## Detailed Description

List (`#zero_config` table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Code | `code` | Auto-generated 8-digit code |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Country | `country` | |
| 6 | Created On | `created_at` (format `d M y H:i`) | |
| 7 | Created By | `added_by.usage_name` or full name | |
| 8 | Action | — | Edit (opens ACC-059-P1), Delete (confirmation popup, calls `deleteServicesSupplier`) |

## Functions / Actions
- **Add new:** navigates to ACC-059-P1 (`addServicesSupplier`) in add mode.
- **Edit (pencil icon, on each row):** navigates to ACC-059-P1 (`addServicesSupplier/suppliers/<base64 id>/list`) in edit mode.
- **Delete (trash icon, on each row):** opens a confirmation popup; clicking Save navigates to `deleteServicesSupplier/<base64 id>`.

## Navigation
- Entered from: Sidebar > "Services Supplier" item under Account Settings.
- Navigates to: ACC-059-P1 (Add/Edit Services Supplier popup), ACC-060 (Services, same Settings area).
