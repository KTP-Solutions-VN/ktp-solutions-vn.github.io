# PROP-042 — Instant Book Settings

**Type:** Full page
**Route:** property/booking-restriction
**Module:** PROP = Property Records

## Overview
Page listing Properties (Open status) together with their current booking type (Instant Booking / Non-Instant Booking), filterable by Business Unit and booking type. Allows quickly toggling Instant Booking mode directly on the list; data is stored in the `VillaBookingType` table.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 (includes "All" option) | Yes (class `required`) | Changing value → reloads with `business_unit_id` query, saved to cookie |
| 2 | Booking Type | `booking_type` | Select2 (All/Instant booking/Non-Instant Booking) | Yes | Changing value → reloads with `booking_type` query |

### Displayed Columns
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No | — | Text | — | Row number |
| 2 | Property | `villa.name` | Text | — | Via Villa contain |
| 3 | Status | `villa.status` | Text | — | |
| 4 | Advance Booking | `booking_type` | Toggle icon (on/off) | — | "toggle-on" icon when = Instant Booking, otherwise "toggle-off" |
| 5 | Action | — | Icon button | — | Edit icon → opens the "OTA Management" tab of the Property page (Property code not yet split) |

## Functions / Actions
- Changing Business Unit/Booking Type → reloads the list per the filter conditions.
- Clicking the toggle icon on a Property row → calls AJAX `updateBookingRestriction` to switch `booking_type` between "Instant Booking" and "Non-Instant Booking", updates the icon in place, shows a flash message.
- Edit icon → navigates to `property/villa/ota management/{villa_id}` (the "OTA Management" tab of the Villa Detail screen).

## Navigation
- Opened from: Property Records menu (outside the scope of the current code).
- Navigates to: `property/villa/ota management/:villa_id` (OTA Management tab of the `villa` action, outside the scope of documented codes).
- Child popup: None.
