# CMS-008 — Edit Book-Direct Benefit

**Type:** Full page

**Route:** `CmsController::whyUsEdit($id)` — default `/cms/why-us-edit/:id`

**Module:** Web Publishing

## Overview
Form for editing an existing "Why Us" item, allowing updates to the title, image, and adding/editing the short description translation per language. Requires a valid `id` (if `id` is empty, the action does not process the form / does not set any data).

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text (defaults to the current data value) | Yes | Not multilingual |
| 2 | Image | `image` | Image upload | No | If no new image is selected, the existing image is retained; recommended ratio 3:2, < 1MB |
| 3 | Language | `language` | Dropdown (`Language`) | Yes | Changing the language auto-reloads the `short_text` content for that language (via JS) and updates the completion checkmark icon |
| 4 | Short description | `short_text` | Textarea | Yes | Multilingual — the translation for the selected language is merged into the already-serialized data |

The green checkmark icon is displayed when `title`, `image`, and `short_text` (for the currently selected language) all contain data.

## Functions / Actions
- **Select language:** reloads the corresponding `short_text` content (client-side, no submission).
- **Save:** updates the `CmsWhyUs` record. On success → redirects to CMS-006 (`why-us`); on failure → redirects back to this same form (`why-us-edit/:id`).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-006 ("Edit" button on a given row).
- Navigates to: back to CMS-006 after Save.
