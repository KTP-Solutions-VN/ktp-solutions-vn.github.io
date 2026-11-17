# BU-006 — Villa Links by Channel

**Type:** Full page

**Route:** `BusinessUnitController::channelVilla($channel_id)` — default `/business-unit/channel-villa/{channel_id}`

**Module:** Business Unit

## Overview
A grid (card) view listing the villas of a business unit, together with the OTA link (ota_link) corresponding to the currently selected channel — used for quickly cross-checking villa links on the OTA channel. Opened in a new tab from BU-005/BU-007.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit Filter | `business_unit` | Select (select2) | No | Changing the value automatically submits a GET form to reload the villa list |

The list is displayed as cards; each card contains:

| # | Content | Field Code | Notes |
|---|---|---|---|
| 1 | Villa thumbnail image | `image` | |
| 2 | Villa name (link) | `name` / `ota_link` | Clicking opens the OTA link in a new tab; if `ota_link` is not set, it is displayed in orange and is not clickable |

## Functions / Actions
- **Select business unit:** re-filters the displayed villa list based on the selected business unit.
- **Click villa name:** opens that villa's OTA link (if available) in a new tab.

## Navigation
- Opened from: BU-005 (Link icon on each channel row), BU-007 (Accounts tab).
- Navigates to: none (standalone page, opened in a new tab).
