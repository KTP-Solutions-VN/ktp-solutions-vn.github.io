# USR-007 — View User Details

**Type:** Full page

**Route:** `UserController::viewDetails($id, $tab)` — default `user/viewDetails/:id/:tab`

**Module:** Login & System Users

## Overview
A read-only page displaying a staff member's detailed information: identification, assigned business unit, role, language, registered office, and list of bank accounts. Used by roles without edit permissions who still need to look up a staff profile, or for a quick review before deciding to proceed to edit (USR-006).

## Detailed Description

**Identification Tab (view-only):**

| # | Field Label | Field Code | Notes |
|---|---|---|---|
| 1 | Photo/Avatar | `image`, `avtar` | |
| 2 | Full Name | `first_name`, `family_name` | |
| 3 | Usage Name | `usage_name` | |
| 4 | Nationality | `nationality` | |
| 5 | Personal / Work Email | `email`, `professional_email` | |
| 6 | Username | `username` | |
| 7 | Phone Number | `phone_number` | |
| 8 | Company | `company_id` (display name) | |
| 9 | Business Unit | `user_business_unit` | Concatenated list of BUs |
| 10 | User Type / Role | `user_type`, `user_role` | |
| 11 | Language | `user_current_language` | |
| 12 | Registered Office | `office_names` | |
| 13 | Start Date | `starting_date` | |
| 14 | Access Level | `access` | |

**Bank Account Tab (view-only, list):**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Bank Name | `bank_id` (name) | |
| 3 | Account Holder Name | `account_name` | |
| 4 | Account Number | `account_number` | |
| 5 | SWIFT Code | `bank_swift` | |
| 6 | Currency | `currency_id` (name) | |
| 7 | Country | `country` | |
| 8 | Attached Document | `document` | |

## Functions / Actions
- No direct data-editing controls on this page (view-only); a link/button to switch to USR-006 (Edit) may be available depending on permissions.
- Switching between view tabs (Identification, Bank Account).

## Navigation
- Opened from: USR-004 (View Details icon).
- Navigates to: USR-006 (Edit User) if the user has edit permissions; if the `id` is invalid, an error is shown and the user is returned to the previous page.
