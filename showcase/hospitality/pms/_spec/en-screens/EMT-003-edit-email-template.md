# EMT-003 — Email Template Editor

**Type:** Full page

**Route:** `EmailTemplateController::edit($id)` — default `/email-template/edit/:id` (id base64-encoded)

**Module:** Email Library

## Overview
Form for editing the title and content of an existing email template. Template For (purpose of use) and Language are display-only and cannot be edited.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Template For | `template_for` | Text (readonly) | — | Not editable |
| 2 | Language | `language_id` | Text (readonly) | — | Not editable |
| 3 | Title | `title` | Text (min 2 characters) | Yes | |
| 4 | Content | `content` | Textarea + TinyMCE (rich text) | Yes (min 2 characters) | |

## Functions / Actions
- **Save:** updates the `title` and `content` of the `EmailTemplate`, logs the activity, and redirects to EMT-001.
- **Cancel (reset):** restores the original values on the form (reset, no navigation).

## Navigation
- Opened from: the Edit icon on EMT-001 (Email Library).
- After saving: redirects to EMT-001. If the id is invalid: returns to the previous page (`referer`).
