# BOOK-064 — Missing Rate Setting

**Type:** Popup/Page (opened from BOOK-027)
**Route:** Booking/missingRateSetting (default: `/booking/missing-rate-setting`)
**Module:** Booking

## Overview
Configures the end date used as the reference point for the "Villas with Missing Rates" screen (BOOK-027) to check whether a villa has fully configured daily rates.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date` | Date picker | Yes | Reference date used to calculate the missing-rate check range (from today through this date) |

## Functions / Actions
- **Save** button — saves the configured date

## Navigation
- Opened from: BOOK-027 (Villas with Missing Rates) > configuration button
- Navigates to: back to BOOK-027
