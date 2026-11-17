# CS-001 — Countries

**Type:** Full page

**Route:** `CommonSettingController::countries()` — default `/common-setting/countries` (no dedicated friendly route; the route `/countries/list` in `config/Routes.php` line 140 is currently commented out)

**Module:** CS = Common Lookup Settings

## Overview
A list for managing the Country lookup data shared across the entire system (Region, District, Area, Residence, etc. all reference Country). Allows adding/editing/deleting countries via a shared popup.

## Detailed Description

List (DataTable `#zero_config`, no dedicated filter, sorted by `name` descending):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Ascending sequence number |
| 2 | Country Name | `name` | |
| 3 | Created Date | `created_at` | Format `d M y` |
| 4 | Actions | — | Edit and Delete buttons (open popup CS-001-P1) |

## Functions / Actions
- **Add new:** opens popup CS-001-P1 in Add mode.
- **Edit (pencil icon):** opens popup CS-001-P1 in Edit mode, pre-filled with `name`, `id`.
- **Delete (trash icon):** reopens the same popup CS-001-P1 but hides the input fields, showing only the delete confirmation; deleting cascades to remove all `Region`, `District`, `Area` records with the corresponding `country_id`.
- Activity logging (`_generateAccessLogs`) is recorded for all three actions: add/edit/delete.

## Navigation
- Accessed from: System Settings menu > Common Lookup Settings > Countries.
- Navigates to: CS-001-P1 (Add/Edit/Delete Country popup).
