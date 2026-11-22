# PHO-003 — Shared Space Albums

**Type:** Full page

**Route:** `PhotosController::commonAreas()` — clean route `/photos/common-areas` (explicitly declared in `config/Routes.php`)

**Module:** Photo Library

## Overview
A list of residences that have common area photo sets (common area — photos shared across multiple villas/units within the same residence area), similar to PHO-002 but at the Residence level instead of the Villa level.

## Detailed Description

KPI: Residences (total number of residences with photos), OTA ready (number of residences with an OTA set).

List (card format):
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Residence (thumbnail + name + area) | `residence.name`, `district` | Click opens PHO-004 |
| 2 | Available sets | `sets` | Buttons to quickly open each photo set, linking to PHO-005 (residenceDetail) |
| 3 | Quick actions | - | Open (PHO-004), Upload (PHO-004 with anchor) |

Filters: Business Unit/Zone (`id`), Quick filter (All residences/OTA ready), search `q` (residence name/district/code), pagination `page`/`per_page`.

Warning: if the common-area storage table has not been migrated (`storageReady = false`), a warning banner is displayed, blocking uploads.

## Functions / Actions
- **Filter/search/pagination** as in PHO-002.
- **Open residence**: navigates to PHO-004.
- **Open a specific photo set**: navigates to PHO-005.
- **Quick upload**: opens PHO-004 with an anchor to the upload area.

## Navigation
- Accessed from: the Photo Library menu ("Shared Spaces" tab in the module's internal navigation tab bar, at the same level as PHO-002 "Photo Albums" and PHO-008 "Requirements").
- Navigates to: PHO-004 (residence), PHO-005 (residenceDetail).
