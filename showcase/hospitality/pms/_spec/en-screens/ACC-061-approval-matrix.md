# ACC-061 — Approval Matrix

**Type:** Full page

**Route:** `AccountController::approvalMatrix()` — default `/account/approval-matrix`

**Module:** Accounting & HR

## Overview
Configures the list of users with approval authority per Business Unit — each row links one User to the list of Business Units that person is allowed to approve.

## Detailed Description

List (`#zero_config` table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | User | `user.usage_name` | |
| 2 | Business Units | `business_unit` | BU names joined from `business_unit_ids` (JSON), only Active BUs included |
| 3 | Authorised By | `created_user.usage_name` | Person who created the record |
| 4 | On | `updated_at` (format `d M y, h:i:s`) | |
| 5 | Action | — | Edit (pencil icon) and Delete (trash icon), opening a shared popup |

Add/Edit popup (`#exampleModal` modal, a single form shared by add/edit/delete):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | User | `user_id` | Select2 (list of Users who are Admin, or Employee/Team Leader with role id = 1, Active) | Yes (`required`) | |
| 2 | Business Units | `business_unit_ids[]` | Multi-select checkboxes | Yes (`required`, JS validation) | |
| — | Action | `action` (hidden) | `add`/`edit`/`delete` | | |
| — | Id | `id` (hidden) | | | For Edit/Delete |

## Functions / Actions
- **Add new:** opens an empty popup, action = `add`.
- **Edit (pencil icon):** opens the popup pre-loaded with the selected User + Business Units, action = `edit`.
- **Delete (trash icon):** opens a confirmation popup, action = `delete`.
- **Save (button in the popup):** submits POST to the `approvalMatrix` action itself; the server processes `add`/`edit`/`delete` on the `ApprovalMatrix` table, shows a flash message, then `redirect($this->referer())`.

## Navigation
- Entered from: Sidebar > "Approval Matrix" item under Account Settings.
- Navigates to: no navigation to other pages — all actions are handled in the popup on the same page.
