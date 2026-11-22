# CMS-013 — Destination Guide Editor

**Type:** Full page

**Route:** `CmsController::destinationEdit($district_id)` — default `/cms/destination-edit/:district_id`

**Module:** Web Publishing

## Overview
Form for managing an image gallery introducing a destination (`district_id`), where each image has a multilingual caption (legend). Data is stored in the `CmsDestination` model (destination information) and `CmsImage` (tag = `Destination`) for each image in the gallery. Requires a valid `district_id` — if empty, the action does not set variables / does not render the form content.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text, `readonly` | — | Display only, not editable |
| 2 | Language | `language` | Dropdown (`Language`) | Yes | Changing the language reloads the captions (`legend`) of all images for that language (via JS) |
| 3 | Image (repeated over multiple rows) | `image[]` | Image upload (multiple rows, "Add More"/"Remove") | First row required | Recommended ratio 3:2, < 1MB per image |
| 4 | Image caption (repeated per image) | `legend.` (array indexed by image position) | Text | First row required | Multilingual — each image has its own `legend` stored as `serialize([lang => text])` |
| 5 | Hidden image ID (when editing) | `id[]` | Hidden | — | Used to identify which images are kept/deleted on submission |

The image gallery is pre-loaded from `CmsImage` (condition `tag = 'Destination'`, `villa_id = <id of the CmsDestination record>`), sorted by `sort`.

## Functions / Actions
- **Add More:** adds a new image + caption row to the form (client-side, not yet saved to the database).
- **Remove (minus icon):** removes an image row from the current form (client-side; if the image already exists in the DB and is removed from the `id[]` list on submission, it will be deleted from `CmsImage` on Save).
- **Select language:** reloads the caption fields (`legend-N`) for the selected language (client-side).
- **Save:** for each image row — if the image is present in the submitted `id[]` list, it is updated (a new image is uploaded if a file was selected; `legend` is always updated for the selected language); existing images no longer in `id[]` are deleted from `CmsImage`; new image rows (no existing `id`) are created. On success → redirects to CMS-012 (`destination`); on failure → redirects back to this same form (`destinationEdit/:district_id`).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-012 ("Edit" button on a given District row).
- Navigates to: back to CMS-012 after Save.
