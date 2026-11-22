# VCS-001-P1 — Amenity Form

**Type:** Popup/Modal (opened from VCS-001)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/items` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/check-item`
**Module:** VCS = Property Attributes

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Amenity scenarios. In Delete mode, the input section is hidden (`.modal-body { display:none }`), leaving only the confirmation title.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Item Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkItem` (when editing, the `id` is sent along to exclude the current record) |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 3 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action; only submits once jQuery Validate passes.
- "Cancel" button (`#cancel_button`) — closes the modal without saving.
- Validation: `name` is required, checked for duplicates via remote AJAX `checkItem`.

## Navigation
- Opened from: VCS-001 (Add new / Edit / Delete buttons on the Amenity Catalog table).
- Navigates to: no page change — after submission, VCS-001 is reloaded (redirect via `referer()`).
