# EMT-002 — New Email Template

**Type:** Full page

**Route:** `EmailTemplateController::add()` — default `/email-template/add`

**Module:** Email Library

## Overview
Form for creating a new email content template by purpose of use (template for) and language; content is composed using the TinyMCE editor and supports dynamic placeholders (`##OWNER_NAME##`, `##NEWS_LETTER##`, `##VILLA_NAME##`, `##START_DATE##`, `##END_DATE##`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Template For | `template_for` | Select2 (list of template purposes) | Yes | Changing this while the language stays the same triggers an AJAX check via `getEmailTemplate` to automatically reload existing content if a matching record already exists (avoiding duplicates) |
| 2 | Language | `language_id` | Select2 (list of Languages) | Yes | |
| 3 | Title | `title` | Text (min 2 characters) | Yes | |
| 4 | Content | `content` | Textarea + TinyMCE (rich text) | Yes (min 2 characters) | |

## Functions / Actions
- **Save:** saves a new `EmailTemplate` record, logs the activity, shows a success flash message, and redirects to EMT-001.
- **Cancel (reset):** clears the entered content on the form (reset, no navigation).

## Navigation
- Opened from: the "Add new" button on EMT-001 (Email Library).
- After saving: redirects to EMT-001.
