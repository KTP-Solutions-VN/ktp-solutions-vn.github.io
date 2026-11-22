# BOOK-100 — Knowledge Article

**Type:** Full page / view (opened from BOOK-098)

**Route:** Booking/viewFaq/:id

**Friendly route:** no dedicated route found in config/Routes.php (uses the default route)

**Module:** Reservations

## Overview

Read-only view (all fields `disabled`) of an FAQ question along with its answer and the list of applicable business units.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Applicable Business Units | business_unit_ids | Displayed as tags, joined with "\|" | — | |
| 2 | FAQ Category | faq_category_id | Select (disabled) | — | |
| 3 | Language | language_id | Select (disabled) | — | |
| 4 | Question | question | Text (disabled) | — | |
| 5 | Answer Content | answer | Display (disabled) | — | |

## Functions / Actions

- View only; no save/edit button on this screen (editing is performed via BOOK-099).

## Navigation

- Opened from BOOK-098 (View button on each row).
- No further navigation; use the back button to return to BOOK-098.
