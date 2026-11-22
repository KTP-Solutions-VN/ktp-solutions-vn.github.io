# CS-005 — District Setup

**Type:** Full page

**Route:** `CommonSettingController::districts()` — default `/common-setting/districts`

**Module:** CS = Reference Data

## Overview
A list for managing the District lookup data belonging to a Region and Country. Each District is synchronized with a `CmsDestination` record (a destination page on the website).

## Detailed Description

List (DataTable `#zero_config`, sorted by Country > Region > District):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Country | `country.name` | |
| 3 | Region | `region.name` | |
| 4 | District | `name` | |
| 5 | Created Date | `created_at` | `d M Y H:i` |
| 6 | Actions | — | Edit, Delete (opens popup CS-005-P1) |

## Functions / Actions
- **Add new:** opens popup CS-005-P1 (Add).
- **Edit:** opens popup CS-005-P1, pre-filled with Country/Region/Name (Region cascades from Country via AJAX `getData`); upon saving, the `title`/`district_id` of the related `CmsDestination` record (if any) is also updated.
- **Delete:** opens popup CS-005-P1 in delete-confirmation mode; deletion cascades to `Area` records with the corresponding `district_id` and the related `CmsDestination` record.

## Navigation
- Accessed from: Configuration menu > Reference Data > District Setup.
- Navigates to: CS-005-P1 (District Form popup).
