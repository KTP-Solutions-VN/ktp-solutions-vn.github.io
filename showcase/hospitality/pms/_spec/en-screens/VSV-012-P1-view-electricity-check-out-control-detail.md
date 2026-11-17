# VSV-012-P1 — View Electricity Check-out Control Detail

**Type:** Popup (opened from VSV-012, as a separate page)

**Route:** `VillaServicesController::viewCheckOutControl($id)` — `/villa-services/view-checkout-control/<booking_id>`

**Module:** Villa Services — Electricity

## Overview
A read-only detail page combining both check-in and check-out electricity information for a booking: start/end meter readings, meter photos, payment method and amount for each direction, and payment confirmation status.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Check-In Date / Check-Out Date | `booking.check_in_date` / `check_out_date` | Text (read-only) | — | |
| 2 | Guest Name / Channel | `booking.guest`, `booking.referer` | Text (read-only) | — | |
| 3 | Payment Method & Options (check-in) | `check_in_payment_method` | Text (read-only) | — | From `getPaymentMethodString()` with `checkin_rate_type` |
| 4 | Start Meter / Meter Photo (check-in) | `electrical_bill.start_meter/meter_photo` | Text/Image (read-only) | — | Click photo to zoom |
| 5 | Done On / By (check-in) | `electrical_bill.start_date`, `user.usage_name` | Text (read-only) | — | |
| 6 | Payment / Account (check-in) | Calculated from `checkin_rate_type` | Text (read-only) | — | |
| 7 | End Meter / Meter Photo (check-out) | `electrical_bill.end_meter/meter_photo` | Text/Image (read-only) | — | |
| 8 | Done On / By (check-out) | `electrical_bill.end_date`, `check_out_by_user.usage_name` | Text (read-only) | — | |
| 9 | Payment / Account (check-out) | Calculated from `rate_type` | Text (read-only) | — | |
| 10 | Payment Method & Options (check-out) | `check_out_payment_method` | Text (read-only) | — | From `getPaymentMethodString()` with `rate_type` |
| 11 | Reception Confirmed | `electrical_bill.is_amount_received` | Text (read-only) | — | Yes/No |

## Functions / Actions
- Click the meter photo (check-in or check-out) to enlarge it in a modal.
- No save/edit buttons — this is a view-only page.
- If `id` is invalid → shows a "Invalid booking ID." error flash and redirects back to VSV-012.

## Navigation
- Entered from: VSV-012 — "View" button on each booking row.
- Navigates to: back to VSV-012.
