# SET-002-P1 — Add Owner Portal URL Popup

**Type:** Popup (opened from SET-002, Owner Portal URL tab)

**Route:** Bootstrap Modal `#addUrlModal` within element `technical-settings/owner_portal_url.ctp`; submits via AJAX POST to `SettingController::generalSettings()` (`tab=owner-portal-url`); duplicate URL check via `checkOwnerPortalUrlDuplicate()` — `/setting/check-owner-portal-url-duplicate`.

**Module:** SET = System Settings

## Overview
A popup for adding a new Owner Portal URL and assigning its applicable scope by Country/Region/Business Unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes | |
| 2 | Owner Portal URL | `url` | URL | Yes | Validates proper URL format; duplicate check via AJAX `checkOwnerPortalUrlDuplicate` |
| 3 | Applicable Regions | `region_ids[]` | Multi-select checkbox, grouped by Country (Greece, France, Thailand) | Yes (at least 1 region with a BU) | Regions with no Business Unit are disabled |
| 4 | Applicable Business Units | `business_unit_ids[]` | Multi-select checkbox within the sub-panel of each selected Region | Yes (at least 1 BU per region) | A BU already assigned to another URL (not the default URL) is disabled and marked "Already assigned" |
| 5 | Select all available / Clear | — | Quick-action buttons | — |

## Functions / Actions
- **Save:** sends AJAX request to create a new `OwnerPortalUrl` plus the corresponding `OwnerPortalUrlAccess` records (country_id, region_id, business_unit_id); closes the modal and reloads the page on success.
- **Cancel:** closes the modal.

## Navigation
- Opened from: SET-002 (Owner Portal URL tab) — "+ ADD URL" button.
- After saving: reloads SET-002 (Owner Portal URL tab); the list is updated with the new row.
