# PHO-005 — Common Area Photo Set Detail (Residence)

**Type:** Full page

**Route:** `PhotosController::residenceDetail($residenceId, $setType = 'ota')` — clean route `/photos/residence/:id/:set_type` (explicitly declared); shares the `detail.ctp` view with PHO-007 but is called explicitly via `$this->render('detail')` with `$isResidence = true` (hides some panels, e.g. Quality Score/Completeness, compared to PHO-007).

**Module:** Photos

## Overview
Displays the detail of a photo set (by `set_type`, e.g. OTA/High Res) belonging to the common area of a residence: photo grid, flags (Essential/Bird view/AI/Night), uploading more photos to the set, and viewing/downloading/deleting individual photos.

## Detailed Description

| # | Field/Column Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Switch to another set (set-switch dropdown) | `packOptions` | Dropdown + Load button | Quick navigation between set types of the same residence |
| 2 | Photo grid | `photoCards` | Grid, each photo has a selection checkbox, status flags, file name | Flags: Essential/Bird view (Drone)/AI/Night |
| 3 | Upload more photos to the set | `photos[]` (+ hidden `set_type`, `source`, `preserve_set_metadata=1`) | Multiple file upload | Preserves the existing photo set metadata |

No Quality Score / Completeness Against Standard panel (this applies only to villa properties in PHO-007).

## Functions / Actions
- **Switch photo set (Load)**: changes `set_type` to view another set of the residence.
- **Select multiple photos** (checkbox) for bulk actions (delete — uses the `deletePhotos` action, AJAX, no dedicated view).
- **View photo** (preview), **Download photo** (`downloadPhoto`, AJAX/file download — no dedicated view), **Delete photo** (`deletePhoto`, AJAX — displayed only if the user has permission to delete the photo set, `canDeletePhotoSet`).
- **Upload more photos to the current set**.
- **Delete the entire photo set** (`action=delete` hidden submit) — returns to PHO-004 after deletion.
- **Common Areas / Residence Page**: returns to PHO-003/PHO-004.

## Navigation
- Accessed from: PHO-004 (selecting a set) or PHO-003 (quick-open set button).
- Navigates to: PHO-004 (Residence Page), PHO-003 (Common Areas).
