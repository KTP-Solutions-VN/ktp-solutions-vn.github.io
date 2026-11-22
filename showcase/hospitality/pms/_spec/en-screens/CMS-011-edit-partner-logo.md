# CMS-011 — Edit Partner Badge

**Type:** Full page

**Route:** `CmsController::logoEdit($id)` — default `/cms/logo-edit/:id`

**Module:** Web Publishing

## Overview
Form for editing an existing partner logo. Requires a valid `id` (if `id` is empty, the action does not process the form / does not set any data).

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text (defaults to the current data value) | Yes | |
| 2 | Image | `image` | Image upload | No | If no new image is selected, the existing image is retained |
| 3 | Link | `link` | Text (defaults to the current value) | Yes | |

## Functions / Actions
- **Save:** updates the `CmsLogo` record. On success → redirects to CMS-009 (`logos`); on failure → redirects back to this same form (`logo-edit/:id`).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-009 ("Edit" button on a given row).
- Navigates to: back to CMS-009 after Save.
