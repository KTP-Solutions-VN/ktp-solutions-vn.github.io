# OWP-017-P2 — Edit Direct Booking Request Popup

**Type:** Popup (opened from OWP-017)

**Route:** `ExternalUserController::editDirectBooking($id)` — no dedicated friendly route, opened from the edit icon on OWP-017 (default `/external-user/edit-direct-booking/{id_base64}`)

**Module:** Owner Portal

## Overview

Form for editing a direct booking request that is still in pending status (Add:Pending), resubmitting the change request to the management unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking type | booking_type | Select (pre-filled) | Yes | "Owner Booking (non-paid)" / "Guest Booking (paid)" / "Booking Extension"; selecting Owner Booking hides the guest information and payment field groups |
| 2 | Property | villa_id | Select (pre-filled) | Yes | |
| 3 | Guest first name | guest_first_name | Text (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 4 | Guest family name | guest_family_name | Text (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 5 | Guest phone number | guest_phone_number | Text (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 6 | Guest email | guest_email | Email (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 7 | Check-in/check-out dates | booking_range | Date range picker (pre-filled) | Yes | Checked against existing bookings for the property |
| 8 | Total nights | total_night | Number (read-only) | — | Auto-calculated from booking_range |
| 9 | Total guests | total_guest | Number (pre-filled) | Yes | |
| 10 | Booking amount | booking_amount | Text/Number (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 11 | Amount received | payment | Text/Number (pre-filled) | Yes (conditional) | Hidden when booking_type = Owner Booking |
| 12 | Payment method | paid_via | Select (pre-filled) | No (conditional) | Hidden when booking_type = Owner Booking |
| 13 | Special conditions | special_conditions | Text (pre-filled) | No | |

## Functions / Actions

- Submit change request ("Request Changes" button → validates schedule conflicts → saves, resets status to Add:Pending → returns to OWP-017)
- Cancel (returns to OWP-017)

## Navigation

- Opened from OWP-017 (edit icon, shown only for bookings pending approval)
- After submitting or canceling → returns to OWP-017
