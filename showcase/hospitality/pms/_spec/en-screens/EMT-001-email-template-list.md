# EMT-001 — Email Template List

**Type:** Full page

**Route:** `EmailTemplateController::list()` — default `/email-template/list`

**Module:** Email Templates

## Overview
List of email templates pre-configured in the system (by purpose of use and language), used to prepare content for automated emails (e.g. newsletter emails to homeowners).

## Detailed Description

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Sequential number |
| 2 | Title | `title` | |
| 3 | Language | `language_id` | Displays the corresponding language name |
| 4 | Created Date | `created_at` | Format d M Y H:i |
| 5 | Actions | — | Edit, Delete |

No dedicated filter/search; default sort is by `title` ascending.

## Functions / Actions
- **Add new:** opens EMT-002 (Add Email Template).
- **Edit (icon):** opens EMT-003 (Edit Email Template) with the id base64-encoded.
- **Delete (icon):** opens the confirmation popup EMT-001-P1; confirming navigates to `email-template/delete/:id`.

## Navigation
- Accessed from: system configuration menu (Email Template).
- Navigates to: EMT-002 (Add new), EMT-003 (Edit), EMT-001-P1 (Delete confirmation).
