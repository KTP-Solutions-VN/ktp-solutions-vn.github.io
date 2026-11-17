# CMS-001 — CMS Property List

**Type:** Full page

**Route:** `CmsController::list($id)` — default `/cms/list/:id`

**Module:** Website Content (CMS)

## Overview
Screen for selecting a villa to enter and edit the content displayed on the villa's homepage/website (CMS). The villa list is filtered according to the logged-in user's Business Unit/Zone permissions, and shows only villas that are open (`status = Open`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Villa Name | `Villa.name` | |
| 2 | Status | `Villa.status` | Always "Open" due to the hard-coded filter condition |
| 3 | Villa Type | `villa_type_id` | Mapped to the name from the `VillaType` table |
| 4 | Owner | `Owner.family_name` | |
| 5 | Area | `area_id` | Mapped to the name from the `Area` table (retrieved via `VillaLocation`) |

Default sort order: Villa Type → Area → Villa Name (ascending, using `array_multisort`).

Filter: dropdown for selecting the Business Unit/Zone (`id` — GET/POST parameter); upon selection, the business unit is saved to a cookie and the corresponding villa/area list is reloaded according to the user's permissions (`_getAuthBasedBuVilla`).

## Functions / Actions
- **Select Business Unit/Zone:** re-filters the villa list according to the selected BU.
- **Select villa (click row/villa name):** opens screen CMS-002 (Welcome tab by default) for that villa.

## Navigation
- Accessed from: main menu ("Properties"/CMS item, active_menu = 18).
- Navigates to: CMS-002 (main CMS screen for the villa, Welcome tab by default).
