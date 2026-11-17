# LOG-001 — Login

**Type:** Full page

**Route:** `LoginController::index()` — default `login/index`; friendly route: `/` (system root page)

**Module:** Login & System Users

## Overview
The login screen for the Azura Manager PMS system, applicable to all account types (Superadmin, Admin, Business Unit Manager, staff, partner/agency staff, and villa owners, all sharing the User/AgencyStaff/Owner tables). Upon successful authentication, the system calculates the user's permissions/role and assigned business unit, then redirects to the dashboard appropriate to the account type. Users may select "Remember me" and can access the forgot-password screen from here.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Username | `username` | Text | Yes | Login uses username (not email) |
| 2 | Password | `password` | Password (with show/hide toggle `show_password`) | Yes | |
| 3 | Remember me | `remember_me` | Checkbox | No | When checked, stores a `remember_me` cookie (JSON-encoded username/password) valid for 100 years |

Authentication runs against 3 sources simultaneously (CakePHP multi-auth): the `User` table (internal staff), `AgencyStaff` (agency staff), and `Owner` (villa owners), accepting only accounts with `status = Active`.

## Functions / Actions
- **Login (submit):** authenticates the user, logs the access event, calculates permissions (`user_privileges`), assigns the business unit, and redirects based on account type (Superadmin/Admin/BU Manager → booking list; staff → USR-001 Dashboard; villa owner via "switch owner" → ExternalUser page).
- **Forgot password? (link "to-recover"):** opens the LOG-001-P1 popup directly on the page, without navigating away.
- Login error messages (incorrect username/password) are displayed as a flash message in `#login_message`.

## Navigation
- Entry points: accessing the root URL `/`, or being redirected here when the session expires / the user is not logged in / after logout.
- Navigates to: LOG-001-P1 (Forgot Password — child popup), USR-001 (Dashboard), or the booking list page depending on account type after successful login.
- Child popup: LOG-001-P1.
