# USR-008 — My Profile

**Type:** Full page

**Route:** `UserController::profile()` — default `user/profile`

**Module:** Login & System Users

## Overview
A page allowing the currently logged-in user (internal staff or Agency Staff) to view and update their own personal information (administrative fields such as salary, business unit, and work permit cannot be edited — these are displayed for reference only). Includes a quick link to change password (USR-008-P1).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | Minimum 2 characters |
| 2 | Family Name | `family_name` | Text | Yes | |
| 3 | ID (hidden) | `id` | Hidden | — | |
| 4 | Nationality | `nationality` | Select2 | Yes | |
| 5 | Email | `email` | Email | Yes | Duplicate check via ajax |
| 6 | Phone Number | `phone_number` | Text | Yes | |
| 7 | Company | `company_id` | Select2 | Yes | Display-only, typically read-only for staff |
| 8 | Business Unit | `business_unit_id` | Select2 | Yes | |
| 9 | Avatar/Emoticon | `emoticon` | Hidden (emoji picker) | No | |
| 10 | Languages Used | `user_language[]` | Multi-select checkbox | No | Source: `_getLanguages()` |

Display-only information (not editable): user type, role, current business unit, current language.

## Functions / Actions
- **Update Profile (Save):** saves to the `User` table (or `AgencyStaff` if the user is agency staff), re-syncs the session (first_name, family_name, email, emoticon), and updates the language list.
- **Change Password:** opens the USR-008-P1 popup (anchor `#change-password` on the same page).

## Navigation
- Opened from: the personal account menu (avatar/user menu) available on every page after login.
- Navigates to: USR-008-P1 (Change Password — child popup). After a successful password change, the system automatically logs the user out and returns to LOG-001.
