# PHO-006 — Property Photo Page (Villa)

**Type:** Full page

**Route:** `PhotosController::property($villaId)` — default route `/photos/property/:id` (no pretty route declared in `config/Routes.php`)

**Module:** Photos

## Overview
The landing page for managing photos of a villa/property: panoramic photo (hero banner), 3 overview metrics (number of photo sets, OTA score, most recent shoot date), a form to upload a new photo set, a list of cards for existing photo sets (OTA/High Res/Extras/Owner's set/Raw-Temporary/Archive), and a block for the common-area photos of the residence containing the villa (if applicable).

## Detailed Description

Panoramic photo (hero):
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Current panoramic photo | `photoRow['panoramic_thumbnail']` | Background image | - | Placeholder shown if no photo exists |
| 2 | Upload panoramic photo | `panoramic_photo[]` (+ hidden `upload_mode=panoramic`, `set_type=panoramic`, `source`, `shoot_date`, `photo_shoot_id`) | Upload 1 JPG file | Yes (when Upload is clicked) | Recommended size 2100x900; submits automatically once a file is selected |

3 overview metrics:
| # | Field Label | Field Code | Notes |
|---|---|---|---|
| 1 | Total sets | Count of `photoRow['sets']` (excluding panoramic) | Number of existing photo sets |
| 2 | OTA score | `photoRow['score']` | Shows "-" if no score yet |
| 3 | Last shoot | `lastShoot` | Date/name of the most recent shoot |

"Upload a new photo set" form:
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Set type | `set_type` | Dropdown | Yes | OTA / High Res / Extras / Owner's set / Raw-Temporary / Archive |
| 2 | Source | `source` | Dropdown | Yes | Photographer delivery / Internal team / Owner provided (`AppConstants::$photoSources`) |
| 3 | Shoot date | `shoot_date` | Date picker | Yes (hidden when source = Internal team/Owner provided) | |
| 4 | Photo shoot reference | `photo_shoot_id` | Dropdown (`photoShootOptions`) | Required when source = Photographer delivery | List of shoots for the villa |
| 5 | Photos | `photos[]` | Drag-and-drop or multi-file JPG selection | Yes | Limit messaging varies by set type (e.g. OTA up to 1MB/photo, 2100x1400; High Res up to 3MB, 3:2 ratio, etc.) |

List of existing photo sets (cards); each card includes: icon by set type, set name, requirement (`set['required']`), photo count, score, file size (`size`), and 3 action buttons (Open/Download/Delete).

"Residence Common Areas" block (if the villa belongs to a residence with common-area photos): residence name, "Residence page" button, and a list of quick-open buttons for each common-area photo set.

## Functions / Actions
- **Upload panoramic photo**: select a file → form submits automatically (mode `panoramic`).
- **Upload new photo set**: choose set type/source/shoot date/shoot reference, drag-and-drop or select multiple photos, click Upload (or Remove All to clear the selection before submitting).
- **Open** a photo set: navigates to PHO-007 (`detail`) by `set_type`.
- **Download** a photo set: downloads the file (`download`, AJAX/file — no dedicated view).
- **Delete** a photo set: opens a confirmation modal, submits to the `detail` action with `action=delete` (shown only if `canDeletePhotoSet`).
- **Open Residence page** containing the villa's common areas (if applicable).
- **Quick-open common-area photo set** of the residence: navigates to PHO-005 (`residenceDetail`).
- **Navigation tabs**: Photo Sets (PHO-002), Common Areas (PHO-003), Settings (PHO-008).

## Navigation
- Accessed from: PHO-002 (clicking a villa or the Upload icon in the list).
- Navigates to: PHO-007 (Open photo set), PHO-005 (quick-open residence common-area photo set), PHO-004 (Residence page), PHO-002 (Photo Sets tab), PHO-003 (Common Areas tab), PHO-008 (Settings tab).
