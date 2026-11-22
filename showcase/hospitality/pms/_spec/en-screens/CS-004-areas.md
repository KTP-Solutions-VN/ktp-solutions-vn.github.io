# CS-004 — Area Setup

**Type:** Full page

**Route:** `CommonSettingController::areas()` — default `/common-setting/areas`

**Module:** CS = Reference Data

## Overview
A list for managing the Area lookup data — a level below District, within the geographic hierarchy Country > Region > District > Area.

## Detailed Description

List (DataTable `#zero_config`, sorted by Country > Region > District > Area):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Country | `country.name` | |
| 3 | Region | `region.name` | |
| 4 | District | `district.name` | |
| 5 | Area | `name` | |
| 6 | Created Date | `created_at` | `d M Y H:i` |
| 7 | Actions | — | Edit, Delete (opens popup CS-004-P1) |

## Functions / Actions
- **Add new:** opens popup CS-004-P1 (Add).
- **Edit:** opens popup CS-004-P1, pre-filled with Country/Region/District/Name (the Region and District dropdowns cascade-load via AJAX `getData`).
- **Delete:** opens popup CS-004-P1 in delete-confirmation mode.

## Navigation
- Accessed from: Configuration menu > Reference Data > Area Setup.
- Navigates to: CS-004-P1 (Area Form popup).
