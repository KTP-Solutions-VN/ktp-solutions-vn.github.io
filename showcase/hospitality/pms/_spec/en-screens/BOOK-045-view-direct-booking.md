# BOOK-045 — Stay Request Details

**Type:** Popup (opened from BOOK-042)
**Route:** Booking/viewDirectBooking/:id (default: `/booking/view-direct-booking/:id`)
**Module:** Reservations

## Overview
Popup displaying (read-only) details of a direct booking request, including approval/rejection information.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `property` | Text (readonly) | - | |
| 2 | Check-in/Check-out Date | `check_in_date`/`check_out_date` | Text (readonly) | - | |
| 3 | Number of Nights | `nights` | Text (readonly) | - | |
| 4 | Guest Name (First/Last) | `first_name`/`family_name` | Text (readonly) | - | |
| 5 | Contact | `contact` | Text (readonly) | - | |
| 6 | Number of Guests | `guests` | Text (readonly) | - | |
| 7 | Type | `type` | Text (readonly) | - | |
| 8 | Amount / Paid | `amount`/`paid` | Text (readonly) | - | |
| 9 | Special Conditions | `special_conditions` | Text (readonly) | - | |
| 10 | Requested By / Date | `requested_text`/`on_text` | Text (readonly) | - | |
| 11 | Status | `status` (Approved/Rejected) | Text (readonly) | - | |
| 12 | Reason (if rejected) | `reason` | Text (readonly) | - | |

## Functions / Actions
- View only, no editing

## Navigation
- Opened from: BOOK-042 (Direct Stay Requests) — View button
- Closing the popup returns to BOOK-042
