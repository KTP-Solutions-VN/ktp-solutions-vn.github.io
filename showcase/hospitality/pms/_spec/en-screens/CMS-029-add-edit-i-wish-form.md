# CMS-029 — Add/Edit I Wish Form

**Type:** Full page

**Route:** `CmsController::iWishEdit($id)` — default `/cms/i-wish-edit/:id`

**Module:** Website Content (CMS)

## Overview
Form for adding a new or editing an existing "I Wish" item: title, two content sections per language, and up to 3 illustrative images. No `$id` → add mode (page title "Add"); `$id` present → edit mode (page title "Edit").

## Detailed Description

Field table (form):

| # | Field | Field Code | Input Type | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes (`required`, client-side) | Not multilingual — a single shared value is used |
| 2 | Language | `language` | Dropdown (`Language.language_code` → `Language.name`, sorted by name) | Yes | Selects the language currently being entered for Text 1/Text 2; changing the dropdown triggers JS to reload the corresponding language's content from the `destination` variable, without reloading the page |
| 3 | Text 1 | `text_1` | Textarea | Yes | Multilingual content, stored as a PHP `serialize()` array `[language_code => text]` in the `text_1` column |
| 4 | Text 2 | `text_2` | Textarea | Yes | Same as Text 1, stored in the `text_2` column |
| 5 | Image | `image_1` (file) | Image upload with preview | Not required again when editing (existing image is retained if no new file is selected) | |
| 6 | Image 2 | `image_2` (file) | Image upload with preview | Not required again when editing | |
| 7 | Image 3 | `image_3` (file) | Image upload with preview | Not required again when editing | |

All 3 images: files over 5MB are blocked client-side; the server uses `_imageUpload($request_data['image_x'], 'CmsLogo', 'villas')` for each image (the server includes `sleep(1)` between successive image 1/2/3 uploads — likely a workaround to avoid filename collisions from timestamps, with no UI impact); UI note: "Photo must be less than 1MB in size and respect the 3:2 ratio".

When editing (`$id` is not null), existing data is loaded and the `text_1` and `text_2` columns are `unserialize()`d to populate the form.

`title` is not multilingual — only `text_1`/`text_2` are multilingual fields (keyed by `language`).

## Functions / Actions
- **Save:** submits the form (POST). Server-side processing:
  - When editing (`$id != null`): merges the new `text_1`/`text_2` content into the correct language key (preserving content for other languages), uploads a new image for any image field with a selected file (keeping the existing image for unchanged fields), calls `_saveData('GuestCollectionIwish', ...)`. On success → Flash success, redirect to CMS-028 (`action => i-wish`). On error → Flash error, redirect to CMS-028 if `$id == null` (does not occur in this branch) or redirect back to CMS-029 with `$id`.
  - When adding (`$id == null`): creates `text_1`/`text_2` with only the currently selected language, saves as new. On success → Flash success, redirect to CMS-028. On error → Flash error, redirect back to CMS-029 (no id).
- **Reset:** form reset button (client-side, no server call).
- **Changing the Language dropdown:** JS automatically switches Text 1/Text 2 content to the language already present in the data (no data loss for other languages, no submission).

## Navigation
- Accessed from: CMS-028 (the "Add New" button or the "Edit" link on each row).
- Navigates to: returns to CMS-028 after Save (success or error).
- Related: the breadcrumb on the page links back to Settings and Common Texts/I Wish (CMS-028); I Wish items created/edited here are used as the source for the On/Off toggle list on the "I Wish" tab of CMS-023 (villa collection tabs) and the AJAX action `addIwish()` — there is no direct back-and-forth navigation, but both share the same `GuestCollectionIwish` data table.
