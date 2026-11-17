# VSV-011-P1 — View Electricity Check-in Control Detail

**Type:** Popup (opened from VSV-011, as a separate page)

**Route:** `VillaServicesController::viewCheckinControl($id)` — `/villa-services/view-checkin-control/<booking_id>`

**Module:** Villa Services — Electricity

## Overview
A read-only detail page showing the full meter reading/photo, payment method, and check-in payment status for a specific booking, used by staff for reconciliation control purposes.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `booking.villa.name` | Text (read-only) | — | Card title |
| 2 | Check-In Date | `booking.check_in_date` | Text (read-only) | — | Format: d M y |
| 3 | Check-Out Date | `booking.check_out_date` | Text (read-only) | — | |
| 4 | Guest Name | `booking.guest.first_name/last_name` | Text (read-only) | — | |
| 5 | Channel | `booking.referer` | Text (read-only) | — | Booking channel |
| 6 | Payment Method & Options | `booking.payment_method_option` | Text (read-only) | — | Retrieved from `CommonController::getVillaElectricityRate()` |
| 7 | Start Meter | `booking.electrical_bill.start_meter` | Text (read-only) | — | N/A if not yet recorded |
| 8 | Meter Photo | `booking.electrical_bill.meter_photo` | Image (read-only, click to zoom) | — | Enlarged in a modal |
| 9 | Done On | `booking.electrical_bill.start_date` + `meter_time` | Text (read-only) | — | Date/time the concierge completed the task |
| 10 | By | `booking.electrical_bill.user.usage_name` | Text (read-only) | — | Person who performed the action |
| 11 | Payment | Calculated from `checkin_rate_type` + `electricity_rate_data_checkin` | Text (read-only) | — | Amount collected/to be collected, depending on method |
| 12 | Account | Calculated from payment method | Text (read-only) | — | Receiving account/fund, or "Collected by platform" |
| 13 | Reception Confirmed | `booking.electrical_bill.is_amount_received` | Text (read-only) | — | Yes/No |

## Functions / Actions
- Click the meter photo to enlarge it in a modal (Image Preview Modal).
- No save/edit buttons — this is a view-only page.
- If `id` is invalid → shows a "Invalid booking ID." error flash and redirects back to VSV-011.

## Navigation
- Entered from: VSV-011 — "View" button on each booking row.
- Navigates to: back to VSV-011 via breadcrumb/back link.
