# CMS-007 — New Book-Direct Benefit

**Type:** Full page

**Route:** `CmsController::whyUsAdd()` — default `/cms/why-us-add`

**Module:** Web Publishing

## Overview
Form for adding a new "Why Us" item consisting of a title, an illustrative image, and a multilingual short description.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes | Not multilingual |
| 2 | Image | `image` | Image upload | Yes | Recommended ratio 3:2, < 1MB |
| 3 | Language | `language` | Dropdown (`Language`) | Yes | Selects the language for the `short_text` content about to be entered |
| 4 | Short description | `short_text` | Textarea | Yes | Multilingual — stored as `serialize([lang => text])` |

## Functions / Actions
- **Save:** saves the new `CmsWhyUs` record. On success → redirects to CMS-006 (`why-us`); on failure → redirects back to this same form (`why-us-add`).
- **Reset:** resets the form to its default values (client-side).

## Navigation
- Accessed from: CMS-006 ("Add New" button).
- Navigates to: back to CMS-006 after Save.
