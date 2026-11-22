# BU-014 — Edit Reporting Zone

**Type:** Full page

**Route:** `BusinessUnitController::editZoning($id)` — default `/business-unit/edit-zoning/{id}` (id base64-encoded)

**Module:** Operating Units

## Overview
A form for editing the custom name and the list of Business Units belonging to an existing zone. The zone code (`zone_name`) is read-only and cannot be edited.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Zone | `zone_name` | Text (readonly) | — | Cannot be edited |
| 2 | Custom Name | `custom_name` | Text | Yes | |
| 3 | Business Unit | `business_units[]` | Checkbox (multiple) | Yes | Pre-populated based on the existing `business_unit_ids` |

## Functions / Actions
- **Save:** updates the `BusinessUnitZone` record, logs the activity.
- **Cancel:** returns to BU-012 without saving.

## Navigation
- Opened from: BU-012 (Reporting Zones) — Edit icon on each row.
- After saving: redirects back to BU-012.
