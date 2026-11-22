# BOOK-098 — Knowledge Articles

**Type:** Full page

**Route:** Booking/faqQuestion (default: `/booking/faq-question`)

**Friendly route:** no dedicated route found in config/Routes.php (uses the default route)

**Module:** Reservations

## Overview

A list of frequently asked questions (FAQ) used as an internal knowledge base, filterable by language and business unit, with visibility governed by the business units assigned to each question (business_unit_ids) and the business units the current user is permitted to view.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | language | Select | Yes | Defaults to id = 1 (English); stored in the `language_id` cookie |
| 2 | Business Unit | business_unit | Select ("All" + list of BUs) | Yes | Stored in the `business_unit_id` cookie |

**List (table), sorted by Category then Question:**

| # | Displayed Column | Field Code | Notes |
|---|---|---|---|
| 1 | No | — | |
| 2 | FAQ Category | faq_category.name | |
| 3 | Language | language_id | |
| 4 | Question | question | |
| 5 | Created Date | created_at | |
| 6 | Actions | — | View / Edit / Delete |

## Functions / Actions

- "Add New" button → BOOK-099 (faq, add new).
- View question details → BOOK-100 (viewFaq).
- Edit question → BOOK-099 (faq, edit mode).
- Delete question (along with all related answers in the FaqAnswer table) → confirm, then submit with `action = delete`.
- "Search" button applies the language/BU filters.

## Navigation

- Accessed from the Knowledge menu.
- → BOOK-099 when adding a new question or editing.
- → BOOK-100 when viewing details.
- Displayed categories are sourced from BOOK-097 (Knowledge Topics).
