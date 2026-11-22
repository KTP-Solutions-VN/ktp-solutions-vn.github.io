# CMS-017 — Enquiry Form Editor

**Type:** Full page

**Route:** `CmsController::editContactForm($id)` — default `/cms/edit-contact-form/:id`

**Module:** Web Publishing

## Overview
Form for adding a new or editing an existing contact form configuration (a single shared action for both Add when no `id` is passed, and Edit when `id` is present). No multilingual element.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text (defaults to the current data value when editing) | Yes | |
| 2 | Email | `email` | Input `type=email` (defaults to the current data value when editing) | Yes | The email address that receives contact submissions from the website form |

## Functions / Actions
- **Save:** saves/updates the `CmsContactUs` record. If `id` is present → updates, with an "update success/error" flash message; if `id` is absent → creates a new record, with a "save success/error" flash message. On success → redirects to CMS-016 (`contactForm`); on failure → redirects back to this same form (`editContactForm`, with `id` if present).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-016 ("Add New" button or "Edit" on a given row).
- Navigates to: back to CMS-016 after Save.
