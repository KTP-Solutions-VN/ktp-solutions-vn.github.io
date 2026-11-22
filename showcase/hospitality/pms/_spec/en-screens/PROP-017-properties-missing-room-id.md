# PROP-017 — Unmapped Room Codes

**Type:** Full page
**Route:** property/missing-roomids/:id (default dashed-format route; the `$id` parameter is passed via URL but is actually reset to empty by the controller and re-read from `$_REQUEST['id']`)
**Module:** PROP = Property Records

## Overview
Screen listing properties (Villas) in "Open" status that do not yet have a `room_id_1` (no room code configured for OTA/Beds24 sync), filterable by Business Unit. Allows exporting the list to an Excel file.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (dropdown, includes "All" option) | No | Changing the value redirects to `missing-roomids?id=...`; the value is stored in the `property_business_unit_id` cookie |

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `Villa.name` | Text (link) | No (display only) | Link opens `villa/identification/{id}` in a new tab |

Data is retrieved from `Villa` where `status = Open` and `room_id_1 = ''`, further filtered by `business_unit_id` (or by the user's `selected_business` list when "All" is selected).

## Functions / Actions
- "Download List" button (download icon, `name="export"`) — submits a hidden form to export an Excel file (`.xlsx`) with 2 columns: Villa Name, Business Unit. The file is named `-MissingRoomId-{ymd}.xlsx`.
- Changing Business Unit — automatically reloads the page with the selected `id` (JS `window.location.href`).

## Navigation
- Opened from: the Quality screen (PROP-030) — "Room Id" button at the top of the page.
- Navigates to: `villa/identification/{id}` (property detail page, outside the scope of PROP-017..031).
- Child popup: none.
