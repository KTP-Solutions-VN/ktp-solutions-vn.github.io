# VCS-011-P1 — Add/Edit/Delete Reminder Popup

**Type:** Popup/Modal (opened from VCS-011)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/reminders` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkReminder`
**Module:** VCS = Villa Common Settings

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Reminder scenarios. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Reminder Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkReminder` (when editing, the `id` is sent along to exclude the current record) |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 3 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action; only submits once jQuery Validate passes.
- "Cancel" button (`#cancel_button`) — closes the modal without saving.
- Validation: `name` is required, checked for duplicates via remote AJAX `checkReminder`.
- Note: this modal has no field for adjusting display order — reordering is performed directly on the VCS-011 table via the Up/Down arrow icons (AJAX `changeReminderOrder`), not through the popup.

## Navigation
- Opened from: VCS-011 (Add new / Edit / Delete buttons on the Reminders list table).
- Navigates to: no page change — after submission, VCS-011 is reloaded (redirect via `referer()`).
