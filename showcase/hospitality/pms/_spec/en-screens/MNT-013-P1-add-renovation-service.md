# MNT-013-P1 — Add Renovation Service

**Type:** Popup (opened from MNT-013)
**Route:** maintenance/addRenovationService
**Module:** Maintenance

## Overview
Page for adding a new renovation service: name, illustrative image (1:1 crop), applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop, max 1MB | Yes | |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: saves the `GardenService` (`type = renovation`), logs the activity, returns to MNT-013.
- **Cancel**: returns to MNT-013.

## Navigation
- Entered from: "Add New" button on MNT-013 — Renovation Services.
- Navigates to: after Save, returns to MNT-013.
