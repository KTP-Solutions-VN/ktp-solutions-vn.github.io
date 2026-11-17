# MNT-014-P1 — Add Cleaning Service

**Type:** Full page (opened from MNT-014)
**Route:** maintenance/addCleaningService
**Module:** Maintenance

## Overview
Page for adding a new cleaning service: name, illustrative image, applicable business unit(s), status, and a list of "cleaning standards" (each standard consisting of a name/legend + illustrative icon, dynamically added).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service Name | `name` | Text | Yes | |
| 2 | Service Image | `image`/`cropped_image` | Image upload, crop | Yes | |
| 3 | Business Unit | `business_unit[]` | Select2 multi | Yes | |
| 4 | Status | `status` | Select (active/inactive) | Yes | |
| 5 | Standard — Name (legend) | `standards_json[].legend` | Text (max 60 characters) | Yes (per row) | |
| 6 | Standard — Icon | `standards_json[].imgKey` → base64 image | Image upload (JPG/PNG, max 1MB) | No | |

## Functions / Actions
- **Add Standard** ("+ Standard"): opens an input block for legend + icon; "Save Standard" button adds it to the displayed list (client-side); "Cancel" discards the row being entered.
- **Update Service** (main submit): saves the `GardenService` (`type = cleaning`) and all `CleaningServiceStandard` records per `standards_json`, logs the activity, returns to MNT-014.
- **Cancel**: returns to MNT-014.

## Navigation
- Entered from: "Add New" button on MNT-014 — Cleaning Services.
- Navigates to: after saving, returns to MNT-014.
