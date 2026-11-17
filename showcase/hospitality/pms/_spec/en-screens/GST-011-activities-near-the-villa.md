# GST-011 — Activities Near the Villa

**Type:** Full page
**Route:** `Guest::activities($booking_id = null)` — default `/guest/activities/:booking_id`; pretty route (DashedRoute fallback): `/guest/activities`
**Module:** Guest Portal

## Overview
A page suggesting recreational activities/entertainment around the villa's area. If `booking_id` is empty, automatically redirects to GST-002. **Note:** all booking-based data-retrieval logic in the action (villa name, district, destination images) has been **commented out (disabled)** in the controller — the displayed content is currently static and does not depend on the booking.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Hero image | Static image (hard-coded in the view) | Image | No | `green-season-activities/img2.jpg` |
| 2 | "Fitness & Wellness" link | Static URL `azurastays.example/.../fitness-wellness.html` | External link (opens in new tab) | No | |
| 3 | "Shopping & Entertainment" link | Static URL `azurastays.example/.../shopping-entertainment.html` | External link (opens in new tab) | No | |
| 4 | "Indoor/Outdoor Activities" link | Static URL `azurastays.example/.../indoor-outdoor-activities.html` | External link (opens in new tab) | No | |
| 5 | Rainy-season suggestion paragraph | Static text (hard-coded) | Display text | No | Fixed English content in the view, not yet passed through the `staticText` multilingual mechanism |

## Functions / Actions
- Clicking each image/content block → opens an external link (the azurastays.example site) in a new tab.
- **Home** icon → navigates according to `home_redirect`.

## Navigation
- → GST-002 (when `booking_id` is invalid)
- → External azurastays.example page (outside the scope of the PMS system)
