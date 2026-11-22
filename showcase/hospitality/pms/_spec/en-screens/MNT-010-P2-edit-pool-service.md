# MNT-010-P2 — Edit Pool Service Type

**Type:** Popup (opened from MNT-010)
**Route:** maintenance/editPoolService/:id
**Module:** Repair Desk

## Overview
Page for editing an existing pool service: name, illustrative image, applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop | No | Keeps the existing image if unchanged |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Pre-checked per `selected_business_unit` |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: updates the `GardenService`, logs the activity, returns to MNT-010.
- **Cancel**: returns to MNT-010.

## Navigation
- Entered from: Edit icon on MNT-010 — Pool Service Types.
- Navigates to: after Save, returns to MNT-010.
