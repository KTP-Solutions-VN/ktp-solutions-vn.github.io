# GST-009 — Restaurant Profile

**Type:** Full page
**Route:** `Guest::restaurant($restaurant_id = null)` — default `/guest/restaurant/:restaurant_id`; pretty route (DashedRoute fallback): `/guest/restaurant`
**Module:** Guest Hub

## Overview
The detail page for a single restaurant: images, address, map, rating, description, menu, opening hours, and contact phone number. Opened from the restaurant list GST-008 via a full-page link (not a popup/modal).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Restaurant images (carousel) | `Restaurant.restaurant_image[].image` | Image (Bootstrap carousel) | No | Multiple images; the first image is active by default |
| 2 | Restaurant logo | `Restaurant.logo` | Image | No | |
| 3 | Restaurant name | `Restaurant.name` | Display text | No | |
| 4 | Address | `Restaurant.address` | Display text | No | |
| 5 | Map link | `Restaurant.google_map_link` | Link (opens in new tab) | No | |
| 6 | Rating | `Restaurant.rating` | 1–5 star scale (half-star supported) | No | |
| 7 | Description | `Restaurant.description` | Display text/HTML | No | |
| 8 | Menu link | `Restaurant.food_menu_link` | Link (opens in new tab) | No | |
| 9 | Opening hours | `Restaurant.hours` | Display text | No | |
| 10 | Phone number | `Restaurant.phone_number` | `tel:` link | No | Only displayed when a value is present |

## Functions / Actions
- Clicking **"Location"** → opens Google Maps in a new tab.
- Clicking **"Food Menu"** → opens the menu link in a new tab.
- Clicking the **phone number** → places a direct call (`tel:`).
- **Home** icon → navigates according to `home_redirect`.

## Navigation
- There is no direct link back to GST-008 on this page (use the browser's back button or the Home icon).
- Home icon → GST-002/GST-004 depending on `home_redirect`.
