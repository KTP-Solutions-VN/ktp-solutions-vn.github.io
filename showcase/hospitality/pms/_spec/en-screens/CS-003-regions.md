# CS-003 — Region Setup

**Type:** Full page

**Route:** `CommonSettingController::regions()` — default `/common-setting/regions`

**Module:** CS = Reference Data

## Overview
A list for managing the Region lookup data belonging to a Country, along with the number of active/inactive villas in that region.

## Detailed Description

List (DataTable `#zero_config`, sorted by `Country.name`, `Region.name`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Country | `country.name` | |
| 3 | Region | `name` | Accompanied by two numbers in parentheses: count of Active / Inactive villas in the region (tooltip) |
| 4 | Created Date | `created_at` | Format `d M Y H:i` |
| 5 | Actions | — | Edit, Delete (opens popup CS-003-P1) |

## Functions / Actions
- **Add new:** opens popup CS-003-P1 (Add).
- **Edit:** opens popup CS-003-P1, pre-filled with `country`, `name`.
- **Delete:** opens popup CS-003-P1 in delete-confirmation mode; deletion cascades to all `District` and `Area` records with the corresponding `region_id`.

## Navigation
- Accessed from: Configuration menu > Reference Data > Region Setup.
- Navigates to: CS-003-P1 (Region Form popup).
