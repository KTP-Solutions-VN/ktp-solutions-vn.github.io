# SET-004-P3 — Mapped Account In-Use Warning

**Type:** Popup (opened from SET-004)

**Route:** Bootstrap Modal `#warnModal` within `hostex_setup.ctp`; handled entirely client-side (JavaScript), does not call any controller action.

**Module:** SET = Platform Settings

## Overview
A warning popup shown when the user clicks Delete on a Hostex account that is still linked to at least one property — preventing deletion to avoid losing booking/property data linkage.

## Detailed Description

| # | Component | Notes |
|---|---|---|
| 1 | Popup title | "Note" |
| 2 | Warning content | "Cannot delete: {count} properties still use this account." |

## Functions / Actions
- **Cancel:** closes the popup without performing any action (there is no delete-confirmation button in this popup).

## Navigation
- Opened from: SET-004 — "Delete" icon on an account row with `props > 0` (replaces SET-004-P2 in this case).
- Does not navigate further; the user must unlink the properties from the account before it can be deleted.
