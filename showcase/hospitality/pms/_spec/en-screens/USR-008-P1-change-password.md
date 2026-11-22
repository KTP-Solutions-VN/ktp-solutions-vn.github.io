# USR-008-P1 — Update Password

**Type:** Popup/Modal (opened from USR-008)

**Route:** `UserController::changePassword()` — default `user/changePassword`

**Module:** Sign-in & Workforce

## Overview
A popup allowing the currently logged-in user to change their own password, requiring the correct current password before a new one can be set. After a successful change, the system forces a logout so the user must log back in with the new password.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Old Password | `old_password` | Password | Yes | Minimum 2 characters; checked against the current password |
| 2 | New Password | `new_password` | Password | Yes | Minimum 2 characters |
| 3 | Confirm New Password | `confirm_password` | Password | Yes | |

## Functions / Actions
- **Change Password (submit):** verifies the old password matches, saves the new password, logs the activity, logs the user out, and redirects to LOG-001.
- If the old password is incorrect or the save fails: an error flash message is displayed and the user remains on USR-008 (anchor `#change-password`).

## Navigation
- Opened from: USR-008 (the "Change Password" link).
- Navigates to: LOG-001 (Sign In) after a successful password change.
