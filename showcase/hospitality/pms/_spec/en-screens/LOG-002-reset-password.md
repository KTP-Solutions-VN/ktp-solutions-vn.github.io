# LOG-002 — Set New Password

**Type:** Full page

**Route:** `LoginController::resetPassword($token)` — default `login/resetPassword/:token`; friendly route: `/reset-password/:token`

**Module:** Sign-in & Workforce

## Overview
A page allowing users to set a new password after clicking the link in the forgot-password email (LOG-001-P1). The token is valid for 1 day from the time of the request; if the token has expired or is invalid, the form is not displayed and only an error message is shown.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | New Password | `new_password` | Password | Yes | Minimum 6 characters (JS validation) |
| 2 | Confirm Password | `con_password` | Password | Yes | Must match `new_password` (`equalTo` rule) |

## Functions / Actions
- **Reset (submit):** updates `password`/`legecy_key` on the `User` table, clears the `forget_token`, logs the access event, displays a success flash message, and redirects to LOG-001.
- If the token has expired or is invalid: an error flash message is displayed and the form is not shown.

## Navigation
- Entry point: link in the forgot-password email (originating from LOG-001-P1).
- Navigates to: LOG-001 (Sign In) after the password has been successfully reset.
