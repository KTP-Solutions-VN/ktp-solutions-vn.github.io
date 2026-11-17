# CMS-030 — Arrival Content List (guest arrival guidance for villas)

**Type:** Full page

**Route:** `CmsController::arrival($action, $id)` — default `/cms/arrival` (list); delete uses `/cms/arrival/delete/:id`

**Module:** Website Content (CMS)

## Overview
List of "Arrival" content records — a group of guidance/information content for guests arriving at a villa (airport, harbour/pier, car rental, other transfer methods, check-in, stay), displayed on the website. The same `arrival` action handles both displaying the list and deleting a record (when the parameters `$action = 'delete'` and `$id` are present).

## Detailed Description

List (data table, id `zero_config` — uses a client-side DataTable supporting search/sort/pagination):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | Sequential number, computed client-side (`$i`) |
| 2 | Title | `CmsArrival.title` | |
| 3 | Actions | — | Edit / Delete buttons |

Data is fetched in full (`find('all')`, no server-side filter/pagination conditions) from the `CmsArrival` table.

## Functions / Actions
- **Add new ("+ Arrival" button at the top of the table):** links to `cms-arrival` (no `id` passed) → opens CMS-031 in Add mode.
- **Edit (on each row):** links to `CmsController::cmsArrival($id)` → opens CMS-031 in Edit mode, pre-loaded with the record's data.
- **Delete (on each row):** links to `CmsController::arrival('delete', $id)` — deletes the `CmsArrival` record directly (no separate confirmation popup; deletion happens immediately on link click), then redirects back to the list with a success/failure Flash message.

## Navigation
- Accessed from: the Settings/Common Texts menu (active_menu = 181).
- Navigates to: CMS-031 (Arrival content add/edit form) when clicking "+ Arrival" or "Edit".
