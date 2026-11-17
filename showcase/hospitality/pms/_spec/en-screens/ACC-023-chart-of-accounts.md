# ACC-023 — Chart of Accounts

**Type:** Full page

**Route:** `AccountController::chartAccounts()` — default `/account/chart-accounts`

**Module:** Accounting & HR

## Overview
A list of "Chart of Account" records by Business Unit, visible only to Superadmin in the menu. Allows adding/editing the name and applicable Business Units via a popup, deleting (including all related `ChartAccountDetails` records), and navigating to view/edit the account structure details.

## Detailed Description

List (DataTable `#zero_config`, no filters):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Sr No | — | Sequential number |
| 2 | Chart of Account | `name` | |
| 3 | Created On | `created_at` | Format `d M y` |
| 4 | By | `created_user.usage_name` | |
| 5 | Availability | `business_unit` (decoded from `business_unit_id` JSON) | Names of assigned Business Units, comma-joined |
| 6 | Actions | — | Edit structure (popup), View Details (ACC-023-P1), Edit Details (ACC-023-P2), Delete |

Add/Edit popup (modal `#exampleModal`, form `#chart_account_form`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Chart Title | `chart_of_account` | Text | Yes (`required`, remote duplicate-name validation via `checkAccount`) | |
| 2 | Availability (Business Unit) | `business_unit_id` | Select2 multiple (BU list from `_getBusinessUnit()`) | Yes (custom rule `select2Required`) | BUs already assigned to another Chart of Account are disabled in the dropdown (except the BUs of the record currently being edited) |
| — | Action | `action` (hidden) | Hidden: `add`/`edit`/`delete` | — | |
| — | Id | `id` (hidden) | Hidden | — | |

## Functions / Actions
- **Add new:** opens the popup in add mode; validates for duplicate names via AJAX `checkAccount`, disables BUs already used by another Chart of Account.
- **Edit structure (pencil icon on a row):** reopens the Add/Edit popup to change the name and applicable Business Units (not the account detail rows).
- **View (eye icon):** navigates to ACC-023-P1 (`viewChartAccount`).
- **Edit detail content (file icon):** navigates to ACC-023-P2 (`editChartAccount`).
- **Delete (trash icon):** reopens the popup in delete-confirmation mode; deleting removes all related `ChartAccountDetails` records (`chart_account_id`) first, then deletes the `ChartAccount`.
- All three Add/Edit/Delete actions submit via POST to the same `chartAccounts` action; after processing, redirects back to the calling page (`referer()`).
- Hidden validation: the `checkAccount()` action — AJAX check for duplicate Chart of Account names (distinguishes add/edit via `id`).

## Navigation
- Entered from: Sidebar > (Superadmin group, under Settings) > "Chart of Accounts" (`user_type = Superadmin` and `filterSidebar($user, 'ChartAccount-chartOfAccount') == 1`).
- Navigates to: ACC-023-P1 (View Accounting Account Details), ACC-023-P2 (Edit Accounting Account Details).
