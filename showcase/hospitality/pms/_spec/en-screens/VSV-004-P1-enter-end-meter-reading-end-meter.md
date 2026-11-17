# VSV-004-P1 — Enter End Meter Reading (End Meter)

**Type:** Popup (opened from VSV-004, as a separate page)

**Route:** `VillaServicesController::endMeter($booking_id)` — `/villa-services/end-meter/<booking_id>` (GET displays the form, POST to the same action to save)

**Module:** Villa Services — Electricity

## Overview
A form for entering the electricity meter reading at the time of guest check-out; the system automatically calculates the amount due based on the villa's default rate, allows discounts/waivers subject to approval, and records the payment method and supporting photos.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | End meter | `meter` | Number | Yes | Confirmed via a modal before submission |
| 2 | End date | `date` | Text + datepicker | Yes | |
| 3 | Reading time (end meter time) | `end_meter_time` | Time picker | Yes | |
| 4 | Meter area photo | `end_meter_area_photo` / `cropped_area_image` | File/base64 cropped image | Yes (one of the two) | |
| 5 | Meter number photo | `end_meter_photo` / `cropped_meter_image` | File/base64 cropped image | Yes (one of the two) | |
| 6 | Comment | `end_meter_comment` | Textarea | No | |
| 7 | Amount due | `amount` | Number | Yes | Compared against the auto-calculated `default_bill`; if it differs, Reason/Discount/Approved by become mandatory |
| 8 | Reason for discrepancy | `reason` | Text | Yes if the amount differs from the default calculation | |
| 9 | Discount | `discount` | Number | No | |
| 10 | Discount type | `discount_type` | Hidden/select | No | |
| 11 | Approved by | `approved_by` | Select (list of BU Managers in the same BU) | Yes if a discount/discrepancy exists | |
| 12 | Payment type | `payment_type` | Hidden (single/multiple) | — | |
| 13 | Paid by | `paid_by` | Select (`PAYMERCHANT`) | Yes | |
| 14 | Applied rate | `charge`, `rate_types` | Number + select | Yes | Rate type: Price per kWh / Fixed Daily Price / Free Daily Quota |
| 15 | Refund amount | `return_amount` | Number | No | |
| 16 | Additional payer / Additional amount | `additional_paid_by`, `additional_received`, `additional_fees` | Select + number | No | Other incidental additional fees |
| 17 | Villa ID | `villa_id` | Hidden | — | |
| 18 | Bill ID | `bill_id` | Hidden | — | |

Read-only information: guest name, villa, check-in/check-out dates, start meter reading (`start_meter`), villa default rate.

## Functions / Actions
- **Save:** POST to `endMeter`; calculates `default_bill = (meter - start_meter) × charge`, compares it against the entered `amount` to determine whether `meter_status = Cleared` or remains under review; saves `ElectricalBill`, updates `CheckInDetail.check_out_time`, updates the meter area photo on `Villa`, and sends a notification; if paid online (`paid_by = 7`), saves a session to redirect to the payment gateway. After saving → redirects back to VSV-004 (`checkOut`).
- A confirmation modal for the meter number is shown before submission.
- If `booking_id` is invalid or no data is found → shows an error and returns to VSV-004.

## Navigation
- Entered from: VSV-004 — "Fill it now" button.
- Navigates to: back to VSV-004 (Electricity Check-out) after saving.
