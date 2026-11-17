# ACC-023-P2 — Edit Accounting Account Details

**Type:** Popup / edit page (opened from ACC-023)

**Route:** `AccountController::editChartAccount($id)` — default `/account/edit-chart-account/<id>` (`id` passed as base64)

**Module:** Accounting & HR

## Overview
Edit the full list of detail rows (`ChartAccountDetails`) for a Chart of Account: dynamically add new rows, delete rows, edit the rank/nature/category/sub_category/details/allocation fields, then save all changes in bulk.

## Detailed Description

Page title displayed: `<Chart of Account name> - <list of applicable Business Unit names>`.

Dynamic form-style detail table (each row is one `ChartAccountDetails` record, fields as array `data[<index>][...]`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Rank | `data[i][rank]` (→ `account_rank`) | Number input, min=1 | Yes (`required`) | |
| 2 | Nature | `data[i][nature]` (→ `nature`) | Select2 (list `$natures` from `_getNature()`) | Yes (`required`) | |
| 3 | Category | `data[i][category]` (→ `category`) | Select2 (list `$categories` from `_getCategory()`) | Yes (`required`) | |
| 4 | Sub Category | `data[i][sub_category]` (→ `sub_category`) | Text | Yes (`required`) | |
| 5 | Details | `data[i][detail]` (→ `details`) | Textarea | No | |
| 6 | Allocation | `data[i][allocation]` (→ `allocation_type`) | Select2: "----Select----" / Property / Business Unit | No | Saved empty if "----Select----" is chosen |
| — | Chart Account Detail Id | `data[i][chart_account_detail_id]` (hidden) | Hidden | — | Empty for newly added rows |
| — | Id (Chart Account) | `id` (hidden) | Hidden | — | |
| — | Row Count | `row_count` (hidden) | Hidden, row counter | — | Updated dynamically when rows are added/removed |

## Functions / Actions
- **Add new (add row):** JS inserts a new row into the table (no server call), auto-incrementing `row_count`.
- **Delete row (trash icon on each row):** JS removes the row from the table client-side, decrementing `row_count`; deleted rows are not sent on Save.
- **Save:** submits the entire `data[]` array via POST to the `editChartAccount` action itself. Server: removes old `ChartAccountDetails` records no longer present in the submitted `data[]` (via the `deleteSeletedRow` function), then calls `_saveData('ChartAccountDetails', ...)` for each remaining row (update if `chart_account_detail_id` is present, insert otherwise); records success/failure and redirects back to the calling page (`referer()`).

## Navigation
- Entered from: ACC-023 (Chart of Accounts) — file icon (Edit Content) on each row.
- Navigates to: no other page — after saving, returns to the previous page (`referer()`), typically ACC-023.
