# BOOK-033 — Check-in Progress

**Type:** Full page (opened following BOOK-032)
**Route:** Booking/checkinProgress/:id/:date/:villa_id (default: `/booking/checkin-progress/:id/:date/:villa_id`)
**Module:** Booking

## Overview
A screen for tracking the real-time progress of the check-in process at a villa, allowing staff to Cancel or Finish the check-in process.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Latitude | `lat` | Hidden | - | Device GPS |
| 2 | Longitude | `lon` | Hidden | - | Device GPS |
| 3 | Control record ID | `id` | Hidden | - | |

## Functions / Actions
- **Cancel** button — cancels the check-in process currently in progress
- **Finish** button — completes the check-in process and records the result in BOOK-029

## Navigation
- Opened from: BOOK-032 (Check-in)
- Navigates to: the result is recorded in BOOK-029 (Check-in Control) / BOOK-029-P1
