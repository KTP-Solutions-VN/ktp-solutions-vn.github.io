# MNT-010-P1 — Add Pool Service

**Type:** Popup (opened from MNT-010)
**Route:** maintenance/addPoolServices
**Module:** Maintenance

## Overview
Page for adding a new pool service: name, illustrative image (1:1 crop), applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop, max 1MB | Yes | |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Saved as JSON into `business_unit_ids` |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: saves the `GardenService` (`type = pool-services`), logs the activity, returns to MNT-010.
- **Cancel**: returns to MNT-010.

## Navigation
- Entered from: "Add New" button on MNT-010 — Pool Services.
- Navigates to: after Save, returns to MNT-010.
