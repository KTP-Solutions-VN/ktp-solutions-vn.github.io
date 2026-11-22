# BU-015 — Office Locations

**Type:** Full page

**Route:** `BusinessUnitController::offices()` — default `/business-unit/offices`

**Module:** Operating Units

## Overview
A list of physical offices associated with each Business Unit, together with their affiliated departments.

## Detailed Description

List (DataTable `#zero_config`):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | Office Name | `name` | |
| 2 | Business Unit | `business_unit_id` → `business_unit.name` | |
| 3 | Department | `department_id` (JSON) → role name | Joined by commas |
| 4 | Created Date | `created_at` | Format `d M Y H:i` |
| 5 | Actions | — | View, Edit, Delete |

## Functions / Actions
- **Add new:** navigates to BU-016 (New Office Location).
- **View (eye icon):** navigates to BU-018 (Office Profile).
- **Edit (pencil icon):** navigates to BU-017 (Edit Office Location).
- **Delete (trash icon):** opens popup BU-015-P1 to confirm deletion; confirmation navigates to `delete-office/{id}` (id base64-encoded via JS `btoa`).

## Navigation
- Accessed from: Settings menu.
- Navigates to: BU-016 (Add), BU-017 (Edit), BU-018 (Office Profile), BU-015-P1 (delete confirmation popup).
