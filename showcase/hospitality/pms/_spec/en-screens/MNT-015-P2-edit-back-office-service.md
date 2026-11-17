# MNT-015-P2 — Edit Back Office Service

**Type:** Popup (opened from MNT-015)
**Route:** maintenance/editBackOfficeServices/:id
**Module:** Maintenance

## Overview
Page for editing an existing back-office service: name, illustrative image, applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop | No | Keeps the existing image if not changed |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Pre-checked per `selected_business_unit` |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: updates the `GardenService`, logs the activity, returns to MNT-015.
- **Cancel**: returns to MNT-015.

## Navigation
- Entered from: Edit icon on MNT-015 — Back Office Services.
- Navigates to: after Save, returns to MNT-015.
