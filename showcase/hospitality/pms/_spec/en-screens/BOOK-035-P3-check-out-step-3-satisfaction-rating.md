# BOOK-035-P3 — On-site Check-out · Step 3: Guest Rating

**Type:** Popup (step 3 of the check-out process, opened from BOOK-035-P2)
**Route:** Booking/checkOutStep3/:check_out_id (default: `/booking/check-out-step3/:check_out_id`)
**Module:** Reservations

## Overview
A step for recording the guest's satisfaction rating at check-out (star rating scale) along with a review, and confirming the GPS location where the task was performed.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Check-out ID | `check_out_id` | Hidden | - | |
| 2 | Rating score | `ratings` | Hidden (defaults to 5) | - | Selected via a star-rating UI |
| 3 | Review | `review` | Hidden/Textarea | - | |
| 4 | Toggle flag | `is_toggle` | Hidden (defaults to no) | - | |
| 5 | Latitude/Longitude | `lat`, `lon` | Hidden | - | Device GPS |

## Functions / Actions
- Select the number of stars for the guest satisfaction rating
- Enter a review
- Continue button to proceed to Step 4

## Navigation
- Opened from: BOOK-035-P2 (On-site Check-out · Step 2: Damage Check)
- Navigates to: BOOK-035-P4 (Step 4: Wrap-up)
