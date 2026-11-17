# BOOK-036 — Add New Booking

**Type:** Full page
**Route:** Booking/addBooking/:id? (default: `/booking/add-booking`; when an id is provided, it edits a manual booking)
**Module:** Booking

## Overview
Form for quickly creating a manual booking (manual booking) not made through an OTA channel: enter guest information, villa, check-in/check-out dates, booking channel, amount, and payment status.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest First Name | `first_name` | Text | Yes | |
| 2 | Guest Last Name | `last_name` | Text | Yes | |
| 3 | Guest Contact (Phone/Email) | `contact` | Text | Yes | |
| 4 | Villa | `villa_id` | Select (select2) | Yes | Filtered by villas with Open status (status=Open) and the user's business unit permissions |
| 5 | Check-in Date | `check_in_date` | Datepicker | Yes | |
| 6 | Check-out Date | `check_out_date` | Datepicker | Yes | |
| 7 | Booking Channel (Referer) | `referer` | Select | Yes | Azura / Owner... |
| 8 | Booking Amount | `amount` | Number | Yes | |
| 9 | Payment | `payment` | Text/Select | No | |
| 10 | Status | `status` | Select | Yes | |

Note: there is a hidden action `why_here_form_1` used for internal logging/survey purposes, not part of the core business logic.

Technical note: the source code contains actions `step3()`…`step8()` (views step1.ctp, step5.ctp, step6.ctp, step7.ctp, step8.ctp — mostly only a few lines each), which are remnants of an old multi-step wizard flow that no longer appears to be actively linked from the main interface; no separate screen should be created for these steps.

## Functions / Actions
- **Save** button — creates a new manual booking, writing to the ManualBooking/Booking table
- **View Manually Created Booking List** button — opens BOOK-036-P1

## Navigation
- Opened from: Booking module menu > Add Booking
- Navigates to: BOOK-036-P1 (Manual Booking List)
