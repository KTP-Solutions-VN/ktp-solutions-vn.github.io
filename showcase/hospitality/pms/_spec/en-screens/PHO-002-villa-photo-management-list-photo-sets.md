# PHO-002 — Photo Albums

**Type:** Full page

**Route:** `PhotosController::index()` — default `/photos/index` (or `/photos/`)

**Module:** Photo Library

## Overview
The landing page of the Photo Library module: lists all villas according to Business Unit permissions, displays the existing photo set(s) for each villa, quality score, agent link status, allows quick search/filtering, and provides system-wide consolidated KPIs.

## Detailed Description

KPI (status strip): Properties (total number of villas), OTA ready (number of villas with an OTA photo set), No agent link (number of villas without an agent link), Average score (average score).

List (card format, not a traditional table):
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property (thumbnail + villa name) | `villa.name`, `thumbnail` | Click opens PHO-006 (property) |
| 2 | Available sets | `sets` | List of buttons to quickly open each photo set (OTA/High-res/Extras/...), linking to PHO-007 (detail) |
| 3 | Score | `score` | Color-coded by threshold: green ≥2.5, yellow ≥2, red <2 |
| 4 | Agent link | `has_agent_link`, `agent_link` | Copy button (if a link exists) or Create (if not) |
| 5 | Quick actions | - | Download OTA set, Open (opens the photo set or property page), Upload (opens the property page with an upload anchor) |

Filters/search:
- Business Unit/Zone: `id` dropdown (saved to cookie when changed).
- Quick filter: `quick_filter` = All properties / OTA ready / No agent link.
- Text search: `q` (by villa name).
- Pagination: `page`, `per_page` (10/25/50/100, default 25).

## Functions / Actions
- **Filter by Business Unit/Zone**, **Quick filter**, **Search by name**, **Change rows per page (per_page)**, **Change page**.
- **Open property** (click card): navigates to PHO-006.
- **Open a specific photo set** (click set button): navigates to PHO-007 (detail) by `set_type`.
- **Download OTA photo set**: downloads the file (action `download`, no dedicated view).
- **Copy/Create agent link**: copies the photo-sharing link for the agent (data is pre-fetched, no new screen is opened).
- **Quick upload**: opens PHO-006 scrolled to the upload area.

## Navigation
- Accessed from: the Photo Library menu (active_menu = 185) — this is the root screen of the Photo Library module.
- Navigates to: PHO-006 (property), PHO-007 (detail).
