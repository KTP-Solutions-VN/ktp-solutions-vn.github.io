# BOOK-097 — FAQ Categories (Wiki)

**Type:** Full page

**Route:** Booking/faqCategory (default: `/booking/faq-category`)

**Friendly route:** no dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

Manages categories for the internal FAQ/Wiki knowledge base, used to classify questions in BOOK-098. Add/Edit/Delete operations are performed via a popup modal.

## Detailed Description

**List (table):**

| # | Displayed Column | Field Code | Notes |
|---|---|---|---|
| 1 | No | — | |
| 2 | Category Name | name | |
| 3 | Created Date | created_at | Format d M Y H:i |
| 4 | Actions | — | Edit / Delete |

**Add/Edit Form (popup modal):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Category Name | name | Text | Yes | Duplicate name check via AJAX `checkfaqcategory`; auto-generates `slug` from the name (spaces replaced with "-") |

## Functions / Actions

- "Add New" button opens a popup to add a category.
- Edit icon (✏️) opens a popup to edit; Delete icon (🗑) confirms deletion of the category — both submit to the same `faqCategory` action with the `action` field set to add/edit/delete.
- Writes an activity log entry (access log) for each add/edit/delete operation.

## Navigation

- Accessed from the FAQ/Wiki menu.
- Categories are used as a filter/selection option in BOOK-098 (FAQ Question List) and BOOK-099 (Add/Edit FAQ Question).
