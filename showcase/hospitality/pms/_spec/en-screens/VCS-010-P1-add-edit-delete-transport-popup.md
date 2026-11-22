# VCS-010-P1 — Transport Option Form

**Type:** Popup/Modal (opened from VCS-010)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-transport` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkVillaTransport`
**Module:** VCS = Property Attributes

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Transport scenarios. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Transport Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkVillaTransport` (when editing, the `id` is sent along to exclude the current record) |
| 2 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 3 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action; only submits once jQuery Validate passes.
- "Cancel" button (`#cancel_button`) — closes the modal without saving.
- Validation: `name` is required, checked for duplicates via remote AJAX `checkVillaTransport`.

## Navigation
- Opened from: VCS-010 (Add new / Edit / Delete buttons on the Transport Options table).
- Navigates to: no page change — after submission, VCS-010 is reloaded (redirect via `referer()`).
