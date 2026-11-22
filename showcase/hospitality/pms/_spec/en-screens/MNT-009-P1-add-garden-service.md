# MNT-009-P1 — New Garden Service Type

**Type:** Popup (opened from MNT-009)
**Route:** maintenance/addGardenService
**Module:** Repair Desk

## Overview
Page for adding a new garden service: name, illustrative image (1:1 crop), applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop, max 1MB | Yes | If crop is used, saves base64 to `cropped_image`; otherwise a regular file upload |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Saved as JSON into `business_unit_ids` |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: saves the `GardenService` (`type = garden`), logs the activity, returns to MNT-009.
- **Cancel**: returns to MNT-009.

## Navigation
- Entered from: "Add New" button on MNT-009 — Garden Service Types.
- Navigates to: after Save, returns to MNT-009.
