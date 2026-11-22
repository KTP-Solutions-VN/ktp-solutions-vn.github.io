# BOOK-066 — Pricing Hub

**Type:** Full page
**Route:** Booking/rates (default: `/booking/rates`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Reservations

## Overview
Central navigation hub for the "Rates & Seasons" feature group: it has no data table or filters of its own, only buttons leading to the child rate-management screens (rate status, rate logs, seasons, seasonal rate logs, etc.).

## Detailed Description
The page has no input form or data table. The content consists only of 5 card-style link buttons laid out in a row:

| # | Button Name | Navigates To | Notes |
|---|---|---|---|
| 1 | Status | `rates-status` (action `ratesStatus`) | BOOK-067 |
| 2 | Recommendations | `recommendations` (action `recommendations`) | Outside the scope of the "Rates & Seasons" group (belongs to a separate rate-recommendation group) |
| 3 | Logs | `rates-logs` (action `ratesLogs`) | BOOK-070 |
| 4 | Seasons | action `seasons` | BOOK-073 |
| 5 | Season Logs | action `seasonPriceLogs` | BOOK-074 |

## Functions / Actions
- **Status** button — opens BOOK-067 (Rate Plan Status)
- **Recommendations** button — opens the rate-recommendation screen (outside the scope of this document)
- **Logs** button — opens BOOK-070 (Price Change Notes)
- **Seasons** button — opens BOOK-073 (Season Calendar)
- **Season Logs** button — opens BOOK-074 (Season Price Audit)

## Navigation
- Opened from: Reservations module menu > Pricing Hub
- Navigates to: BOOK-067, BOOK-070, BOOK-073, BOOK-074 (and the Recommendations screen, which is outside the scope of this group)
