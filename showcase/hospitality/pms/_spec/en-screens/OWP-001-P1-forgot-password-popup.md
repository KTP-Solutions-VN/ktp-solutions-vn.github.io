# OWP-001-P1 — Forgot Password Popup

**Type:** Popup (opened from OWP-001)

**Route:** `ExternalUserController::forgotPassword()` — no dedicated friendly route, no dedicated view (autoRender = false); the popup UI is embedded directly in `index.ctp` (div `#recoverform`), submitted via AJAX/POST to the `forgotPassword` action

**Module:** Owner Portal

## Overview

Popup that lets the user enter their email to receive a password reset link. The system looks up the Owner by email, generates a password reset token (`forget_token`, valid for 24 hours), and sends an email containing a link to OWP-003.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Email | email | Email | Yes | Matched against `Owner.email` |

## Functions / Actions

- Submit password reset request (submit button, sends an email containing the reset token)
- Success/failure notification (flash message), activity logging

## Navigation

- After submission → returns to OWP-001 (redirect referer) with a notification
- Email received contains a link → OWP-003 Reset Password
