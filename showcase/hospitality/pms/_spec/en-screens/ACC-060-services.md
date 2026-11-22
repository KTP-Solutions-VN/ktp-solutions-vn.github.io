# ACC-060 — Billable Services

**Type:** Full page

**Route:** `AccountController::services($tab)` — default `/account/services/<tab>`

**Module:** Finance & Admin

## Overview
A 3-tab page for managing the Services catalog: the Service list, Service allocation to Suppliers (Services Allocation), and the Service category list (Services Categories). The structure and behavior are similar to ACC-058 (Goods Catalog) but for `Product.type = services`.

## Detailed Description

**Services** tab (default, element `account/services`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | |
| 2 | Image | `image` | |
| 3 | Name | `name` | |
| 4 | Category | `product_category.name` | |
| 5 | Price | `price` | |
| 6 | Status | `status` | Active/Inactive |
| 7 | Created On/By | `created_at`, `added_by` | |
| 8 | Action | — | Edit/Delete (note: the "Add new" button in the Sidebar menu currently points to the `addServices` action, which has been commented out/disabled in the controller — see Navigation section) |

**Services Allocation** tab (element `account/services_allocation`): list of Service ↔ Supplier assignments (`ProductAllocation.type = services`), with a quick-add popup and delete.

**Services Categories** tab (element `account/services_categories`): list of service groups (`ProductCategory.type = services`), with an add/edit-name popup and delete (a group can only be deleted if it has no Services assigned).

## Functions / Actions
- **Add/Edit/Delete Services Allocation (Services Allocation tab):** popup submits POST to the `services` action itself (`tab=services-allocation`), saving/deleting a `ProductAllocation` record.
- **Add/Edit/Delete Services Category (Services Categories tab):** popup submits POST to the `services` action itself, saving/deleting a `ProductCategory` record; deletion is blocked if the group still has Services.
- Switching tabs updates the URL (`/account/services/<tab>`) without a full page reload.

## Navigation
- Entered from: Sidebar > "Billable Services" item under Finance Preferences.
- Navigates to: there is NO currently functioning dedicated Add/Edit Service popup — the `addServices()` action in `AccountController` has been entirely commented out (dead code) and the `add_services.ctp` view is no longer rendered by any action; adding/editing a Service on this tab currently has no corresponding UI functionality.
