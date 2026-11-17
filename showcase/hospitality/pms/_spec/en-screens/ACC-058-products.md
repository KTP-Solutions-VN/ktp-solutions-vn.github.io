# ACC-058 — Products

**Type:** Full page

**Route:** `AccountController::products($tab)` — default `/account/products/<tab>`

**Module:** Accounting & HR

## Overview
A 3-tab page for managing the Products catalog: the Product list, Product allocation to Suppliers (Product Allocation), and the Product category list (Product Categories).

## Detailed Description

**Products** tab (default, element `account/products`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Image | `image` | |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Price | `price` | |
| 6 | Status | `status` | Active/Inactive |
| 7 | Created On/By | `created_at`, `added_by` | |
| 8 | Action | — | Edit (opens ACC-058-P1), Delete (calls `deleteProduct`) |

**Product Allocation** tab (element `account/product_allocation`): list of Product ↔ Supplier assignments (`ProductAllocation.type = product`), with a quick-add popup (select Product + Supplier) and delete; main columns: Product, Supplier, Created On/By, Action.

**Product Categories** tab (element `account/product_categories`): list of product groups (`ProductCategory.type = product`), with an add/edit-name popup and delete (a group can only be deleted if it has no Products assigned); main columns: Name, Status (active if it has an active Product), Created On/By, Action.

## Functions / Actions
- **Add new (Products tab):** navigates to ACC-058-P1 (`addProduct`).
- **Edit/Delete (Products tab, on each row):** Edit opens ACC-058-P1 in edit mode; Delete calls `deleteProduct/<id>`.
- **Add/Edit/Delete Product Allocation (Product Allocation tab):** popup submits POST to the `products` action itself (`tab=product-allocation`), saving/deleting a `ProductAllocation` record.
- **Add/Edit/Delete Product Category (Product Categories tab):** popup submits POST to the `products` action itself, saving/deleting a `ProductCategory` record; deletion is blocked if the group still has Products.
- Switching tabs updates the URL (`/account/products/<tab>`) without a full page reload.

## Navigation
- Entered from: Sidebar > "Products" item under Account Settings.
- Navigates to: ACC-058-P1 (Add/Edit Product popup).
