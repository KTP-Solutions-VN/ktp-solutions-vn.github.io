# CS-003-P1 — Add/Edit/Delete Region Popup

**Type:** Popup (opened from CS-003)

**Route:** Bootstrap Modal (`#exampleModal`) within `regions.ctp`; submits to the same action `CommonSettingController::regions()`; duplicate name check via AJAX `checkRegion()` — `/common-setting/check-region`.

**Module:** CS = Common Lookup Settings

## Overview
A shared popup for Adding/Editing/Deleting a Region belonging to a Country.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country` | Select (Country list) | Yes | |
| 2 | Region Name | `name` | Text | Yes | Validated remotely via `checkRegion` — checks for duplicates system-wide, not limited by country |
| 3 | Action (hidden) | `action` | Hidden (`add`/`edit`/`delete`) | — | |
| 4 | ID (hidden) | `id` | Hidden | — | Present only when editing/deleting |

## Functions / Actions
- **Save/Update/Delete:** submits `popup_form`.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-003 (Region list).
- After submission: returns to CS-003 with a flash message.
