# CMS-032 — Dining Picks

**Type:** Full page

**Route:** `CmsController::guestPortal()` — default `/cms/guest-portal`

**Module:** Web Publishing

## Overview
List of restaurants displayed on the Guest Hub, filtered by the Business Unit/Zone the logged-in user is authorized for. From here, restaurants can be added, edited, or deleted.

## Detailed Description

List (data table, id `zero_config` — uses a client-side DataTable supporting search/sort; there is no URL-based pagination, all data matching the filter condition is loaded and then paginated client-side via the DataTable):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Logo | `Restaurant.logo` | 100x100 thumbnail image; shows the default `no-image.gif` image if no logo has been set |
| 2 | Business Unit | `BusinessUnit.name` | Retrieved via `contain(['BusinessUnit'])` |
| 3 | Restaurant Name | `Restaurant.name` | |
| 4 | Actions | — | Edit / Delete buttons |

Default sort order: by restaurant name ascending (`Restaurant.name ASC`).

Filter: "Business Unit" dropdown (`business_unit` — GET), defaulting to the Business Unit/Zone the user is authorized for (`_getAuthBasedBuVilla`); an additional "All" option is available (value = 0). Changing the selection automatically submits the filter form (GET, id `filter_form`) and saves the selected business unit to a cookie.

## Functions / Actions
- **Select Business Unit (filter):** filters the restaurant list by the selected Business Unit/Zone (or all business units if "All" is selected).
- **Add new ("+ Add New" button at the top of the table):** links to `CmsController::restaurants()` (no tab/id passed) → opens CMS-033 on the "Restaurant" tab, in Add mode.
- **Edit (pencil icon on each row):** links to `CmsController::restaurants('restaurant', $id)` → opens CMS-033 on the "Restaurant" tab, in Edit mode, pre-loaded with the restaurant's data.
- **Delete (trash-can icon on each row):** opens a confirmation popup (Bootstrap modal) showing the name of the restaurant to be deleted; clicking "Save" in the popup navigates the browser (JS `window.location.href`) to `deleteRestaurant($id)` (id base64-encoded) — this action has NO dedicated route/view; it deletes the restaurant (`Restaurant`) and all related banner images in `RestaurantImage` (including deleting the physical files under `webroot/files/restaurants/`), logs an access record, then redirects back to CMS-032 with a success/failure Flash message (`something_went_wrong_text` on deletion failure, `data_not_found_text` if the restaurant is not found).

## Navigation
- Accessed from: the Settings menu (active_menu = 182).
- Navigates to: CMS-033 (Dining Pick Editor) when clicking "+ Add New" or the Edit icon.
