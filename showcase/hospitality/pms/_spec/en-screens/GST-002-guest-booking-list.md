# GST-002 — My Reservations

**Type:** Full page
**Route:** `Guest::bookings()` — default `/guest/bookings`; pretty route (DashedRoute fallback): `/guest/bookings`
**Module:** Guest Hub

## Overview
Lists all bookings associated with the `access_code` of the currently logged-in guest, split into "upcoming bookings" and "past bookings". This is the page the guest is redirected to after successfully logging in with the access code at GST-001.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Banner background image | `banner_image` (from `CmsImage` tag=`Main` by `villa_id`) | Background image | No | Taken from the villa of the nearest upcoming booking; defaults to `img2.jpg` if not available |
| 2 | Welcome heading | `staticText.banner_title_23_text` / `banner_title_21_text` | Display text (multilingual) | No | Wording changes based on `guest_booking_count` (single vs. multiple bookings) |
| 3 | Villa image (per booking card) | `Villa.villa_image` (first image) | Image | No | Defaults to `default.jpg` if the villa has no image |
| 4 | Villa name | `Villa.name` | Display text | No | |
| 5 | Check-in date | `Booking.check_in_date` | Display text (format `d M y`) | No | |
| 6 | Check-out date | `Booking.check_out_date` | Display text (format `d M y`, +1 day) | No | |
| 7 | "Past Bookings" label | `staticText.your_past_booking_text` | Display text | No | Only shown when the guest has both upcoming and past bookings |
| 8 | Online check-in completion prompt | `staticText.complete_your_online_check_in_...` | Link text | No | Only shown when there is at least 1 upcoming booking |
| 9 | Total booking count | `guest_booking_count` | Number | No | Used to select the singular/plural banner text |

## Functions / Actions
- Clicking an **upcoming booking** card → opens GST-003 (Trip Details) for that `booking_id`.
- Clicking a **past booking** card → opens GST-004 (Quick Links) for that `booking_id`.
- Clicking the **"Complete your online check-in to unlock..."** link → opens GST-003 with the `booking_id` of the first upcoming booking.
- **Home** icon (top-left of banner) → navigates according to `home_redirect` (defaults to this same page, or GST-004 if the most recent booking already has both arrival/departure times confirmed).
- **Logout** icon (top-right of banner) → logs out, returns to GST-001.

## Navigation
- → GST-003 (upcoming booking)
- → GST-004 (past booking)
- → GST-001 (logout)
