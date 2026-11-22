# LOG-001-P1 — Password Recovery

**Type:** Popup/Modal (opened from LOG-001)

**Route:** `LoginController::forgotPassword()` — default `login/forgotPassword`; friendly route: `/forgot-password`

**Module:** Sign-in & Workforce

## Overview
The "Forgot Password" panel is shown/hidden (via a JS toggle) directly on the LOG-001 login screen, allowing users to enter their email to receive a password reset link. The server-side action does not render its own view (autoRender=false); it only sends the email and redirects back to the previous page with a flash message.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Email | `email` | Email (input type=email) | Yes | Looked up via `User.email`; an error is shown if no match is found |

## Functions / Actions
- **Reset (submit):** generates a `forget_token` (valid for 1 day) stored on the `User` table, sends an email containing the password reset link to LOG-002, logs the access event, displays a success/failure flash message, and returns to LOG-001.

## Navigation
- Opened from: LOG-001, via the "Forgot password?" link.
- Navigates to: after submission, returns to LOG-001 (flash message); the received email links to LOG-002 (Set New Password) with the token included.
