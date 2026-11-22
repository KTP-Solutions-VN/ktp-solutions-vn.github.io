# VCS-008-P1 — Guest Activity Form

**Type:** Popup/Modal (opened from VCS-008)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-activity` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkVillaActivity`
**Module:** VCS = Property Attributes

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Property Activity scenarios. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Activity Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkVillaActivity` (when editing, the `id` is sent along to exclude the current record) |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 3 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action; only submits once jQuery Validate passes.
- "Cancel" button (`#cancel_button`) — closes the modal without saving.
- Validation: `name` is required, checked for duplicates via remote AJAX `checkVillaActivity`.

## Navigation
- Opened from: VCS-008 (Add new / Edit / Delete buttons on the Guest Activities table).
- Navigates to: no page change — after submission, VCS-008 is reloaded (redirect via `referer()`).
