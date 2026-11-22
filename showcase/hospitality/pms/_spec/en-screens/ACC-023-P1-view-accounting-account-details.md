# ACC-023-P1 — Account Structure Details

**Type:** Popup / detail view page (opened from ACC-023)

**Route:** `AccountController::viewChartAccount($id)` — default `/account/view-chart-account/<id>` (`id` passed as base64)

**Module:** Finance & Admin

## Overview
View (read-only) all detail rows (`ChartAccountDetails`) belonging to a Chart of Account: rank, nature, category, sub-category, details, allocation.

## Detailed Description

Page title displayed: `<Chart of Account name> - <list of applicable Business Unit names>`.

Detail table (not a DataTable, no pagination, no filters):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Rank | `account_rank` | Account rank |
| 2 | Nature | `nature` | Displays the descriptive name from the `$natures` list (from `_getNature()`) |
| 3 | Category | `category` | Displays the descriptive name from the `$categories` list (from `_getCategory()`) |
| 4 | Sub Category | `sub_category` | Free text |
| 5 | Details | `details` | Free text |
| 6 | Allocation | `allocation_type` | Displays "Property" or "Business Unit" depending on the value |

If no detail rows exist: displays "No entry yet."

## Functions / Actions
- A purely read-only page — no Add/Edit/Delete buttons, no form submission.
- No AJAX; only a static breadcrumb is built on page load.

## Navigation
- Entered from: ACC-023 (Account Structure) — eye icon (See Content) on each row.
- Navigates to: none (only a breadcrumb link back to the Account Structure list via the menu name).
