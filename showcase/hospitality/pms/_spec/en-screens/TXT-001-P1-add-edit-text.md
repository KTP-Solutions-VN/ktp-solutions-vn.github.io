# TXT-001-P1 — Add/Edit Text

**Type:** Popup (opened from TXT-001)

**Route:** Static modal within `index.ctp` (`#texts-editor-modal`); saves via AJAX `TextsController::saveText()` — `POST /texts/save-text`

**Module:** Texts

## Overview
A form for composing text content for a Content Element, applied either to a specific property/unit/residence (direct context) or as a reusable text (Shared/Profile) applied to multiple Business Units.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Content Element | `content_element_id` | Select/grouped selection by scope | Yes | Shows only elements assigned to the corresponding scope |
| 2 | Language | `language_id` | Select | Yes | List of languages configured for the relevant country |
| 3 | OTA requirements | — | Informational select | No | Shown only for property/unit/residence scope |
| 4 | Title | `title` | Text (shown only for reusable Shared/Profile text) | Yes (if Shared/Profile) | Maximum 255 characters |
| 5 | Content | `content` | Textarea | Yes | Character limit per the Content Element's `max_length` |
| 6 | Applicable Business Unit | `business_unit_ids[]` | Multi-select popover checklist | Yes (if Shared/Profile) | Shown only for reusable text |
| 7 | Assign reusable text (assignment) | `assignment_text_ids[]` | Multi-select | No | Shown only on the Property/Unit/Residence tabs, to attach existing Shared/Profile text |
| 8 | Content per other language (translation_contents) | `translation_contents[lang_id]` | Textarea per language | Yes if it is reusable text applied to multiple languages | |

## Functions / Actions
- **Save changes:** validates content length and language validity by country, saves the `OtaTexts` + `OtaTextTranslations` records, syncs `OtaTextBusinessUnits` or `OtaTextAssignments` depending on type, shows a toast, and refreshes the table on TXT-001.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: the "New text" button or the edit icon on data rows in TXT-001.
- After saving: closes the modal, refreshes TXT-001 data.
