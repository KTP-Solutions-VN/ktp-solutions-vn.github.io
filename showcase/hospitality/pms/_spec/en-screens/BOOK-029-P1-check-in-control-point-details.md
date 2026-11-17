# BOOK-029-P1 — Check-in Control Point Details

**Type:** Popup (opened from BOOK-029)
**Route:** Booking/viewCheckinDetail/:id/:booking_id
**Module:** Booking

## Overview
A popup for viewing the details of a single check-in control run: a log of movement time/location, and a comparison table of Planning versus Actual for each control item.

## Detailed Description
| # | Table | Displayed Columns |
|---|---|---|
| 1 | Location history | Time, Location, Distance |
| 2 | Planning/Actual comparison (1) | Planning, Actual |
| 3 | Planning/Actual comparison (2) | Planning, Actual |

## Functions / Actions
- View the staff member's movement history (time/location/distance) during the control run
- View the Planning vs. Actual comparison for check-in items

## Navigation
- Opened from: BOOK-029 (Check-in Control) — click "Actions" on a villa row
- Closing the popup returns to BOOK-029
