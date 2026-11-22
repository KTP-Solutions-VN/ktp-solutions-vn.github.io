# CS-007 — Location Tags

**Type:** Full page

**Route:** `CommonSettingController::locationTypes()` — default `/common-setting/location-types`

**Module:** CS = Reference Data

## Overview
A list for managing the Villa Location Type lookup data (`VillaLocationType`) — for example: Beachfront, Hillside, City center, etc.

## Detailed Description

List (DataTable `#zero_config`, sorted by `name` descending):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Location Type Name | `name` | |
| 3 | Created Date | `created_at` | `d M Y H:i` |
| 4 | Actions | — | Edit, Delete (opens popup CS-007-P1) |

## Functions / Actions
- **Add new:** opens popup CS-007-P1 (Add).
- **Edit:** opens popup CS-007-P1, pre-filled with `name`.
- **Delete:** opens popup CS-007-P1 in delete-confirmation mode.

## Navigation
- Accessed from: Configuration menu > Reference Data > Location Tags.
- Navigates to: CS-007-P1 (Location Tag Form popup).
