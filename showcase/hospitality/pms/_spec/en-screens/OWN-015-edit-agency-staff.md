# OWN-015 — Edit Agency User

**Type:** Full page

**Route:** `/Owner/editAgencyStaff/{id}` (controller `Owner`, action `editAgencyStaff($id)`)

**Module:** Owner Relations (Admin)

## Overview

A form for editing an existing Agency staff account. The field layout is the same as OWN-014, with pre-selected current values added (role, business unit, agency).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | |
| 2 | Family Name | `family_name` | Text | Yes | |
| 3 | Nationality | `nationality` | Select2 | Yes | |
| 4 | Email | `email` | Text (email) | Yes | Duplicate check via ajax `checkAgencyStaffEmail` |
| 5 | Username | `username` | Text | Yes | Duplicate check via ajax `checkAgencyStaffUsername` |
| 6 | Password | `password` | Password (with show/hide button) | Yes | The previous value is base64-decoded for re-display |
| 7 | Phone Number | `phone_number` | Text | Yes | |
| 8 | Start Date | `starting_date` | Date picker | Yes | |
| 9 | Status | `status` | Select (Active/Inactive) | Yes | |
| 10 | Owner's Portal | `access_to_owner` | Radio (Yes/No) | Yes | |
| 11 | Access Level | `user_type` | Radio | Yes | |
| 12 | Module Access | `user_role[]` | Multi-select checkbox, pre-selected based on `selected_user_roles` | Yes (if Team Leader/Employee) | |
| 13 | Agency | `agency_id` | Select | Yes | Current Agency pre-selected |
| 14 | Business Unit | `business_units[]` | Multi-select checkbox, pre-selected based on `selected_user_business_unit` | Yes | |
| 15 | Default Language | `language_id` | Select | Yes | |

## Functions / Actions

- **Save**: updates `AgencyStaff`; deletes and re-creates all related `UserBusinessUnit`/`UserRole` records; logs the activity; then redirects to OWN-013 (Agency Users).
- **Cancel**: returns to OWN-013.

## Navigation

- Opened from: OWN-013 ("Edit" icon on each row).
- After saving (success or failure): returns to OWN-013.
- Cancel: returns to OWN-013.
