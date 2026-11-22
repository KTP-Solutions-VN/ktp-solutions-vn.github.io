# CMS-031 — Getting-There Guide Editor

**Type:** Full page

**Route:** `CmsController::cmsArrival($id)` — default `/cms/cms-arrival/:id`

**Module:** Web Publishing

## Overview
Form for adding a new or editing an existing Arrival content record, using a single shared action for both Add (no `id` passed) and Edit (`id` present). Each record consists of one title (not multilingual) and 6 multilingual text blocks (airport, harbour/pier, car rental, other transfer, check-in description, stay description).

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language` | Dropdown (`Language`, key = `language_code`) | Yes | Selects the language currently being edited; changing the language automatically repopulates (via JS) the 6 textareas with the corresponding language's content if it exists, without submitting the form |
| 2 | Title | `title` | Text | Yes | Not multilingual, shared across all languages |
| 3 | Airport content | `airport_text` | Textarea | Yes | Multilingual — stored as `serialize([lang => text])` |
| 4 | Harbour/Pier content | `pier_text` | Textarea | Yes | Multilingual |
| 5 | Car Rental content | `car_rental_text` | Textarea | Yes | Multilingual |
| 6 | Other Transfer content | `other_text` | Textarea | Yes | Multilingual |
| 7 | Check-in description | `check_in_text` | Textarea | Yes | Multilingual |
| 8 | Stay description | `stay_text` | Textarea | Yes | Multilingual |

A green checkmark icon is displayed next to the Save button when all 6 text fields above for the currently selected language already contain data — this is purely a completion indicator, not an input field.

## Functions / Actions
- **Select language:** changing the `language` dropdown repopulates (via JS, using the current record's data pre-rendered as JSON) the 6 textareas with the corresponding language's content if available, without submitting the form.
- **Save:** saves the data. If it is a new record, the 6 text fields are serialized under the currently selected language; if the record already exists, the new language's translation is merged into the existing serialized data (other languages' translations are not lost). Both success and failure trigger a Flash message; on success it redirects to CMS-030, on failure it returns to the previous page (`referer`).
- **Reset:** resets the form to its initial values (client-side).

## Navigation
- Accessed from: CMS-030 (the "+ Arrival" button or "Edit" on each row).
- Navigates to: back to CMS-030 after a successful Save.
