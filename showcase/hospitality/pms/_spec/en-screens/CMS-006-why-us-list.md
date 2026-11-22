# CMS-006 — Book-Direct Benefits

**Type:** Full page

**Route:** `CmsController::whyUs($action, $id)` — default `/cms/why-us/:action/:id`

**Module:** Web Publishing

## Overview
List of "Book-Direct Benefits" items (reasons guests should choose the service) displayed on the website. No server-side pagination (retrieves the entire result set via `CmsWhyUs->find('all')`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Title | `CmsWhyUs.title` | |
| 3 | Action | — | Edit, Delete buttons |

No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Add new ("+" button):** navigates to CMS-007 (`/cms/why-us-add`).
- **Edit:** navigates to CMS-008 (`/cms/why-us-edit/:id`).
- **Delete:** calls back into this action in the form `/cms/why-us/delete/:id` — deletes the `CmsWhyUs` record, shows a flash message, then redirects back to the list.

## Navigation
- Accessed from: CMS-005 (Shared Content Blocks, "Book-Direct Benefits" button) or breadcrumb from CMS-007/CMS-008.
- Navigates to: CMS-007 (add), CMS-008 (edit).
