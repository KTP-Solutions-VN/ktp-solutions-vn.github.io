# OWN-016 — Owner Login Log

**Type:** Full page

**Route:** `/Owner/loginLog` (controller `Owner`, action `loginLog()`)

**Module:** Owner Management (Admin)

## Overview

A screen for tracking owners' login history into the Owner's Portal, broken down by villa/property. Table data and summary figures are loaded via AJAX (`getOwnerAccessLog`, `getLoginLogData`, `countTotalOwner`, `countNeverLoginOwner`, `noLoginNintyDays`, `getLoginHistory`) after the page finishes loading.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | Filters by business unit, defaults to the logged-in user's BU |
| 2 | Status Filter Tabs | — | Tab (All Owners / Never Logged In / No Login 90+ Days) | — | Each tab shows a count badge |
| 3 | Search | `searchInput` | Text | No | Search by property or owner |
| 4 | Table: Property | `property` | Text | — | |
| 5 | Table: Owner | `owner` | Text | — | |
| 6 | Table: Last Login | `last_login` | Datetime | — | |
| 7 | Table: Total Logins | `total_logins` | Number | — | |
| 8 | Table: Credentials | `credentials` | Text | — | Owner access account information |
| 9 | Table: Login History | — | Button to open drawer | — | Opens the "Login History" panel (offcanvas) on the right |

## Functions / Actions

- **Filter by Business Unit**: changes the displayed list based on the selected BU.
- **Switch Tab** (All/Never Logged In/No Login 90+ Days): filters the list by login status.
- **Search**: filters by property/owner name.
- **Login History** (per row): opens a drawer (offcanvas) showing the owner's login history details: email, total number of logins, first login, most recent login, and login history list.

## Navigation

- Opened from: OWN-001 ("Login Log" button).
- Does not navigate to another page — login history details are viewed directly via a drawer on the same page, with no separate URL.
