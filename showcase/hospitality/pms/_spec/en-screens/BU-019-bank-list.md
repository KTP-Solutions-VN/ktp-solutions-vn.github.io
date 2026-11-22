# BU-019 — Bank Directory

**Type:** Full page

**Route:** `BusinessUnitController::banks()` — default `/business-unit/banks`

**Module:** Operating Units

## Overview
A list of banks pre-configured in the system, used when creating an Account on BU-010.

## Detailed Description

List (DataTable `#zero_config0`):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | Bank Name | `name` | |
| 2 | Short Name | `short_name` | |
| 3 | Logo | `logo` | 100x100 thumbnail image, defaults to `no-image.gif` |
| 4 | Country | `country_name` | |
| 5 | Address | `address` | |
| 6 | Created Date | `created_at` | Format `d M y` |
| 7 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add new:** navigates to BU-020 (New Bank).
- **Edit (pencil icon):** navigates to BU-021 (Edit Bank Record).
- **Delete (trash icon):** opens popup BU-019-P1 to confirm deletion.

## Navigation
- Accessed from: Settings menu.
- Navigates to: BU-020 (Add), BU-021 (Edit), BU-019-P1 (delete confirmation popup).
