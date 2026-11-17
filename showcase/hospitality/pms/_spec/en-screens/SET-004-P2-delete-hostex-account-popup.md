# SET-004-P2 — Delete Hostex Account Popup

**Type:** Popup (opened from SET-004)

**Route:** Bootstrap Modal `#exampleModal` within `hostex_setup.ctp`; confirmation sends AJAX POST to `deleteHostexAccount()` — `/setting/delete-hostex-account`.

**Module:** SET = System Settings

## Overview
A confirmation popup shown before deleting a Hostex account, displayed only when that account is not linked to any property (`props = 0`); if it is still linked to properties, the system shows SET-004-P3 instead of this popup.

## Detailed Description

| # | Component | Notes |
|---|---|---|
| 1 | Popup title | "Delete Account: {email}" |
| 2 | Confirmation content | Notice confirming the account deletion |

## Functions / Actions
- **Delete:** sends AJAX POST `deleteHostexAccount` (including `id`) → deletes the `HostexAccount` record, logs the activity, shows a flash message, reloads the page on success.
- **Cancel:** closes the modal without performing any action.

## Navigation
- Opened from: SET-004 — "Delete" icon on an account row with no linked properties.
- After deletion: reloads SET-004; the deleted account row disappears from the corresponding channel table.
