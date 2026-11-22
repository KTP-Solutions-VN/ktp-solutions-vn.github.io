# VCS-004-P1 — Catalog Service Form

**Type:** Popup/Modal (opened from VCS-004)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/services` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkservice`
**Module:** VCS = Property Attributes

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Service scenarios. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkservice` |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 3 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action.
- "Cancel" button — closes the modal without saving.
- Validation: `name` is required + checked for duplicates via remote AJAX `checkservice`.

## Navigation
- Opened from: VCS-004 (Add new / Edit / Delete buttons on the Service Catalog table).
- Navigates to: no page change — after submission, VCS-004 is reloaded (redirect via `referer()`).
