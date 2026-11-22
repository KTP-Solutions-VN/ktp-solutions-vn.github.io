# BU-018 — Office Profile

**Type:** Full page (read-only)

**Route:** `BusinessUnitController::viewOffice($id)` — default `/business-unit/view-office/{id}` (id base64-encoded)

**Module:** Operating Units

## Overview
A read-only detail page displaying the information of an office: name, Business Unit, department, address, coordinates, and image.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Office Name | `name` | Static text | — | |
| 2 | Business Unit | `business_unit_id` → `business_unit.name` | Static text | — | |
| 3 | Department | `department_id` (JSON) → role name | Static text | — | Joined by commas |
| 4 | Address | `address` | Static text | — | |
| 5 | Latitude | `latitude` | Static text | — | |
| 6 | Longitude | `longitude` | Static text | — | |
| 7 | Google Maps URL | `map_url` | Link (opens in a new tab) | — | Displays "N/A" if empty |
| 8 | Image | `image` | 250x250 image | — | Defaults to `no-image.gif` if empty |

## Functions / Actions
- No editing action buttons on this page (view only).

## Navigation
- Opened from: BU-015 (Office Locations) — View icon.
