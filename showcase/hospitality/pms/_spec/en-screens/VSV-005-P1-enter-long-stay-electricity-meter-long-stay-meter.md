# VSV-005-P1 — Record Extended-Stay Reading

**Type:** Popup (opened from VSV-005, as a separate page)

**Route:** `VillaServicesController::addLongStayMeter($booking_id)` — `/villa-services/add-long-stay-meter/<booking_id>`; saved via `saveLongStayDiscount()` (POST, no dedicated view)

**Module:** In-Stay Services — Metering

## Overview
A form for entering periodic electricity meter reading cycles for long-stay guests (`IntermediaryPayment` table, separate from the one-off `ElectricalBill` used in the short-stay flow). Each save creates a new reading period, with the previous period's end reading automatically becoming the start reading of the next.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Start meter | `start_meter` | Number, read from the previous period | — | Auto-filled = the end meter of the immediately preceding period |
| 2 | End meter | `meter` | Number | Yes | Confirmed via a "Do you confirm the meter number?" modal |
| 3 | Date | `date` | Text + datepicker | Yes | |
| 4 | Reading time | `end_meter_time` | Time picker | Yes | |
| 5 | Meter area photo | `end_meter_area_photo` | File | Yes | |
| 6 | Meter number photo | `end_meter_photo` | File | Yes | |
| 7 | Comment | `end_meter_comment` | Textarea | No | |
| 8 | Amount due | `amount` | Number | Yes | Compared against the `default_bill` auto-calculated from the villa's rate |
| 9 | Reason for discrepancy | `reason` | Text | Yes if there is a discrepancy | |
| 10 | Discount | `discount` | Number | No | |
| 11 | Approved by | `approved_by` | Select | Yes if a discount exists | |
| 12 | Paid by | `paid_by` | Select (`PAYMERCHANT`) | Yes | |
| 13 | Refund amount | `return_amount` | Number | No | |
| 14 | Additional payer / Additional amount | `additional_paid_by`, `additional_received` | Select + number | No | |
| 15 | Villa ID / Booking ID | `villa_id` (hidden) | Hidden | — | |

## Functions / Actions
- **Save:** POST to `saveLongStayDiscount`; creates a new `IntermediaryPayment` record for the reading period, calculates `default_bill` based on the villa's rate, and compares it against the entered `amount`; if a previous period exists, that period is closed (end meter/end date) before opening a new one; after saving, redirects back to VSV-005 (`partial`).
- A confirmation modal for the meter number is shown before submission (same as VSV-004-P1).

## Navigation
- Entered from: VSV-005 — "Enter" button.
- Navigates to: back to VSV-005 (Extended-Stay Metering) after saving.
