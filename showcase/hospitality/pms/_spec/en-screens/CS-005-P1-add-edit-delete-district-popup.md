# CS-005-P1 — Add/Edit/Delete District Popup

**Type:** Popup (opened from CS-005)

**Route:** Bootstrap Modal (`#exampleModal`) within `districts.ctp`; submits to the same action `CommonSettingController::districts()`; duplicate name check via AJAX `checkDistrict()` — `/common-setting/check-district`; loads Region based on Country via AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Common Lookup Settings

## Overview
A shared popup for Adding/Editing/Deleting a District.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country` | Select | Yes | Changing this reloads the Region list via AJAX (`type=country-region`) |
| 2 | Region | `region` | Select (dependent on Country) | Yes | |
| 3 | District Name | `name` | Text | Yes | Validated remotely via `checkDistrict` |
| 4 | Action (hidden) | `action` | Hidden | — | |
| 5 | ID (hidden) | `id` | Hidden | — | |

## Functions / Actions
- **Save/Update/Delete:** submits `popup_form`.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-005 (District list).
- After submission: returns to CS-005 with a flash message.
