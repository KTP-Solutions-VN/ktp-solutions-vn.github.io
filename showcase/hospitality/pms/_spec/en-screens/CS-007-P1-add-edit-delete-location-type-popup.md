# CS-007-P1 — Location Tag Form

**Type:** Popup (opened from CS-007)

**Route:** Bootstrap Modal (`#exampleModal`) within `location_types.ctp`; submits to the same action `CommonSettingController::locationTypes()`; duplicate name check via AJAX `checkLocation()` — `/common-setting/check-location`.

**Module:** CS = Reference Data

## Overview
A shared popup for Adding/Editing/Deleting a villa Location Type.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Location Type Name | `name` | Text | Yes | Validated remotely via `checkLocation` — returns an error if the name is duplicated |
| 2 | Action (hidden) | `action` | Hidden | — | |
| 3 | ID (hidden) | `id` | Hidden | — | |

## Functions / Actions
- **Save/Update/Delete:** submits `popup_form`, saving/deleting the `VillaLocationType` record.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-007 (Location Tags).
- After submission: returns to CS-007 with a flash message.
