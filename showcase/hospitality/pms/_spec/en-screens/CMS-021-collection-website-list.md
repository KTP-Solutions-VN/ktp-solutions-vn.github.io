# CMS-021 — Themed Sites

**Type:** Full page

**Route:** `CmsController::collectionWebsites($action, $id)` — default `/cms/collection-websites/:action/:id`

**Module:** Web Publishing

## Overview
List of "villa collection websites" (Collection Website) — mini-sites presenting a themed collection of villas, each with its own display name and URL. The `action`/`id` route parameters are used for the delete operation (`/cms/collection-websites/delete/:id`); when no parameters are passed, the action simply displays the list.

## Detailed Description

List (data table, sourced from `GuestCollectionWebsite`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Sequential number within the list |
| 2 | Website Name | `title` | Display name of the collection website |
| 3 | Url | `url` | Public URL of the page |
| 4 | Created | `created_at` | Format `d F Y H:i` |
| 5 | Action | — | Manage / Edit / Delete buttons |

No filter/search; all `GuestCollectionWebsite` records are listed.

## Functions / Actions
- **Add Collection (button, top of page):** navigates to CMS-022 (`collectionWebsiteEdit`, Add mode, no `id` passed).
- **Manage (per row):** navigates to the `collectionTabs` action (CMS-023, manages the detailed content of the collection website's tabs — out of scope for this document), route in the form `/cms/collection-tabs/i-wish/:id`.
- **Edit (per row):** navigates to CMS-022 (`collectionWebsiteEdit`, Edit mode, with the record's `id`).
- **Delete (per row):** calls `collectionWebsites('delete', $id)` — deletes the corresponding `GuestCollectionWebsite` record (`_deleteData`), shows a success/error notification, then redirects back to the CMS-021 list itself (there is no separate server-side confirmation step; the interface has a shared confirmation modal available, but no event binding to the Delete button is found in this view).

## Navigation
- Accessed from: main menu (Settings item, "Themed Sites" entry).
- Navigates to: CMS-022 (Themed Site Editor) via the Add/Edit buttons; CMS-023 (`collectionTabs`, manages detailed content) via the Manage button.
