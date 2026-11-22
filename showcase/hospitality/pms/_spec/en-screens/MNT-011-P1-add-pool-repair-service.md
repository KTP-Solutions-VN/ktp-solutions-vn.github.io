# MNT-011-P1 — New Pool Repair Type

**Type:** Popup (opened from MNT-011)
**Route:** maintenance/addPoolRepair
**Module:** Repair Desk

## Overview
Page for adding a new pool repair service: name, illustrative image (1:1 crop), applicable business unit(s), status.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Image (icon) | `image` / `cropped_image` | Image upload, 1:1 crop, max 1MB | Yes | |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | |
| 4 | Status | `status` | Select (Active/Non-active) | Yes | |

## Functions / Actions
- **Save**: saves the `GardenService` (`type = pool-repair`), logs the activity, returns to MNT-011.
- **Cancel**: returns to MNT-011.

## Navigation
- Entered from: "Add New" button on MNT-011 — Pool Repair Types.
- Navigates to: after Save, returns to MNT-011.
