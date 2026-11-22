# ACC-055 — Cost Categories

**Type:** Full page

**Route:** `AccountController::expenseType()` — default `/account/expense-type`

**Module:** Finance & Admin

## Overview
Manages the "Cost Categories" catalog used in Rebill/Recurring statements — a list with an add/edit/delete popup on the same page.

## Detailed Description

List (`#zero_config` table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No | — | Sequential number |
| 2 | Name | `name` | Expense type name |
| 3 | Created | `created_at` (format `d M Y H:i`) | |
| 4 | Action | — | Edit button (pencil icon) and Delete button (trash icon), opening a shared popup |

Add/Edit/Delete popup (`#exampleModal` modal, a single form shared by all three actions):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Name | `name` | Text | Yes (`required`, duplicate check via AJAX `checkExpenseType`) | Hidden in Delete mode (shows confirmation text only) |
| — | Action | `action` (hidden) | `add` / `edit` / `delete` | | Determines the action on submit |
| — | Id | `id` (hidden) | | | Present only for Edit/Delete |

## Functions / Actions
- **Add new:** opens an empty popup, action = `add`.
- **Edit (pencil icon):** opens the popup pre-filled with the name, action = `edit`, duplicate name check excluding the record being edited.
- **Delete (trash icon):** opens the popup in delete-confirmation mode, action = `delete`.
- **Save/Update/Delete (Save button in the popup, label changes per action):** submits POST to the `expenseType` action itself; the server processes based on `action` (`add`: `_saveData` to create; `edit`: updates by `id`; `delete`: `_deleteData`), logs an access record, shows a flash message, then `redirect($this->referer())`.
- **Cancel:** closes the popup without saving.

## Navigation
- Entered from: Sidebar > "Cost Categories" item under the Finance & Admin / Spending group.
- Navigates to: no navigation to other pages — all actions are handled in the popup on the same page (submitting reloads the list).
