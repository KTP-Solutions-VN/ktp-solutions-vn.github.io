# BOOK-047 — Availability Grid

**Type:** Full page (can be embedded/shared with partners — public widget based on `referer`/`bu`)
**Route:** Booking/availability (default: `/booking/availability`, supports `referer` or `bu`, `district`, `villa_id` query parameters)
**Friendly route:** no dedicated route was found in config/Routes.php for this action (uses the default route)
**Module:** Reservations

## Overview
Page displaying the availability calendar of villas (in a villa x date grid format), which can be filtered by location/district, specific villa, or by partner/agent (via the `referer` parameter to change the displayed brand logo). Used to quickly share room availability status with partners/customers.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Location/Address | `location`/`address` | Select/Text | No | |
| 2 | Business Unit | `bu` | Query param | No | Determines the displayed logo/brand |
| 3 | Partner (Referer) | `referer` | Query param | No | If different from "Azura", displays the Agent's logo |
| 4 | District/Area | `district` | Select | No | |
| 5 | Villa | `villa_id` | Select | No | |

### Display
A villa-by-date grid showing available/booked status, along with the price (`price_text`) for each villa.

## Functions / Actions
- Filter by location/district/villa
- **Filter** button — applies the filters
- **Book** button — proceeds to the booking flow for an available villa
- **Download** button — downloads the availability calendar

## Navigation
- Opened from: Reservations module menu > Availability Grid, or a link shared directly with partners
- Navigates to: the booking flow (BOOK-036/OTA) when clicking Book
