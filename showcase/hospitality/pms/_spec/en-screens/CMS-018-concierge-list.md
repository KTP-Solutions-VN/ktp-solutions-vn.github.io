# CMS-018 — Concierge List

**Type:** Full page

**Route:** `CmsController::concierges($action, $id)` — default `/cms/concierges/:action/:id`

**Module:** Website Content (CMS)

## Overview
List of concierge services displayed on the website. No server-side pagination (retrieves the entire result set via `CmsConcierge->find('all')`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Title | `CmsConcierge.title` | |
| 3 | Action | — | Edit, Delete buttons |

No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Add new ("+" button):** navigates to CMS-019 – editConcierges (`/cms/edit-concierges`, out of scope for this document, handled by another agent).
- **Edit:** navigates to CMS-019 with `id` (`/cms/edit-concierges/:id`).
- **Delete:** calls back into this action in the form `/cms/concierges/delete/:id` — deletes the `CmsConcierge` record **and** deletes all related gallery images in `CmsImage` (condition `villa_id = id`, `tag = 'Concierge'`), shows a flash message, then redirects back to the list (using `['controller'=>'Cms','action'=>'concierges']`).

## Navigation
- Accessed from: CMS-005 (Common Text, "Concierge" button).
- Navigates to: CMS-019 (add/edit concierge — out of scope for this document).
