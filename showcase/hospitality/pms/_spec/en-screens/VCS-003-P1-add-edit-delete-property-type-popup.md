# VCS-003-P1 — Add/Edit/Delete Property Type Popup

**Type:** Popup/Modal (opened from VCS-003)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/villa-types` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkvillatype`
**Module:** VCS = Villa Common Settings

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Property Type scenarios, comprising the Property Type Name and its parent Property Category. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Type Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkvillatype` |
| 2 | Property Category | `villa_categories_id` | Select (dropdown of `VillaCategory`) | Yes (`required` class; the constraint is only enforced via CSS — no JS rule observed) | List sourced from `VillaCategory`, ordered with priority given to Flat/House/Resort, then alphabetically |
| 3 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 4 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action.
- "Cancel" button — closes the modal without saving.
- Validation: `name` is required + checked for duplicates via remote AJAX `checkvillatype`.

## Navigation
- Opened from: VCS-003 (Add new / Edit / Delete buttons on the Property Types list table).
- Navigates to: no page change — after submission, VCS-003 is reloaded (redirect via `referer()`); on successful creation, the system implicitly generates related Photo Standard Areas data (no dedicated screen for this).
