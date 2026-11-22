# SET-002-P3 — Delete Owner Hub URL

**Type:** Popup (opened from SET-002, Owner Hub URL tab)

**Route:** Bootstrap Modal `#exampleModal` within element `technical-settings/owner_portal_url.ctp`; confirmation navigates to `SettingController::deleteOwnerPortalUrl($id)` — `/setting/delete-owner-portal-url/:id` (id is `base64_encode`/`btoa` encoded when passed in the URL).

**Module:** SET = Platform Settings

## Overview
A confirmation popup shown before deleting an Owner Hub URL (not applicable to the default URL — the delete button is hidden for the row with `is_default = 1`).

## Detailed Description

| # | Component | Notes |
|---|---|---|
| 1 | Popup title | "Delete Owner Hub URL : {title}" — the name of the selected URL |
| 2 | Warning content | Notifies that any Business Unit currently assigned to this URL will automatically fall back to the default URL after deletion |

## Functions / Actions
- **Delete:** navigates the browser to `deleteOwnerPortalUrl/{id}` (base64) → the server deletes the `OwnerPortalUrl` record and all related `OwnerPortalUrlAccess` records, logs the activity, shows a flash message, and redirects back to SET-002 (Owner Hub URL tab).
- **Cancel:** closes the modal without performing any action.

## Navigation
- Opened from: SET-002 (Owner Hub URL tab) — "Delete" (trash) icon on each non-default URL row.
- After deletion: returns to SET-002 (Owner Hub URL tab); the deleted URL row disappears; Business Units previously assigned to that URL fall back to the scope of the default URL.
