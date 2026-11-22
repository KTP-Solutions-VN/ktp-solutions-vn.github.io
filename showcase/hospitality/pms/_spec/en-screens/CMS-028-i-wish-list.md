# CMS-028 — Experience Wishlist

**Type:** Full page

**Route:** `CmsController::iWish($action, $id)` — default `/cms/i-wish/:action/:id`

**Module:** Web Publishing

## Overview
List screen for "Experience Wishlist" items (global guest-experience wish/suggestion content, not tied to a specific villa) under the CMS's Shared Content Blocks section. From here, items can be added, edited, or deleted.

## Detailed Description

List (data table):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | (computed, incrementing variable `$i`) | |
| 2 | Title | `GuestCollectionIwish.title` | |
| 3 | Actions | — | 2 buttons: Edit, Delete |

Data is fetched in full (`find('all')`, no conditions, no sorting, no pagination, no filter) from the `GuestCollectionIwish` table.

## Functions / Actions
- **Add New:** "Add New" button (`<a href="i-wish-edit">`) → opens CMS-029 (add mode).
- **Edit (per row):** link `action => i-wish-edit, $id` → opens CMS-029 (edit mode) for the corresponding item.
- **Delete (per row):** link `action => i-wish, delete, $id` → calls back into the `iWish` action with `$action='delete'`, `$id`; the controller deletes the record (`_deleteData('GuestCollectionIwish', 'id', $id)`), shows a success/error Flash message, then redirects back to this same list screen.

## Navigation
- Accessed from: Settings menu → Shared Content Blocks (`CmsController::commonText`), the "Experience Wishlist" button/link.
- Navigates to: CMS-029 (Wishlist Item Editor).
- Related: the "Wishlist" tab in the property CMS collection tabs screen (CMS-023, `plugins/VillaManagement/src/Template/Cms/collection_tabs.ctp`) displays this list of global I Wish items as On/Off toggles for enabling/disabling assignment to a specific villa — that tab uses a separate element (`Element/cms/i_wish.ctp`) and the AJAX action `CmsController::addIwish()` (table `GuestIwish`, linking `guest_collection_iwish_id` ↔ `guest_collection_website_id`) to save the on/off state, not this screen's `iWish` action — only the underlying `GuestCollectionIwish` data is shared.
