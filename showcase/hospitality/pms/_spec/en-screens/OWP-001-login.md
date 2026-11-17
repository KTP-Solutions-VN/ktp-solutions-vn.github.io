# OWP-001 — Login

**Type:** Full page

**Route:** `ExternalUserController::index()` — friendly route: `/Owner`, `/Owners` (config/Routes.php lines 104-105)

**Module:** Owner Portal

## Overview

Login page for Owners and authorized Agency Staff to access the Owner Portal. Supports authentication against 2 data tables (Owner, AgencyStaff). After a successful login, the system logs the access (IP, device, geolocation) and redirects to the property list (OWP-005).

## Detailed Description

Field table (login form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Username | username | Text | Yes | Matched against `Owner.username` or `AgencyStaff.username` |
| 2 | Password | password | Password (with show/hide toggle) | Yes | |
| 3 | Remember me | customCheck1 | Checkbox | No | Present in the UI, but no "remember me" logic was found implemented in the controller |

## Functions / Actions

- Login (submit form to the `index` action, POST method)
- Forgot Password (opens popup OWP-001-P1)
- Error notification on incorrect username/password (flash message)
- Automatic redirect to OWP-005 (Property List) if already logged in

## Navigation

- Successful login → OWP-005 Property List (property/list)
- Click "Forgot Password" → opens OWP-001-P1 (popup, same page)
- Password reset link via email → OWP-003 Reset Password
