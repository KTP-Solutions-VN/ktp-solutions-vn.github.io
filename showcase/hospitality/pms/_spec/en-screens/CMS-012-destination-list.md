# CMS-012 — Destination List

**Type:** Full page

**Route:** `CmsController::destination($action, $id)` — default `/cms/destination/:action/:id`

**Module:** Website Content (CMS)

## Overview
List of all destinations (districts — `District`, together with Country/Region) for selecting one to edit its destination introduction content displayed on the website. No server-side pagination (retrieves the entire result set via `District->find('all')`).

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed client-side) | |
| 2 | Country | `Country.name` | |
| 3 | Region | `Region.name` | |
| 4 | District | `District.name` | |
| 5 | Created Date | `District.created_at` | Format `d M Y H:i` |
| 6 | Action | — | Edit button |

Default sort order: Country → Region → District (ascending). No server-side filter/search, no server-side pagination, and no add/delete buttons (the source list is the existing `District` table; no new district is created here).

Note: the `$action`/`$id` route parameters are not used in the controller's logic (no delete handling exists) — these are 2 leftover parameters on the route with no practical effect in the current action.

## Functions / Actions
- **Edit:** navigates to CMS-013 (`/cms/destination-edit/:district_id`) to edit the introduction content/images for that destination (district).

## Navigation
- Accessed from: CMS-005 (Common Text, "Destination" button).
- Navigates to: CMS-013 (edit destination content by villa/district).
