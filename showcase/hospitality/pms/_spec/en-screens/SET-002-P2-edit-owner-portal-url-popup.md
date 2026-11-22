# SET-002-P2 — Edit Owner Hub URL

**Type:** Popup (opened from SET-002, Owner Hub URL tab)

**Route:** Bootstrap Modal `#editModal` within element `technical-settings/owner_portal_url.ctp`; retrieves data via AJAX GET `SettingController::getEditOwnerPortalUrl($id)` (`/setting/get-edit-owner-portal-url/:id`); submits via AJAX POST to `SettingController::generalSettings()` (`tab=owner-portal-url`, including `id`); duplicate URL check via `checkOwnerPortalUrlDuplicate()` — `/setting/check-owner-portal-url-duplicate`.

**Module:** SET = Platform Settings

## Overview
A popup for editing an existing Owner Hub URL's information (title, URL, applicable scope by Country/Region/Business Unit). For the default URL record (`is_default = 1`), only the URL can be edited — the Title field is locked (readonly) and the Region/Business Unit selection section is not shown, since the default URL automatically applies to any region not claimed by another URL.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes | Readonly if this is the default URL (`is_default=1`) |
| 2 | Owner Hub URL | `url` | URL | Yes | Validates proper URL format; duplicate check via AJAX `checkOwnerPortalUrlDuplicate` (excluding the record currently being edited) |
| 3 | Applicable Regions | `region_ids[]` | Multi-select checkbox, grouped by Country | Yes (if not the default URL) | This entire block is hidden if it is the default URL; regions already assigned to this URL are pre-checked |
| 4 | Applicable Business Units | `business_unit_ids[]` | Multi-select checkbox within the sub-panel of each selected Region | Yes (if not the default URL) | BUs belonging to this URL are always enabled and pre-checked; BUs assigned to another URL are disabled and marked "Already assigned to another URL" |
| 5 | Select all available / Clear | — | Quick-action buttons | — | Applies only to regions/BUs that are not locked |

Data loaded into the form when the popup opens (via `getEditOwnerPortalUrl`): `id`, `title`, `url`, `is_default`, `region_ids` (currently assigned regions), `business_unit_ids` (currently assigned BUs), `other_assigned_business_unit_ids` (BUs claimed by another URL, used to disable them).

## Functions / Actions
- **Save:** sends AJAX request to update `OwnerPortalUrl` and rewrite all `OwnerPortalUrlAccess` records (delete old, recreate based on the new selection) if this is not the default URL; closes the modal and reloads the page on success.
- **Cancel:** closes the modal and resets all selections.

## Navigation
- Opened from: SET-002 (Owner Hub URL tab) — "Edit" (pencil) icon on each URL row.
- After saving: reloads SET-002 (Owner Hub URL tab); the URL row's data is updated.
