# BOOK-061 — Booking Confirmation Template Translations

**Type:** Full page (opened from BOOK-057)
**Route:** Booking/transalateConfirmationTemplate
**Friendly route:** `/booking/confirmation-template/transalations`
**Module:** Booking

## Overview
Manages translations of the fixed text labels displayed on the booking confirmation PDF, per language (excluding the default English).

## Detailed Description

### Translation Table
| # | Column | Notes |
|---|---|---|
| 1 | Original Text (English) | `text`/`label` |
| 2 | Dynamic column per language | One column per language, editable inline |
| 3 | Edit/Delete | Edit or delete the translation for the row |
| 4 | Add New | Add a new text string to be translated |

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language_code` | Select | Yes | Select the language to enter translations for |

## Functions / Actions
- Edit the translated content per row (inline edit)
- Delete the translation for a language (`deleteTranslation`)
- Add a new text string to be translated (`add_new`)
- Save all translations

## Navigation
- Opened from: BOOK-057 > "Translation" button
- Navigates to: back to BOOK-057
