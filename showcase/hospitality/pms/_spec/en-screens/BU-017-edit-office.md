# BU-017 — Edit Office Location

**Type:** Full page

**Route:** `BusinessUnitController::editOffice($id)` — default `/business-unit/edit-office/{id}` (id base64-encoded)

**Module:** Operating Units

## Overview
A form for editing the information of an existing office — the same set of fields as BU-016 (New Office Location), pre-populated with existing data.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Office Name | `name` | Text | Yes | |
| 2 | Business Unit | `business_unit_id` | Select (select2) | Yes | |
| 3 | Department | `department_id[]` | Checkbox (multiple) | Yes | Pre-populated based on the existing `department_id` |
| 4 | Address | `address` | Text | Yes | |
| 5 | Latitude | `latitude` | Text | Yes | |
| 6 | Longitude | `longitude` | Text | Yes | |
| 7 | Google Maps URL | `map_url` | Text | Yes | |
| 8 | Image | `image` / `cropped_image` | Image file (3:2 crop ratio, ≤1MB) | No | Keeps the existing image if no new one is selected |

## Functions / Actions
- **Save:** updates the `Office` record, logs the activity.
- **Cancel:** returns to BU-015 without saving.

## Navigation
- Opened from: BU-015 (Office Locations) — Edit icon on each row.
- After saving: redirects back to BU-015.
