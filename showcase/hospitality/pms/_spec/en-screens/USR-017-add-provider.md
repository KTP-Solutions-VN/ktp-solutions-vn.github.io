# USR-017 — Add Provider

**Type:** Full page

**Route:** `UserController::addProviders()` — default `user/addProviders`

**Module:** Login & System Users

## Overview
A form for creating a new staff account for an external service provider (`employment = External`), including the service/provider company information, personal information, login credentials, role/module permissions, business unit, and language.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Service | `service_id` | Select2 | Yes | |
| 2 | Provider | `provider_id` | Select2 | Yes | Loaded dynamically based on the selected service |
| 3 | First Name | `first_name` | Text | Yes | Minimum 2 characters |
| 4 | Family Name | `family_name` | Text | Yes | Minimum 2 characters |
| 5 | Usage Name | `usage_name` | Text | Yes | Minimum 2 characters |
| 6 | Avatar/Emoticon | `emoticon` | Hidden (emoji picker) | No | |
| 7 | Nationality | `nationality` | Select2 | Yes | |
| 8 | Email | `email` | Email | Yes | Duplicate check via `checkemail` ajax call |
| 9 | Username | `username` | Text | Yes | Duplicate check via `checkUserName` ajax call |
| 10 | Password | `password` | Password | Yes | |
| 11 | Phone Number | `phone_number` | Text | Yes | |
| 12 | Status | `status` | Select | Yes | Active/Inactive |
| 13 | Access | `access[]` | Checkbox | No | Web/App |
| 14 | Role | `role` | Select | Yes | Manager/Operator |
| 15 | Module Permissions | `user_role[]` | Checkbox group | Yes | List of module-level access permissions |
| 16 | Business Unit | `business_units[]` | Checkbox group | Yes | |
| 17 | Languages Used | `user_language[]` | Checkbox group | No | |
| 18 | Profile Photo | `image` (file) | Image upload | No | jpg/png/jpeg |
| 19 | Avatar (icon) | `avatar` (file) | Image upload | No | jpg/png/jpeg |
| 20 | Send Account Notification Email | `send_mail[]` | Checkbox | No | |

## Functions / Actions
- **Save:** creates a `User` record (employment=External, user_type=Employee) linked to the provider company (`company_id`), saves role/business unit/language assignments, uploads images, sends an account email if selected, and logs the activity.
- **Cancel:** returns to USR-016.

## Navigation
- Opened from: USR-016 (the "Add New" button).
- Navigates to: USR-016 (Provider List) after a successful save.
