# OWP-003 — Reset Password

**Type:** Full page

**Route:** `ExternalUserController::resetPassword($token)` — no dedicated friendly route; accessed via the link in the email `/external-user/reset-password/{token}` (CakePHP default)

**Module:** Owner Portal

## Overview

Page for setting a new password, accessed from the link in the email sent from OWP-001-P1. The reset token is valid for only 24 hours; if it is expired or invalid, an error message is shown and the form is not displayed.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | New password | new_password | Password | Yes | Minimum 6 characters (JS validation) |
| 2 | Confirm password | con_password | Password | Yes | Must match new_password (JS `equalTo` validation) |

## Functions / Actions

- Reset password (submit form, updates `Owner.password`, deletes the used token)
- Display an error message if the token is expired/does not exist (form is not shown in this case)
- Log the password reset activity

## Navigation

- Accessed from an email link (source: OWP-001-P1)
- Successful reset → redirected back to OWP-001 Login
