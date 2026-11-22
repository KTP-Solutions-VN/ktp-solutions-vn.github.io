# SET-003 — Outgoing Mail Server

**Type:** Full page

**Route:** `SettingController::smtpSettings()` — default `/setting/smtp-settings` (no friendly route declared in `config/Routes.php`; there is one legacy commented-out route to the `user` controller, unused)

**Module:** SET = Platform Settings

## Overview
A dedicated form for configuring the SMTP server parameters used for sending system emails (independent of the "Core Preferences" tab in SET-002, but updates the same `Setting` record, id = 1, with the same fields `smtp_host`, `smtp_email`, `smtp_password`, `smtp_port`).

## Detailed Description

Form for updating the `Setting` record (id = 1):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | SMTP Email | `smtp_email` | Email | Yes | |
| 2 | SMTP Host | `smtp_host` | Text | Yes | |
| 3 | SMTP Port | `smtp_port` | Text | Yes | |
| 4 | SMTP Password | `smtp_password` | Text | Yes | Displayed as plain text (not masked) |

## Functions / Actions
- **Save:** submits the form, updates the `Setting` record, logs the activity ("smtp settings changed by ..."), shows a flash message, redirects back to the current page.
- **Cancel:** resets the form to its previously entered values (`type=reset` button), does not submit.

## Navigation
- Accessed from: SET-001, or Platform Settings menu > Outgoing Mail Server.
- Does not navigate to any other page or popup.
