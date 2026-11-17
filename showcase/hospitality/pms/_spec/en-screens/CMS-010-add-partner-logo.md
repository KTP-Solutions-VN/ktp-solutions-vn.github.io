# CMS-010 — Add Partner Logo

**Type:** Full page

**Route:** `CmsController::logoAdd()` — default `/cms/logo-add`

**Module:** Website Content (CMS)

## Overview
Form for adding a new partner logo consisting of a title, a logo image, and a link URL. No multilingual element.

## Detailed Description

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes | |
| 2 | Image | `image` | Image upload | Yes | Recommended ratio 3:2, < 1MB |
| 3 | Link | `link` | Text | Yes | URL to open when the logo is clicked on the website |

## Functions / Actions
- **Save:** saves the new `CmsLogo` record. On success → redirects to CMS-009 (`logos`); on failure → redirects back to this same form (`logo-add`). Note: if the user does not select an image, the form data cannot be submitted (the condition `if (isset($request_data['image'])...)` wraps the entire save block).
- **Reset:** resets the form (client-side).

## Navigation
- Accessed from: CMS-009 ("Add New" button).
- Navigates to: back to CMS-009 after Save.
