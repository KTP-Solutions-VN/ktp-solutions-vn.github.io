# CMS-014 — Aggregator Destinations

**Type:** Full page

**Route:** `CmsController::destinationGlobal()` — default `/cms/destination-global`

**Module:** Web Publishing

## Overview
List of all destinations (`District`, together with Country/Region) similar to CMS-012, but used for editing destination content within the scope of the "Guest Collection" (the aggregated website, not tied to a specific villa) — the edited data is stored in the `GuestCollectionDestination` model. No server-side pagination.

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

Default sort order: Country → Region → District (ascending). No server-side filter/search, no server-side pagination.

## Functions / Actions
- **Edit:** navigates to CMS-015 (`/cms/destination-global-edit/:district_id`) to edit the destination introduction content/images within the Guest Collection.

## Navigation
- Accessed from: CMS-005 (Shared Content Blocks, "Aggregator Destinations" button).
- Navigates to: CMS-015 (edit destination content — Guest Collection).
