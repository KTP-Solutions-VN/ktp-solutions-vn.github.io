# OWN-002 — Add New Owner

**Type:** Full page

**Route:** `/Owner/add` (controller `Owner`, action `add($tab = null)`)

**Module:** Owner Management (Admin)

## Overview

A form for creating a new Owner in the system, including personal information, login account, role assignment, business unit in charge, avatar, and an option to send a password notification email. After saving, the system redirects to screen OWN-003 (Edit Owner) on the "Payment Details" tab.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | Minimum 2 characters |
| 2 | Family Name | `family_name` | Text | Yes | Minimum 2 characters |
| 3 | Nationality | `nationality` | Select2 | Yes | List of countries |
| 4 | Email | `email` | Text (email) | Yes | Duplicate check via ajax `checkemail` |
| 5 | Username | `username` | Text | Yes | Duplicate check via ajax `checkUserName` |
| 6 | Password | `password` | Password (with show/hide button) | Yes | Also saved as a base64-encoded value in `legecy_key` |
| 7 | Phone Number | `phone_number` | Text | No | |
| 8 | Status | `status` | Select (Active/Inactive) | Yes | |
| 9 | Company Type | `company_name` | Radio (Individual/Company) | Yes | |
| 10 | Role | `role` | Radio (Owner/Manager/Staff) | Yes | Selecting Manager/Staff reveals the "Module Access" section |
| 11 | Module Access | `user_role[]` | Multi-select checkbox | Yes (if role = Manager/Staff) | |
| 12 | Business Unit | `business_units[]` | Select2, supports multiple rows (button "+ Add Business Unit") | Yes | |
| 13 | Default Language | `language_id` | Select | Yes | |
| 14 | Access Portal | `access_portal[]` | Checkbox (Owner's Portal / Azura Manager) | Yes | |
| 15 | Avatar | `upload` / `cropped_image` | Image file (auto-crop 2:1 ratio) | No | Max 1MB |
| 16 | Send Password Email | `send_mail[]` | Checkbox (Yes) | No | Only shown when adding a new owner |

## Functions / Actions

- **Save**: saves the new owner, creating `Owner`, `UserBusinessUnit`, and `UserRole` records; sends a registration email if "Send Email" is checked; logs the activity; then redirects to OWN-003 on the "payment-details" tab.
- **Cancel**: returns to OWN-001 (Owner List).

## Navigation

- Opened from: OWN-001 ("+ Add New" button).
- After a successful save: redirects to OWN-003 — Edit Owner (Payment Details tab, `show_page=list`).
- Cancel: returns to OWN-001.
