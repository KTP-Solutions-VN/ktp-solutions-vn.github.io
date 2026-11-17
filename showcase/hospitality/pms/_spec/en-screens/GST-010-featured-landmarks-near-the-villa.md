# GST-010 — Featured Landmarks Near the Villa

**Type:** Full page
**Route:** `Guest::landmark($booking_id = null)` — default `/guest/landmark/:booking_id`; pretty route (DashedRoute fallback): `/guest/landmark`
**Module:** Guest Portal

## Overview
Displays images of notable landmarks/destinations around the district where the guest's villa is located. If `booking_id` is empty, automatically redirects to GST-002.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Villa name | `Booking.villa.name` / `short_name` | Display text | No | Used to compose the area description sentence |
| 2 | District name | `VillaLocation.district.name` | Display text | No | |
| 3 | Landmark images | `CmsDestination` (by `district_id`) → `CmsImage` (tag=`Destination`) | Image list | No | Sorted by `sort ASC`; the link that opened the azurastays.example page has been disabled (commented out) in the code, so the images are currently display-only |

## Functions / Actions
- Images are for viewing only; there is no click-through action on individual images (the external link is commented out in the source code).
- **Home** icon → navigates according to `home_redirect`.
- **Logout** icon → logs out, returns to GST-001.

## Navigation
- → GST-002 (when `booking_id` is invalid)
- → GST-001 (logout)
