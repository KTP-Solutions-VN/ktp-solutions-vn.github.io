# USR-019 — Contractor Profile

**Type:** Full page

**Route:** `UserController::viewProviderDetails($id)` — default `user/viewProviderDetails/:id`

**Module:** Sign-in & Workforce

## Overview
A read-only detail page displaying information for a staff account belonging to an external service provider.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text (read-only) | — | |
| 2 | Family Name | `family_name` | Text (read-only) | — | |
| 3 | Nationality | `nationality` | Text (read-only) | — | |
| 4 | Username | `username` | Text (read-only) | — | |
| 5 | Phone Number | `phone_number` | Text (read-only) | — | |
| 6 | Password | `legecy_key` (base64-decoded) | Text (read-only) | — | Displays the password in plain text (legacy) |
| 7 | Email | `email` | Text (read-only) | — | |
| 8 | Emoticon | `emoticon` | Text (read-only) | — | |
| 9 | Provider | `provider.name` | Text (read-only) | — | |
| 10 | User Type | `user_type` | Text (read-only) | — | |
| 11 | Business Unit | `user_business_unit` | Text (read-only) | — | Concatenated list |
| 12 | Role | `user_role` | Text (read-only) | — | |
| 13 | Language | `user_current_language` | Text (read-only) | — | |

## Functions / Actions
- View-only information; no direct edit controls on this page.

## Navigation
- Opened from: USR-016 (the "View" button on each row).
- Navigates to: none (a read-only page; returns via breadcrumb/back navigation).
