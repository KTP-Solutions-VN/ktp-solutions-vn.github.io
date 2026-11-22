# CMS-033 — Dining Pick Editor

**Type:** Full page

**Route:** `CmsController::restaurants($tab, $restaurant_id)` — default `/cms/restaurants/:tab/:restaurant_id`

**Module:** Web Publishing

## Overview
Form for adding a new or editing an existing restaurant displayed on the Guest Hub, using a single shared action for both Add (no `restaurant_id` passed) and Edit (`restaurant_id` present). The screen has 2 tabs: **Restaurant** (general restaurant information) and **Image** (restaurant scroll/banner images). The Image tab is only accessible once the restaurant has been saved for the first time (i.e., once `restaurant_id` exists).

## Detailed Description

Tab-based interface (Bootstrap nav-tabs); the `$tab` parameter determines the active tab (`restaurant` by default, or `image`); the **Image** tab is disabled (not clickable) when no `restaurant_id` exists yet.

### Tab: Restaurant (general information) — element `cms/restaurant.ctp`

Field table (form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Dropdown (select2, BU list based on user permissions) | Not marked required in the HTML | Defaults to the record's existing BU; the empty option is disabled |
| 2 | Restaurant Name | `name` | Text | Yes (`required`) | |
| 3 | Logo | `logo` (+ hidden `cropped_logo`) | Image upload + client-side crop (canvas) | No | Clicking the current logo image opens the file picker; JS checks the image ratio, and if it deviates from 1:1 (10% tolerance) it automatically square-crops the image via canvas before saving it into `cropped_logo`; limited to 1.2MB; images are stored under `files/restaurants/` |
| 4 | Address | `address` | Text | Yes (`required`) | While typing, JS calls the Google Geocoding API to automatically retrieve coordinates, setting them into the 2 hidden fields `latitude`/`longitude` |
| 5 | Latitude / Longitude | `latitude`, `longitude` | Hidden | No | Automatically set via JS when the address is entered; not shown to the user |
| 6 | Google Map Link | `google_map_link` | Text | Yes (`required`) | |
| 7 | Rating (Review) | `rating` | Number, max 5 | Yes (`required`) | |
| 8 | Description | `description` | Textarea (WYSIWYG TinyMCE) | Yes (`required`) | Every `<textarea>` on the page is initialized with TinyMCE |
| 9 | Food Menu Link | `food_menu_link` | Text | Yes (`required`) | |
| 10 | Hours | `hours` | Text | Yes (`required`) | Freely entered as text; there is no dedicated time control |
| 11 | Phone Number | `phone_number` | Text | Yes (`required`) | |

### Tab: Image (scroll/banner images) — element `cms/restaurant_image.ctp`

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Scroll Image | `file` (multiple) | Multi-image upload (plugin `bootstrap-fileinput`) | At least 1 image (`minFilesNum: 1`) | Accepts jpg/png/gif, max 5MB per image, max 20 images; images require a 21:9 ratio — JS automatically center-crops the image if the ratio deviates, before upload; each image is uploaded immediately (AJAX) upon selection, with no shared Save button for this tab |

Note: the Image tab operates entirely via AJAX (fileinput plugin), and does not submit through the page's main form.

## Functions / Actions
- **Switch tab (Restaurant / Image):** switches tabs via JS (no page reload), also updating the URL (`history.replaceState`) to reflect the selected tab; the Image tab is locked if the restaurant has not yet been saved for the first time.
- **Select/change Logo:** upon selecting an image, JS checks and automatically square-crops it to 1:1 if needed before submission.
- **Save (Restaurant tab):** submits the entire form (multipart) back to the `restaurants` action with `tab = restaurant`. If a cropped image (`cropped_logo`) is present it is saved; otherwise the raw uploaded `logo` file is used; if no new image is selected, the existing logo is kept unchanged. On completion, a success/failure Flash message is shown and the page redirects back to CMS-033 itself with the newly saved `restaurant_id` (keeping the same tab).
- **Cancel (Restaurant tab):** returns to CMS-032 (Dining Picks) without saving.
- **Upload scroll image (Image tab):** each selected image is automatically submitted via AJAX POST to `CmsController::saveRestaurantBannerImage()` (no dedicated clean route, no separate screen) — the image file is saved under `files/restaurants/`, a `RestaurantImage` record is created and linked to the `restaurant_id`, and JSON is returned so the fileinput plugin can update the thumbnail list.
- **Delete scroll image (X button on each thumbnail, Image tab):** AJAX POST to `CmsController::deleteRestaurantBannerImage($id)` (no dedicated clean route, no separate screen) — deletes the `RestaurantImage` record and its corresponding physical file.

## Navigation
- Accessed from: CMS-032 (the "+ Add New" button or the Edit icon on each restaurant row).
- Navigates to: back to CMS-033 itself (on the tab just used) after successfully saving restaurant information; the Cancel button navigates back to CMS-032.
