# CS-006 — Residence Setup

**Type:** Full page

**Route:** `CommonSettingController::residences()` — default `/common-setting/residences`

**Module:** CS = Reference Data

## Overview
A list for managing the Residence lookup data (a property/real-estate cluster) — a child level of Area, with a cover image, contact information, and a dedicated code, used as the parent lookup for the Unit lookup (CS-008).

## Detailed Description

List (DataTable `#zero_config`, sorted by Country > Region > District > Area > Residence):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Photo | `image` | Thumbnail (3:2 ratio), placeholder shown if no image is set |
| 3 | Country | `country.name` | |
| 4 | Region | `region.name` | |
| 5 | District | `district.name` | |
| 6 | Area | `area.name` | |
| 7 | Residence | `name` | |
| 8 | Created Date | `created_at` | `d M Y H:i` |
| 9 | Actions | — | Edit, Delete (opens popup CS-006-P1) |

## Functions / Actions
- **Add new:** opens popup CS-006-P1 (Add).
- **Edit:** opens popup CS-006-P1, pre-filled with all current information and image (Region/District/Area cascade via AJAX `getData`).
- **Delete:** opens popup CS-006-P1 in delete-confirmation mode; upon successful deletion, the attached physical image file (if any) is also deleted.
- Duplicate check: on Add/Edit, the system performs a server-side check on the combination (`country_id`, `region_id`, `district_id`, `area_id`, `name`) to see if it already exists (`checkResidence`); if duplicated, an error is shown and the record is not saved.

## Navigation
- Accessed from: Configuration menu > Reference Data > Residence Setup.
- Navigates to: CS-006-P1 (Residence Form popup); Residence data is used as the parent dropdown in CS-008 (Unit Setup).
