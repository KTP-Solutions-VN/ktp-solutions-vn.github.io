# GST-004 — Amenities Access Portal

**Type:** Full page
**Route:** `Guest::accessPortal($booking_id = null)` — default `/guest/access-portal/:booking_id`; pretty route (DashedRoute fallback): `/guest/access-portal`
**Module:** Guest Portal

## Overview
A central hub page containing 4 navigation icons leading to the amenity function groups available to guests currently in residence: My Booking, Restaurants, Activities, Landmarks. Unlocked once the guest has confirmed both arrival/departure times at GST-003, or the system forces a redirect here when the guest account has no valid booking (`total_booking == 0`, checked in `beforeFilter`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | "My Booking" icon | Link → `Guest::bookings` | Link icon | No | Image `Booking-Icon.jpg` |
| 2 | "Restaurants" icon | Link → `Guest::restaurants($villa_id)` | Link icon | No | Image `Restaurant2-Icon.jpg`; `villa_id` taken from the booking currently in view |
| 3 | "Activities" icon | Link → `Guest::activities($booking_id)` | Link icon | No | Image `Activities-Icon.jpg` |
| 4 | "Landmarks" icon | Link → `Guest::landmark($booking_id)` | Link icon | No | Image `Landmark-Icon.jpg` |

If the `booking_id` passed in is invalid/no matching `Booking` is found, the system automatically redirects to GST-002.

## Functions / Actions
- Clicking each icon opens the corresponding sub-screen.
- **Home** icon → navigates according to `home_redirect`.
- **Logout** icon → logs out, returns to GST-001.

## Navigation
- → GST-002 (My Booking), or automatically when `booking_id` is invalid
- → GST-008 (Restaurant List)
- → GST-011 (Activities)
- → GST-010 (Featured Landmarks)
- → GST-001 (logout)
