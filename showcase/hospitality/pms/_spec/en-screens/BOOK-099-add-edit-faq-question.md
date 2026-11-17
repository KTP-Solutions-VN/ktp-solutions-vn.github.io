# BOOK-099 — Add / Edit FAQ Question

**Type:** Full page (opened from BOOK-098)

**Route:** Booking/faq/:id? (default: `/booking/faq` when adding, `/booking/faq/:id` when editing)

**Friendly route:** no dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

Form for adding a new FAQ question or editing an existing one along with its answer content, including assigning the question to one or more business units, and selecting a category and language.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Applicable Business Units | business_unit_ids[] | Multi-select checkbox | No | If left empty, applies to "All Business Units" |
| 2 | FAQ Category | faq_category_id | Select | Yes | Sourced from BOOK-097 |
| 3 | Language | language_id | Select | No | |
| 4 | Question | question | Text | Yes | |
| 5 | Answer Content | answer | Rich text/multiple paragraphs (array, stored serialized) | Yes | Stored in a separate FaqAnswer table, linked via `faq_question_id` |

## Functions / Actions

- Save button: if adding — creates FaqQuestion + FaqAnswer records and redirects to BOOK-098; if editing — updates in place and remains on the page.
- Checks for a duplicate question within the same category/language via AJAX `checkfaqquestion` (add mode only).

## Navigation

- Opened from BOOK-098 (Add New / Edit button).
- After saving (add mode) → returns to BOOK-098.
