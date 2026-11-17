# EMT-001-P1 — Delete Email Template Confirmation

**Type:** Popup (opened from EMT-001)

**Route:** Static modal within `list.ctp`; confirming navigates to `EmailTemplateController::delete($id)` — `GET /email-template/delete/:id`

**Module:** Email Templates

## Overview
Confirmation dialog shown before deleting an email template.

## Detailed Description
No input fields; only a confirmation message and the name of the email template to be deleted, displayed in the modal title.

## Functions / Actions
- **Save (Confirm delete):** navigates to `email-template/delete/:id` (id base64-encoded), deletes the `EmailTemplate` record, and logs the activity.
- **Cancel:** closes the modal.

## Navigation
- Opened from: EMT-001 (Email Template List).
- After confirming: returns to EMT-001.
