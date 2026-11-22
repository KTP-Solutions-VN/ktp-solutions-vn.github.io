# VCS-002-P1 — Rate Tier Form

**Type:** Popup/Modal (opened from VCS-002)
**Route:** No dedicated route — uses a shared form that POSTs to `villa-common-setting/price-categories` (hidden `action`=`add`/`edit`/`delete`); duplicate-name check via AJAX `villa-common-setting/checkpricecategory`
**Module:** VCS = Property Attributes

## Overview
A shared Bootstrap modal (`#exampleModal`) covering the three Add/Edit/Delete Price Category scenarios, comprising two input fields: Name and Description. In Delete mode, the input section is hidden.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Price Category Name | `name` | Text | Yes | Required validation + remote duplicate-name check via `checkpricecategory` |
| 2 | Price Category Description | `description` | Text | Yes | Required validation |
| 3 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | Yes | Controls submit behavior |
| 4 | Id (hidden) | `id` | Hidden | Conditional | Required when editing/deleting |

## Functions / Actions
- "Save"/"Update"/"Delete" button (`#submit_button`) — label changes based on the action.
- "Cancel" button — closes the modal without saving.
- Validation: `name` and `description` are required; `name` is checked for duplicates via remote AJAX `checkpricecategory`.

## Navigation
- Opened from: VCS-002 (Add new / Edit / Delete buttons on the Rate Tiers table).
- Navigates to: no page change — after submission, VCS-002 is reloaded (redirect via `referer()`).
