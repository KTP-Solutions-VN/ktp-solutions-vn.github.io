# CMS-009 — Press & Partner Badges

**Type:** Full page

**Route:** `CmsController::logos($action, $id)` — default `/cms/logos/:action/:id`

**Module:** Web Publishing

## Overview
List of partner/affiliate logos displayed on the website. No server-side pagination (retrieves the entire result set via `CmsLogo->find('all')`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Title | `CmsLogo.title` | |
| 3 | Link | `CmsLogo.link` | |
| 4 | Action | — | Edit, Delete buttons |

No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Add new ("+" button):** navigates to CMS-010 (`/cms/logo-add`).
- **Edit:** navigates to CMS-011 (`/cms/logo-edit/:id`).
- **Delete:** calls back into this action in the form `/cms/logos/delete/:id` — deletes the `CmsLogo` record, shows a flash message, then redirects back to the list.

## Navigation
- Accessed from: CMS-005 (Shared Content Blocks, "Partner Badges" button) or breadcrumb from CMS-010/CMS-011.
- Navigates to: CMS-010 (add), CMS-011 (edit).
