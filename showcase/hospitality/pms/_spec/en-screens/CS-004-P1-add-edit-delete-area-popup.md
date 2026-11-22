# CS-004-P1 — Area Form

**Type:** Popup (opened from CS-004)

**Route:** Bootstrap Modal (`#exampleModal`) within `areas.ctp`; submits to the same action `CommonSettingController::areas()`; duplicate name check via AJAX `checkArea()` — `/common-setting/check-area`; loads Region/District based on the selected parent via AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Reference Data

## Overview
A shared popup for Adding/Editing/Deleting an Area, with 3 cascading parent-selection dropdowns by hierarchy level (Country → Region → District) loaded via AJAX.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country` | Select | Yes | Changing this reloads the Region list via AJAX `get-data` (`type=country-region`) |
| 2 | Region | `region` | Select (dependent on Country) | Yes | Changing this reloads the District list (`type=region-district`) |
| 3 | District | `district` | Select (dependent on Region) | Yes | |
| 4 | Area Name | `name` | Text | Yes | Validated remotely via `checkArea`; the system also auto-generates a `slug` from the name upon saving |
| 5 | Action (hidden) | `action` | Hidden | — | |
| 6 | ID (hidden) | `id` | Hidden | — | |

## Functions / Actions
- **Save/Update/Delete:** submits `popup_form`.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-004 (Area Setup).
- After submission: returns to CS-004 with a flash message.
