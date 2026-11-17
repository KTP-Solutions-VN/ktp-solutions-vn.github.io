# USR-016 — Provider List

**Type:** Full page

**Route:** `UserController::providers($tab)` — default `user/providers`

**Module:** Login & System Users

## Overview
A list of `User` accounts belonging to external service providers (`employment = External`, `user_type = Employee`), for example personnel from cleaning or maintenance service companies. Allows filtering by business unit, and viewing/editing/deleting.

## Detailed Description

**Filter:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (auto-submits on change) | No | Defaults to "All" |

**Displayed Columns:**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Provider | `provider.name` | |
| 3 | Name | `first_name` + `family_name` | |
| 4 | Usage Name | `usage_name` | |
| 5 | User Role | `user_role` | List of assigned roles, or "All access" |
| 6 | User Type | `user_type` | |
| 7 | Created Date | `created_at` | |
| 8 | Created By | `created_user.usage_name` | |
| 9 | Actions | — | View, Edit, Delete |

## Functions / Actions
- **Add New:** opens USR-017 (Add Provider).
- **View Details:** opens USR-019 (View Provider Details).
- **Edit:** opens USR-018 (Edit Provider).
- **Delete:** confirmation popup, calls `user/delete/:base64(id)`.

## Navigation
- Entry point: Settings/Users menu → Providers.
- Navigates to: USR-017 (Add), USR-018 (Edit), USR-019 (View Details).
