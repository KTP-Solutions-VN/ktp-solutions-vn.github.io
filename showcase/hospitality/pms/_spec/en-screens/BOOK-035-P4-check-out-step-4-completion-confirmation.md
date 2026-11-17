# BOOK-035-P4 — Check-out — Step 4: Completion Confirmation

**Type:** Popup (final step of the check-out process, opened from BOOK-035-P3)
**Route:** Booking/checkOutStep4/:check_out_id (default: `/booking/check-out-step4/:check_out_id`)
**Module:** Booking

## Overview
The final confirmation step completing the check-out process, re-confirming GPS location before recording completion.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Latitude/Longitude | `lat`, `lon` | Hidden | - | Device GPS coordinates confirming completion |

## Functions / Actions
- Confirm completion button — records the check-out result into BOOK-030 (Check-out Control)

## Navigation
- Opened from: BOOK-035-P3 (Check-out — Step 3)
- Navigates to: result is recorded into BOOK-030 (Check-out Control) / BOOK-030-P1
