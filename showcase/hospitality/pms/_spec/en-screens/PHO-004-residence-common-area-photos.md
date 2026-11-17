# PHO-004 — Residence Common Area Photos

**Type:** Full page

**Route:** `PhotosController::residence($residenceId)` — clean route `/photos/residence/:id` (explicitly declared in `config/Routes.php`)

**Module:** Photos

## Overview
The detail page for a single residence: displays the existing common area photo sets (OTA/High Res/Extras/Raw-Temporary) and a form for uploading new photos for that residence.

## Detailed Description

Upload form:
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Set type | `set_type` | Dropdown | Yes | OTA / High Res / Extras / Raw-Temporary |
| 2 | Source | `source` | Hidden (default Internal Team) | - | |
| 3 | Photos | `photos[]` | Multiple file upload (drag-and-drop or select) | Yes | JPG only, maximum 1MB/photo, dimensions 2100x1400, named according to the standard naming convention |

Area displaying the existing photo sets: a card for each `set type` (OTA/High Res/Extras/Raw-Temporary), each card showing the photo count and a button to open the detail view (navigates to PHO-005).

## Functions / Actions
- **Upload new photos**: select set type, drag-and-drop/select JPG files, click Upload; if the request is AJAX, returns JSON, otherwise redirects back to the page with a Flash message.
- **Remove All** (before uploading): removes the selected files from the client-side queue.
- **Open a specific photo set**: navigates to PHO-005 by `set_type`.
- **Common Areas**: returns to PHO-003.

## Navigation
- Accessed from: PHO-003 (click residence or the Upload button).
- Navigates to: PHO-005 (residenceDetail), PHO-003 (commonAreas).
