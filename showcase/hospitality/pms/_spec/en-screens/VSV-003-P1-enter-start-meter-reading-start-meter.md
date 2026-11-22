# VSV-003-P1 — Record Arrival Reading

**Type:** Popup (opened from VSV-003, as a separate page — opens a new tab when clicking "Enter")

**Route:** View at `VillaServicesController::startMeter($booking_id)` — `/villa-services/start-meter/<booking_id>`; saved via `VillaServicesController::saveMeter()` — `/villa-services/save-meter` (POST, no dedicated view, always redirects)

**Module:** In-Stay Services — Metering

## Overview
A form for entering the electricity meter reading at the time of guest check-in for a specific booking: meter reading, photo of the meter area, close-up photo of the meter number, reading time, and (optionally) collecting an electricity deposit at check-in.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Start meter | `start_meter` | Number | Yes | Re-confirmed via a "Do you confirm the meter number?" modal before submission |
| 2 | Start date | `start_date` | Text + datepicker | Yes | |
| 3 | Reading time (meter time) | `meter_time` | Time picker | Yes | |
| 4 | Meter area photo | `area_photo` / `cropped_area_image` | Image file or cropped image (base64) from camera | Yes (one of the two) | If no new photo is taken, the villa's existing photo is retained |
| 5 | Meter number photo | `meter_photo` / `cropped_meter_image` | Image file or cropped image (base64) from camera | Yes (one of the two) | |
| 6 | Meter area comment | `comment` | Textarea | No | Saved to `Villa.comment` |
| 7 | Whether an electricity deposit is collected | `payment_collection` | Select (yes/no) | Yes | |
| 8 | Deposit amount | `deposit_received` | Number | Yes if `payment_collection = yes` | |
| 9 | Currency | `currency_id` | Select (`Currency` category) | Yes if collecting payment | |
| 10 | Check-in payment method | `check_in_payment_method` | Select (`PaymentMethod`) | Yes if collecting payment | |
| 11 | Booking ID | `booking_id` | Hidden | — | |

Accompanying read-only information: guest name, villa, check-in/check-out dates, the villa's default electricity rate (`ElectricalDefault`: Price per kWh / Fixed Daily Price / Free Daily Quota), and the most recent updater (if prior data exists).

## Functions / Actions
- **Save:** submits a POST to `saveMeter`; writes `CheckInDetail.electricity_reading_start`, creates/updates `ElectricalBill` (status = Pending), updates the meter area photo on `Villa`, and sends a notification to the BU manager; then redirects back to VSV-003 (`checkIn`).
- A confirmation modal for the meter number ("Do you confirm the meter number?") is shown before saving, to prevent entry errors.
- **Cancel/Back:** returns to VSV-003.

## Navigation
- Entered from: VSV-003 — "Enter" button on each booking row.
- Navigates to: back to VSV-003 (Arrival Meter Reading) after saving.
