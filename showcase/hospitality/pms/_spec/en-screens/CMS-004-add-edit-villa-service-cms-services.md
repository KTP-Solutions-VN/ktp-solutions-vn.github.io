# CMS-004 — Add/Edit Villa Service (CMS Services)

**Type:** Full page

**Route:** `CmsController::cmsServices($id)` — default `/cms/cms-services/:id`

**Module:** Website Content (CMS)

## Overview
Form for adding or editing villa service content displayed on the website (Concierge, Maintenance, Cleaning, Transport), using a single shared action for both Add (no `id` passed) and Edit (`id` present). Each service group consists of one multilingual text block and one illustrative image.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown (`Language`) | Yes | Selects the language currently being entered; changing the language auto-reloads the corresponding saved text content (via JS, using the pre-rendered `cms_services` data) |
| 2 | Title | `title` | Text | Yes | Not multilingual |
| 3 | Concierge content | `concierge_text` | Textarea | Yes | Multilingual — stored as `serialize([lang => text])` |
| 4 | Concierge image | `concierge_image` | Image upload | No | Image is shared across all languages; recommended size < 5MB |
| 5 | Maintenance content | `maintenance_text` | Textarea | Yes | Multilingual |
| 6 | Maintenance image | `maintenance_image` | Image upload | No | |
| 7 | Cleaning content | `cleaning_text` | Textarea | Yes | Multilingual |
| 8 | Cleaning image | `cleaning_image` | Image upload | No | |
| 9 | Transport content | `transport_text` | Textarea | Yes | Multilingual |
| 10 | Transport image | `transport_image` | Image upload | No | |

A green checkmark icon is displayed next to the Save button when all 4 text contents (concierge/maintenance/cleaning/transport) for the selected language already contain data — this is purely a completion indicator, not an input field.

## Functions / Actions
- **Select language:** changing the `language` dropdown reloads (via JS) the content of the 4 textareas for the corresponding language if it exists, without submitting the form.
- **Save:** saves the data. For a new record, the text values are serialized under the currently selected language; for an existing record, the new language's translation is merged into the already-serialized data. Images are only re-uploaded (overwritten) when the user selects a new file; otherwise the existing image is retained. On save, returns to CMS-003.
- **Reset:** resets the form to its initial values (client-side).

## Navigation
- Accessed from: CMS-003 ("Add New" button or "Edit" on a given row).
- Navigates to: back to CMS-003 after a successful or failed Save.
