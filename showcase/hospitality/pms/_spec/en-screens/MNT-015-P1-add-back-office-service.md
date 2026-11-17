# MNT-015-P1 — Add Back Office Service

**Type:** Popup (opened from MNT-015)
**Route:** maintenance/addBackOfficeService
**Module:** Maintenance

## Overview
Page for adding a new back-office service: name, illustrative image (1:1 crop), status. Business unit cannot be manually selected — the system automatically applies the service to all active business units.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop, max 1MB | Yes | |
| 3 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: saves the `GardenService` (`type = back-office`, `business_unit_ids` = all active business units), logs the activity, returns to MNT-015.
- **Cancel**: returns to MNT-015.

## Navigation
- Entered from: "Add New" button on MNT-015 — Back Office Services.
- Navigates to: after Save, returns to MNT-015.
