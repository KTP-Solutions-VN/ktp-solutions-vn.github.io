# OWP-004 — My Account

**Type:** Full page

**Route:** `ExternalUserController::profile()` — no dedicated friendly route (default `/external-user/profile`)

**Module:** Owner Hub

## Overview

Page for viewing and updating the personal information of the Owner/Agency Staff: full name, nationality, email, phone number, company, and display language. Consists of 2 tabs: "Profile" and "Change Password" (OWP-004-P1).

## Detailed Description

Field table (Profile tab):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First name | first_name | Text | Yes | Minimum 2 characters |
| 2 | Family name | family_name | Text | Yes | Minimum 2 characters |
| 3 | Nationality | nationality | Select | Yes | List of countries |
| 4 | Email | email | Email | Yes | Validates email existence (AJAX checkEmail) |
| 5 | Phone number | phone_number | Text | Yes | |
| 6 | Company | company_id | Select | Yes (unless Superadmin) | List of companies |
| 7 | Display language | language_id | Radio | Yes (unless Superadmin) | List of system languages |
| 8 | Hidden ID | id | Hidden | — | |

Read-only information displayed on the left: avatar/emoticon, full name, role, email, phone number, nationality, company, language.

## Functions / Actions

- Update profile ("Update Profile" button, submits the form, logs the activity)
- Switch to the "Change Password" tab (opens OWP-004-P1)

## Navigation

- Accessed from the user menu (avatar/user menu) after login
- Successful update → stays on the page, displays a flash notification
- "Change Password" tab → OWP-004-P1
