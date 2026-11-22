# OWP-017-P1 — New Stay Request

**Type:** Popup (opened from OWP-017)

**Route:** `ExternalUserController::addDirectBooking($id = null)` — no dedicated friendly route, opened from the "Request New Booking" button on OWP-017 (default `/external-user/add-direct-booking`)

**Module:** Owner Hub

## Overview

Form for submitting a direct booking request (not via OTA) for a property; the system checks for schedule conflicts before saving it with "Add:Pending" status and sending a notification email to the business unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking type | booking_type | Select | Yes | Owner Booking (non-paid) / Guest Booking (paid) / Booking Extension |
| 2 | Property | villa_id | Select | Yes | List of properties owned by the owner |
| 3 | Guest first name | guest_first_name | Text | No | |
| 4 | Guest family name | guest_family_name | Text | No | |
| 5 | Guest phone number | guest_phone_number | Text | No | |
| 6 | Guest email | guest_email | Email | No | |
| 7 | Booking date range | booking_range | Date range picker | Yes | Dates with existing bookings (booked_dates) are disabled |
| 8 | Number of nights | total_night | Number | Yes | |
| 9 | Number of guests | total_guest | Number | Yes | |
| 10 | Payment method | paid_via | Select/Text | Yes (unless Owner Booking non-paid) | List of payment methods |
| 11 | Booking amount | booking_amount | Text/Number | Yes | |
| 12 | Payment | payment | Text | Yes | |
| 13 | Special conditions | special_conditions | Textarea | No | |

## Functions / Actions

- Submit the booking request (submit, checks for schedule conflicts, saves with "Add:Pending" status, sends a notification email)
- Error notification if the property already has a booking within the selected date range

## Navigation

- Opened from OWP-017 ("Request New Booking" button)
- Successful submission → returns to OWP-017
