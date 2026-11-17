# OWN-014 — Add New Agency Staff

**Type:** Full page

**Route:** `/Owner/addAgencyStaff` (controller `Owner`, action `addAgencyStaff()`)

**Module:** Owner Management (Admin)

## Overview

A form for creating a new staff account belonging to an Agency, including personal information, login account, access permissions, the Agency in charge, business unit, and default language.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | Minimum 2 characters |
| 2 | Family Name | `family_name` | Text | Yes | Minimum 2 characters |
| 3 | Nationality | `nationality` | Select2 | Yes | List of countries |
| 4 | Email | `email` | Text (email) | Yes | Duplicate check via ajax `checkAgencyStaffEmail` |
| 5 | Username | `username` | Text | Yes | Duplicate check via ajax `checkAgencyStaffUsername` |
| 6 | Password | `password` | Password (with show/hide button) | Yes | Also saved as a base64-encoded value in `legecy_key` |
| 7 | Phone Number | `phone_number` | Text | Yes | |
| 8 | Start Date | `starting_date` | Date picker | Yes | |
| 9 | Status | `status` | Select (Active/Inactive) | Yes | |
| 10 | Owner's Portal | `access_to_owner` | Radio (Yes/No) | Yes | |
| 11 | Access Level | `user_type` | Radio (from the user type list, with Superadmin/Admin/Partner hidden) | Yes | Selecting "Team Leader"/"Employee" reveals "Module Access" |
| 12 | Module Access | `user_role[]` | Multi-select checkbox | Yes (if user_type = Team Leader/Employee) | |
| 13 | Agency | `agency_id` | Select | Yes | Active Agencies only; selecting one reloads the Business Unit list via ajax `getAgencyBusinessUnit` |
| 14 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Loaded dynamically based on the selected Agency |
| 15 | Default Language | `language_id` | Select | Yes | |

## Functions / Actions

- **Save**: saves `AgencyStaff`, `UserBusinessUnit`, and `UserRole` records; logs the activity; then redirects to OWN-013 (Agency Staff List).
- **Cancel**: returns to OWN-013.

## Navigation

- Opened from: OWN-013 ("+ Add New" button).
- After saving (success or failure): returns to OWN-013.
- Cancel: returns to OWN-013.
