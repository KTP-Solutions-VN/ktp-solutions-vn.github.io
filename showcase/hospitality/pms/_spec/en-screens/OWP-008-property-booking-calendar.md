# OWP-008 — Occupancy Calendar

**Type:** Full page

**Route:** `ExternalUserController::calendar($villa_id)` — no dedicated friendly route, opened from OWP-005 (calendar icon), of the form `.../calendar/{villa_id_base64}`

**Module:** Owner Hub

## Overview

A booking calendar in grid form, by day, for a specific property or all properties, showing bookings within a selected date range. Data is loaded via AJAX (`getVillaBookingDetail`).

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date range | date_range | Date range picker | Yes | |
| 2 | Property | villa | Select2 | Yes | Includes an "All" option |

List/calendar — displayed as a grid of day x property, each cell representing a booking (guest name, color-coded status: Cancelled/Confirmed/New/Request/Black).

## Functions / Actions

- Filter by property and date range
- Click a booking cell for a quick view of the details (popup, shares OWP-010-P1)

## Navigation

- Accessed from OWP-005 (calendar icon on each property row)
- Click a booking cell → OWP-010-P1 (booking quick-view popup)
