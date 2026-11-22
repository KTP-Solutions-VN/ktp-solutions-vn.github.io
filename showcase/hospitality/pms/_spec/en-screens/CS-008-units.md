# CS-008 — Unit Setup

**Type:** Full page

**Route:** `CommonSettingController::units()` — default `/common-setting/units`

**Module:** CS = Reference Data

## Overview
A list for managing the Unit lookup data (rental apartments/units) — a child level of Residence, the lowest level in the geographic hierarchy Country > Region > District > Area > Residence > Unit.

## Detailed Description

List (DataTable `#zero_config`, sorted by Country > Region > District > Area > Residence > Unit):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Country | `country.name` | |
| 3 | Region | `region.name` | |
| 4 | District | `district.name` | |
| 5 | Area | `area.name` | |
| 6 | Residence | `residence.name` | |
| 7 | Unit | `name` | |
| 8 | Created Date | `created_at` | `d M Y H:i` |
| 9 | Actions | — | Edit, Delete (opens popup CS-008-P1) |

## Functions / Actions
- **Add new:** opens popup CS-008-P1 in Add mode, supporting the entry/addition of multiple Units at once as a "chip" list.
- **Edit:** opens popup CS-008-P1 in Edit mode (a single Unit only, with Region/District/Area/Residence cascading via AJAX `getData`).
- **Delete:** opens popup CS-008-P1 in delete-confirmation mode.

## Navigation
- Accessed from: Configuration menu > Reference Data > Unit Setup.
- Navigates to: CS-008-P1 (Unit Form popup).
