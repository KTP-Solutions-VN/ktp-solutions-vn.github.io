# CS-008-P1 — Add/Edit/Delete Unit Popup

**Type:** Popup (opened from CS-008)

**Route:** Bootstrap Modal (`#exampleModal`) within `units.ctp`; submits to the same action `CommonSettingController::units()`; duplicate name check via AJAX `checkUnit()` — `/common-setting/check-unit`; loads Region/District/Area/Residence based on the parent level via AJAX `getData()` — `/common-setting/get-data`.

**Module:** CS = Common Lookup Settings

## Overview
A shared popup for Adding (supporting entry of multiple Units at once), Editing (a single Unit), and Deleting a Unit — with 5 cascading parent-selection levels (Country → Region → District → Area → Residence).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country` | Select | Yes | Cascades to load Region |
| 2 | Region | `region` | Select (dependent on Country) | Yes | Cascades to load District |
| 3 | District | `district` | Select (dependent on Region) | Yes | Cascades to load Area |
| 4 | Area | `area` | Select (dependent on District) | Yes | Cascades to load Residence |
| 5 | Residence | `residence` | Select (dependent on Area) | Yes | |
| 6 | Unit Name (Edit mode) | `name` | Text | Yes | Validated remotely via `checkUnit` against the combination of all 5 parent levels plus the name |
| 7 | Unit Name (Add mode) | `units` + "Add" button | Text + chip list | Yes (at least 1) | Each click of "Add" checks for duplicates via AJAX `checkUnit` before adding to the chip list (`units_val`, comma-separated); upon Save, multiple Unit records are created at once, one for each name in the list |
| 8 | Action (hidden) | `action` | Hidden | — | |
| 9 | ID (hidden) | `id` | Hidden | — | Present only when editing/deleting |

## Functions / Actions
- **Add (within the Add form):** adds one Unit name to the chip list after verifying it is not a duplicate.
- **Remove a chip:** removes a Unit name from the pending list.
- **Save/Update/Delete:** submits `popup_form`; in Add mode, iterates through each name in the list to create multiple `Unit` records.
- **Cancel:** closes the modal.

## Navigation
- Opened from: CS-008 (Unit list).
- After submission: returns to CS-008 with a flash message.
