# GST-008 — Dining Nearby

**Type:** Full page
**Route:** `Guest::restaurants($villa_id = null)` — default `/guest/restaurants/:villa_id`; pretty route (DashedRoute fallback): `/guest/restaurants`
**Module:** Guest Hub

## Overview
A list of restaurants located within a 200m radius of the coordinates of the villa the guest is staying at, belonging to the same business unit as the villa.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Restaurant logo | `Restaurant.logo` | Image | No | Defaults to `default.jpg` if no logo is available |
| 2 | Restaurant name | `Restaurant.name` | Display text | No | |
| 3 | (Distance calculation — not displayed) | `Restaurant.latitude` / `Restaurant.longitude` compared against `VillaLocation.lat/lng` | Internal | No | Only restaurants with a distance ≤ 200m are listed (function `_getDistance`) |

## Functions / Actions
- Clicking a restaurant card → opens GST-009 (Restaurant Profile) for that `restaurant_id`.
- **Home** icon → navigates according to `home_redirect`.
- **Logout** icon → logs out, returns to GST-001.

## Navigation
- → GST-009 (Restaurant Profile)
- → GST-001 (logout)
