# CMS-025 — Themed Site Snippet Editor

**Type:** Full page

**Route:** `CmsController::editCollectionCommonText($id)` — default `/cms/edit-collection-common-text/:id`

**Module:** Web Publishing

## Overview
Form for adding a new or editing an existing common text record (`CollectionTranslation`), shared for both the Add action (no `id` passed, page title "Add") and the Edit action (`id` present, page title "Edit"). Each record is tied to one fixed `type` and one specific language — **this is multilingual, but in a "one record = one language" style** (unlike the other tabs of CMS-023, which store multiple languages serialized into a single field); to obtain a translation for another language, a new record must be created with the same `type` and `title` but a different `language`.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown (`Language`) | Yes (per standard client-side validation) | Defaults to `en` when adding new; when editing, loads the language of the record being edited |
| 2 | Type | `type` | Dropdown, fixed list defined in code | Yes | 5 values: `book_with_confidence` → "Book With Confidence", `terms_&_condition` → "Terms & Condition", `guarantee` → "Guarantee", `why_work_with_us` → "Why Work with Us", `personal_data_policy` → "Personal Data Policy" |
| 3 | Title | `title` | Text | Yes | Saved to the DB with spaces replaced by `_` (`str_replace(' ', '_', $title)`) — used as the display key (value) in the text-selection dropdowns on the Footer tab of CMS-023 |
| 4 | Content | `text` | Textarea | Yes | The text content |

When editing: data is loaded from `CollectionTranslation.find(['id' => $id])`.

## Functions / Actions
- **Save:** saves the `CollectionTranslation` record (creates a new one if no `id`, updates if `id` is present). On save, returns to CMS-024 (the list) with a success/error flash message.
- **Cancel/Reset (if present):** goes back or resets the form — following the general pattern of forms in this module (client-side).

## Navigation
- Accessed from: CMS-024 (the "Add New" button or the "Edit" link on each list row).
- Navigates to: returns to CMS-024 after Save succeeds or fails. Data created/edited here serves as the source for the text-selection dropdowns on the Footer tab of CMS-023.
