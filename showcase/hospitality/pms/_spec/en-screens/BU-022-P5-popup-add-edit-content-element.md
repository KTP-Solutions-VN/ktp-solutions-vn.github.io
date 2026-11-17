# BU-022-P5 — Popup: Add/Edit Content Element

**Type:** Popup (opened from BU-022, Content Element tab — Superadmin only)

**Route:** Bootstrap modal (`#ota-element-modal`) within the `channel/content_elements.ctp` element; submits via AJAX to `OtaContentController::createElement` / `editElement`.

**Module:** Business Unit

## Overview
A shared popup for adding and editing an OTA Content Element, used when composing Listing content for each platform.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Content Element Name | `name` | Text | Yes | |
| 2 | Group | `group_key` | Select | Yes | |
| 3 | Scope | `scope_key` | Select | Yes | |
| 4 | Text Length | `length_type` | Select (`No limit` / `Maximum`) | No | |
| 5 | Maximum Characters | `max_length` | Number | Yes (when Maximum is selected) | |
| 6 | Translatable | `translatable` | Select (`Yes` / `No`) | No | |
| 7 | Applies To | `platform_ids[]` | Checkbox (multiple) | Yes | List of booking platforms |
| 8 | ID (hidden) | `element_id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save:** submits an AJAX request to save the content element, reloading the table without a page refresh.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-022 (Content Element tab) — "Add New" button, Edit icon on each row.
- After submission: remains on BU-022 (`content-elements` tab).
