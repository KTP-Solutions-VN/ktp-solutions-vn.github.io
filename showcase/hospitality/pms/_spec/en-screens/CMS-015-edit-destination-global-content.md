# CMS-015 — Aggregator Destination Editor

**Type:** Full page

**Route:** `CmsController::destinationGlobalEdit($district_id)` — default `/cms/destination-global-edit/:district_id`

**Module:** Web Publishing

## Overview
Form for editing destination introduction content (`district_id`) within the scope of the Guest Collection (the aggregated website). Data is stored in the `GuestCollectionDestination` model — one record per district, consisting of a heading, an image, and a multilingual description. Requires a valid `district_id`.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text, `readonly` | — | Displays the District name, not editable (`$title = $district['name']`) |
| 2 | Language | `language` | Dropdown (`Language`) | Yes | Changing the language reloads the `text` content for that language (via JS) |
| 3 | Heading | `heading` | Text | Yes | Not multilingual |
| 4 | Description content | `text` | Textarea | Yes | Multilingual — `serialize([lang => text])` |
| 5 | Image | `image` | Image upload | No | Recommended ratio 3:1, < 1MB. **Note:** in the flow for updating an existing record, the code always re-reads the old image (`$image = $data_array['image']`) after upload, so changing the image when editing an existing record is effectively not saved (it only applies on creation) |

## Functions / Actions
- **Select language:** reloads the corresponding `text` content (client-side).
- **Save:** saves/updates the `GuestCollectionDestination` record for the given `district_id`. On success → redirects to CMS-014 (`destinationGlobal`); on failure → redirects back to this same form (`destinationGlobalEdit/:district_id`).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-014 ("Edit" button on a given District row).
- Navigates to: back to CMS-014 after Save.
