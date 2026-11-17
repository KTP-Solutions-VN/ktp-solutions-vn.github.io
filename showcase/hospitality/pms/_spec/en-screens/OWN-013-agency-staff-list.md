# OWN-013 — Agency Staff List

**Type:** Full page

**Route:** `/Owner/agencyStaff` (controller `Owner`, action `agencyStaff()`)

**Module:** Owner Management (Admin)

## Overview

A screen listing all staff members across Agencies who are currently in Active status. This is a first-level sidebar menu item ("Agency Staff").

## Detailed Description

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | No. | — | Number | |
| 2 | Agency Name | `agency.agency_name` | Text | |
| 3 | Full Name | `first_name` + `family_name` | Text | |
| 4 | Roles | `user_role` | Text | Concatenated role list, or "All Access" if no specific role is assigned |
| 5 | User Type | `user_type` | Text | |
| 6 | Status | `status` | Text | |
| 7 | Created Date | `created_at` | Datetime | Format `d M Y H:i` |
| 8 | Actions | — | Edit / Delete | |

## Functions / Actions

- **+ Add New**: opens OWN-014 (Add New Agency Staff).
- **Edit** (pencil icon): opens OWN-015 (Edit Agency Staff).
- **Delete** (trash icon): confirmed via a popup modal, then calls `delete-agency-staff/{id}` (no dedicated UI).

## Navigation

- Opened from: sidebar menu "Agency Staff" (`active_menu` 106).
- Navigates to:
  - OWN-014 — Add New Agency Staff
  - OWN-015 — Edit Agency Staff
