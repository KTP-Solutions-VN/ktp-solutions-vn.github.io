# CMS-022 — Add/Edit Collection Website

**Type:** Full page

**Route:** `CmsController::collectionWebsiteEdit($id)` — default `/cms/collection-website-edit/:id`

**Module:** Website Content (CMS)

## Overview
Form for adding a new or editing an existing Collection Website (`GuestCollectionWebsite`), consisting of a display name and the public URL of the villa collection page.

## Detailed Description

Data fields (form):

| # | Field Name | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | Title | `title` | Text | Required (class `required`). Display name of the collection website. |
| 2 | Url | `url` | Text (type url) | Required (class `required`). Default suggested value `https://azurastays.example/themes/`; with a note instructing the user to append the collection website's title after the final `/`, e.g. `https://azurastays.example/themes/Testing`. |

When `id` is present (Edit mode): loads the `GuestCollectionWebsite` record by `id`, pre-filling the form with the current `title`/`url` values.

When `id` is absent (Add mode): the form is empty, with `url` showing the default suggested value noted above.

## Functions / Actions
- **Save:**
  - Add mode: creates a new `GuestCollectionWebsite` record with `title`, `url`.
  - Edit mode: updates the `GuestCollectionWebsite` record by `id` with the new `title`, `url`.
  - On successful save → shows a success message, redirects to CMS-021 (list, action `collection-websites`).
  - On save error → shows an error message, redirects back to CMS-022 itself (`collection-website-edit/:id`).
- **Reset:** returns the form to its default state (HTML reset, no server call).

## Navigation
- Accessed from: CMS-021 (Collection Website list) — "Add Collection" button (add new, no `id`) or "Edit" link on a given row (with `id`).
- Navigates to: after Save (whether successful or in error), always returns to CMS-021 (Collection Website list).
