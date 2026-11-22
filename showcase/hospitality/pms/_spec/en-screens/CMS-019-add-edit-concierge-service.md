# CMS-019 — Concierge Service Editor

**Type:** Full page

**Route:** `CmsController::editConcierges($id)` — default `/cms/edit-concierges/:id`

**Module:** Web Publishing

## Overview
Form for adding a new or editing an existing "Concierge" item (a concierge service displayed on the homepage/mini-website). Each Concierge consists of a title (`title`) and a list of illustrative images that can be dynamically added/removed, with each image having a caption (`legend`) entered/displayed per the currently selected language.

## Detailed Description

Data fields (form):

| # | Field Name | Field Code | Type | Notes |
|---|---|---|---|---|
| 1 | Title | `title` | Text | Required. Stored directly in the `CmsConcierge` table (not per language). |
| 2 | Language | `language` | Dropdown | List sourced from the `Language` table (`language_code` → `name`), default `en`. Changing the language reloads the corresponding image captions (`legend`) via JS, without a page reload. |
| 3 | Image — repeated over multiple rows | `image[]` | File upload | Each image row has one file-selection field (limit < 1MB, ratio 3:2). Existing images show a thumbnail; clicking the thumbnail reopens the file-selection field to replace the image. |
| 4 | Image caption (Legend) — per image row | `legend[]` | Text | Required. Stored via `serialize()` as an array `[language_code => text]` in the `legend` column of `CmsImage`; only the value for the currently selected language dropdown can be viewed/edited. |
| 5 | (hidden) Image ID | `id[]` | Hidden | ID of each existing `CmsImage` record, used for reconciliation on save/delete. |

When `id` is present (Edit mode): loads the `CmsConcierge` record by `id`, and loads all related images from `CmsImage` with the condition `tag = 'Concierge'`, `villa_id = <id of the Concierge>` (the `villa_id` field is reused to store the parent ID), sorted by `sort` ascending. Each image's `legend` column is `unserialize()`-d to retrieve the array of captions by language.

When `id` is absent (Add mode): the form is empty, with no pre-existing images; image rows are added using the "Add More" button.

## Functions / Actions
- **Add More:** dynamically adds a new image row + caption field to the form (JS, no server call).
- **Remove image row button (minus icon):** removes an image row from the form (only the 2nd row onward has a remove button; the first image row cannot be removed). This only removes it from the interface — the image is actually deleted from the database on Save, if that image's `id` is no longer present in the submitted `id[]` list.
- **Change Language (dropdown):** reloads the "Legend" field content of each image for the newly selected language (based on the `legend` array already loaded client-side, pure JS, no server call).
- **Save:**
  - Add mode: creates a new `CmsConcierge` record with `title`; for each image with an uploaded file, uploads the image (to the `villas` directory) then creates a `CmsImage` record (`tag = 'Concierge'`, `villa_id = <id of the newly created Concierge>`, `sort` per row order, `legend` = a serialized array containing only the current language). Images with no selected file are saved with `image = ''`.
  - Edit mode: updates the `CmsConcierge`'s `title`; for existing images no longer in the submitted `id[]` list → deletes the corresponding `CmsImage` record; for images with a newly uploaded file → uploads the replacement image and merges the current language into the existing `legend` array before re-serializing; for images with no file change → only updates `legend` (merging in the current language); for entirely new image rows (no prior `id`) → creates a new `CmsImage` record as in Add mode.
  - On successful save → shows a success message, returns to the Concierge list (CMS-018, action `concierges`).
  - On save error → shows an error message, remains on the page (Edit mode returns to `editConcierges/:id`; Add mode returns to an empty `editConcierges`).
- **Reset:** returns the form to its default state (HTML reset, no server call).

## Navigation
- Accessed from: CMS-018 (Concierge Showcase, action `concierges`) — "Add New" button (adds new, without `id`) or "Edit" link on a given row (with `id`).
- Navigates to: after Save (whether successful or in error) always returns to CMS-018 (Concierge Showcase, action `concierges`), except that an error in Edit/Add mode may remain on the CMS-019 screen itself.
