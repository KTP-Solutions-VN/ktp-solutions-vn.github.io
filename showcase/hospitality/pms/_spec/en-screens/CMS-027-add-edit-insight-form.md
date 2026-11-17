# CMS-027 — Add/Edit Insight Form

**Type:** Full page

**Route:** `CmsController::insightsEdit($id)` — default `/cms/insights-edit/:id`

**Module:** Website Content (CMS)

## Overview
Form for adding a new or editing an existing "Insight" article: title, content per language, an illustrative image, and a list of linked destinations (Global Destinations). No `$id` → add mode (page title "Add"); `$id` present → edit mode (page title "Edit").

## Detailed Description

Field table (form):

| # | Field | Field Code | Input Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes (`required`, client-side) | Not multilingual — a single shared value is used |
| 2 | Language | `language` | Dropdown (`Language.language_code` → `Language.name`, sorted by name) | Yes | Selects the language currently being entered for the Text field; changing the dropdown triggers JS to reload the corresponding language's Text content from the `destination` variable (already-loaded data), without reloading the page |
| 3 | Text | `text` | Textarea | Yes | Multilingual content, stored as a PHP `serialize()` array `[language_code => text]` in the `text` column |
| 4 | Global Destinations | `guest_collection_destination_ids[]` | Checkbox list (source: `GuestCollectionDestination.title`) | Yes (minimum 1, maximum 3 — JS validation `required` + `maxlength: 3`) | Stored as a `serialize()` array of selected IDs |
| 5 | Image | `image` (file) | Image upload with preview | Not required again when editing (existing image is retained if no new file is selected) | Files over 5MB are blocked client-side (size read via `FileReader`); the server uses `_imageUpload($request_data['image'], 'CmsLogo', 'villas')`; UI note: "Photo must be less than 1MB in size and respect the 3:2 ratio" |

When editing (`$id` is not null), existing data is loaded and the `text` and `guest_collection_destination_ids` columns are `unserialize()`d to populate the form.

`title` is not multilingual — only `text` is a multilingual field (keyed by `language`).

## Functions / Actions
- **Save:** submits the form (POST). Server-side processing:
  - When editing (`$id != null`): merges the new `text` content into the correct language key (preserving content for other languages), uploads a new image if a file was selected, calls `_saveData('GuestCollectionInsight', ...)`. On success → Flash success, redirect to CMS-026 (`action => insights`). On error → Flash error, redirect back to CMS-027 with `$id`.
  - When adding (`$id == null`): creates `text` with only the currently selected language, saves as new. On success → Flash success, redirect to CMS-026. On error → Flash error, redirect back to CMS-027 (no id).
- **Reset:** form reset button (client-side, no server call).
- **Changing the Language dropdown:** JS automatically switches the Text field's content to the language already present in the data (no data loss for other languages, no submission).

## Navigation
- Accessed from: CMS-026 (the "Add New" button or the "Edit" link on each row).
- Navigates to: returns to CMS-026 after Save (success or error).
- Related: the breadcrumb on the page links back to Settings and Common Texts/Insights (CMS-026); Insight articles created/edited here are used as the selection source for the "Insights" tab in CMS-023 (villa collection tabs) and the AJAX action `updateInsightAjax()` — there is no direct back-and-forth navigation, but both share the same `GuestCollectionInsight` data table.
