# ACC-008 — Entry Categories

**Type:** Full page

**Route:** `AccountController::accountingCategories()` — default `/account/accounting-categories`

**Module:** Finance & Admin

## Overview
Manages the "Accounting Category" list used to classify statement entries (`AccountStatement.category_id`). Visible only to Superadmin in the menu. Add/Edit/Delete are handled through a shared popup on the same page.

## Detailed Description

List (DataTable `#zero_config`, no filters):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Name | `name` | Accounting category name |
| 2 | Actions | — | Edit, Delete buttons (open popup) |

Add/Edit/Delete popup (modal `#exampleModal`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Accounting Category | `name` | Text | Yes (`required`, remote duplicate-name validation) | Hidden in delete mode |
| — | Action | `action` (hidden) | Hidden: `add` / `edit` / `delete` | — | |
| — | Id | `id` (hidden) | Hidden | — | Empty when adding new |

## Functions / Actions
- **Add new:** opens the popup in add mode, validates the name via AJAX `checkAccountingCategory` (checks for duplicate names when no `id` is present).
- **Edit (pencil icon):** loads `name` and `id` into the popup, validates for duplicate names via AJAX `checkAccountingCategory` (excluding the record being edited via `id`).
- **Delete (trash icon):** the popup switches to delete-confirmation mode (input hidden, confirmation prompt shown); submitting calls `_deleteData('AccountCategory', 'id', ...)`.
- All three actions submit via POST to the same `accountingCategories` action, distinguished by the `action` field; after processing, redirects back to the calling page (`referer()`). All actions write access logs (`_generateAccessLogs`).
- Hidden validation: the `checkAccountingCategory()` action — AJAX check for whether the category name already exists (via `_checkFields` when adding, `_checkExistingFields` when editing).

## Navigation
- Entered from: Sidebar > "Ledgers" group > "Entry Categories" (shown only when `user_type = Superadmin` and `filterSidebar($user, 'Account-accountCategory') == 1`).
- Navigates to: no other page — all Add/Edit/Delete actions are handled on the same page via popup.
