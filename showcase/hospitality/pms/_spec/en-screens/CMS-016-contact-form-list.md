# CMS-016 — Enquiry Forms

**Type:** Full page

**Route:** `CmsController::contactForm($action, $id)` — default `/cms/contact-form/:action/:id`

**Module:** Web Publishing

## Overview
List of contact form configurations (title + recipient email) displayed/connected on the website. No server-side pagination (retrieves the entire result set via `CmsContactUs->find('all')`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Title | `CmsContactUs.title` | |
| 3 | Email | `CmsContactUs.email` | |
| 4 | Action | — | Edit, Delete buttons |

No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Add new ("+" button):** navigates to CMS-017 (`/cms/edit-contact-form`, no `id` passed).
- **Edit:** navigates to CMS-017 with `id` (`/cms/edit-contact-form/:id`).
- **Delete:** calls back into this action in the form `/cms/contact-form/delete/:id` — deletes the `CmsContactUs` record, shows a flash message, then redirects back to the list.

## Navigation
- Accessed from: CMS-005 (Shared Content Blocks, "Enquiry Forms" button) or breadcrumb from CMS-017.
- Navigates to: CMS-017 (Enquiry Form Editor).
