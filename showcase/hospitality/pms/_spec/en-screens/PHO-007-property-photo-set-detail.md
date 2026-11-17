# PHO-007 — Property Photo Set Detail (Villa)

**Type:** Full page

**Route:** `PhotosController::detail($villaId, $setType = 'ota')` — default route `/photos/detail/:id/:set_type` (no pretty route declared); shares the `detail.ctp` view with PHO-005 but is called with the default context (`$isResidence` empty/false), so the Quality Score and Completeness Against Standard panels are fully displayed.

**Module:** Photos

## Overview
Displays the detail of a photo set (by `set_type`) for a villa/property: a photo grid with tags (Essential/Bird view/AI/Night), overview KPIs, quality scoring across 3 criteria, a completeness comparison table against the standard (PHO-008), the ability to upload more photos into the set, view/download/delete individual photos, and delete the entire set.

## Detailed Description

| # | Field / Column Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Switch photo set (dropdown to change set) | `packOptions` | Dropdown + Load button | Quick navigation between set types of the same villa |
| 2 | Common Areas (if the villa belongs to a residence) | `commonAreaResidence` | Link button | Navigates to PHO-004 |
| 3 | Property Page | - | Link button | Returns to PHO-006 |
| 4 | Agent Link | `photoRow['has_agent_link']`, `photoRow['agent_link']` | Link button (if available) or "not available" button | Opens the photo-sharing link for agents, or navigates to the OTA management screen if no link exists yet |
| 5 | KPI: Photos in pack / Essential shots / Score / Missing / AI & Night | `packStats` | Overview metrics | The "Score" and "Missing" KPIs only appear at the property level (hidden at residence level) |
| 6 | Photo grid | `photoCards` | Grid; each photo has a selection checkbox, status tags, and file name | Tags: Essential/Bird view (Drone)/AI/Night; filterable by category when set = OTA |
| 7 | Category filter (OTA set only) | `photoCategories` | Dropdown filter | |
| 8 | Upload more photos into the set | `photos[]` (+ hidden `set_type`, `source=Internal Team`, `preserve_set_metadata=1`) | Multi-file upload | Preserves the existing set's metadata |
| 9 | Quality Score | `qualityScores` | 3 criteria cards, each scored 1–3 (`updateQualityScore`, AJAX) | Final Score = average of the 3 criteria |
| 10 | Flag Guide | - | Legend table for 4 tag types | Essential/Bird view/AI/Night |
| 11 | Completeness Against Standard | `completenessRows` | Table: Category/Flag, Required, Current, Progress (% bar) | Compared against the standard configured in PHO-008 by villa type and number of bedrooms |
| 12 | Delete entire photo set | hidden `action=delete` | Hidden submit via confirmation modal (shared with PHO-006) | Shown only if `canDeletePhotoSet`; returns to PHO-006 after deletion |

## Functions / Actions
- **Switch photo set (Load)**: changes `set_type` to view another set of the villa.
- **Select multiple photos** (checkbox), **bulk tagging** (Essential/Bird view/AI/Night — `updateTags`, AJAX), **bulk delete** (`deletePhotos`, AJAX — no dedicated view).
- **Filter by category** (OTA set only).
- **View photo** (preview modal, navigate previous/next), **Download photo** (`downloadPhoto`, AJAX/file — no dedicated view), **Delete photo** (`deletePhoto`, AJAX — shown only if `canDeletePhotoSet`).
- **Upload more photos into the current set**.
- **Score quality by criterion** (1–3 points, `updateQualityScore`, AJAX, updates the Final Score in real time).
- **Delete entire photo set** — returns to PHO-006 after deletion.
- **Property Page / Common Areas / Agent Link**: quick navigation.

## Navigation
- Accessed from: PHO-006 (Open button on a photo set card), PHO-002 (quick link to the OTA set).
- Navigates to: PHO-006 (Property Page, after deleting a photo set), PHO-004 (Common Areas of the residence containing the villa), OTA management screen (when no Agent Link exists yet, part of another module).
