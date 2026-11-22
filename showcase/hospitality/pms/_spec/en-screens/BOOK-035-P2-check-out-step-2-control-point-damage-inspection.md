# BOOK-035-P2 — On-site Check-out · Step 2: Damage Check

**Type:** Popup (step 2 of the check-out process, opened from BOOK-035)
**Route:** Booking/checkOutStep2/:check_out_id (default: `/booking/check-out-step2/:check_out_id`)
**Module:** Reservations

## Overview
A step for inspecting each villa control point at check-out, recording any damage (issue) that occurred along with a description, the responsible party, the compensation amount, and photos of the condition found.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Check-out ID | `check_out_id` | Hidden | - | |
| 2 | Villa control point ID | `villa_control_id` | Hidden | - | |
| 3 | Whether damage occurred | `issue` | Hidden (Yes/No, defaults to No) | - | Updated via selection on the UI |
| 4 | Responsible party | `issued_to` | Hidden (defaults to None) | - | |
| 5 | Damage description | `issue_description` | Hidden/Textarea | - | |
| 6 | Compensation payment tracking | `issue_payment_track` | Hidden (defaults to None) | - | |
| 7 | Compensation amount | `issue_amount` | Hidden | - | |
| 8 | Amount paid | `amount_paid` | Hidden | - | |
| 9 | Condition photo | `cropped_image` | File/Canvas (capture and crop image) | No | |

## Functions / Actions
- Mark each control point as: passed / damaged
- Enter the damage description, responsible party, compensation amount/amount paid
- Capture and attach a photo of the villa's condition
- Continue button to proceed to Step 3

## Navigation
- Opened from: BOOK-035 (On-site Check-out)
- Navigates to: BOOK-035-P3 (Step 3: Guest Rating)
