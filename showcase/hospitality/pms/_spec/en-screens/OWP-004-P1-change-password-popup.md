# OWP-004-P1 — Update Password

**Type:** Popup (opened from OWP-004, as a tab on the same page)

**Route:** `ExternalUserController::changePassword()` — no dedicated friendly route, no dedicated view (the form lives in the `#change-password` tab of `profile.ctp`), submitted via POST to the `changePassword` action

**Module:** Owner Hub

## Overview

Login password change form, which verifies the old password before allowing a new password to be set.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Old password | old_password | Password | Yes | Matched against the current password (`Owner.password`) |
| 2 | New password | new_password | Password | Yes | Minimum 6 characters |
| 3 | Confirm new password | confirm_password | Password | Yes | Must match new_password (JS `equalTo` validation) |

## Functions / Actions

- Update password ("Update Password" button, submits the form)
- Error notification if the old password is incorrect
- Log the password change activity

## Navigation

- After a successful change → redirected back to OWP-004 (Profile tab)
- On failure → returns to the OWP-004 "Change Password" tab with an error message
