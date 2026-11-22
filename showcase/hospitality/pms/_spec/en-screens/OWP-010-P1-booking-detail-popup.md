# OWP-010-P1 — Reservation Detail

**Type:** Popup (opened from OWP-010 and OWP-008)

**Route:** `ExternalUserController::bookingDetails($id)` — no dedicated friendly route (default `/external-user/booking-details/{id_base64}`)

**Module:** Owner Hub

## Overview

A page/popup showing the full details of a booking: booking information, guest information, pre-arrival information, check-in/check-out information, and booking images — view only, not editable.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| **Booking Information** ||||| |
| 1 | Booking ID | booking_id | Text (display) | — | |
| 2 | Property | villa.name | Text (display) | — | |
| 3 | Owner | owner.name | Text (display) | — | |
| 4 | Booking source | referer | Text (display) | — | |
| 5 | Booking date | booking_date | Date (display) | — | |
| 6 | Status | status | Text/badge | — | |
| 7 | Check-in date | check_in_date | Date (display) | — | |
| 8 | Check-out date | check_out_date | Date (display) | — | |
| 9 | Amount | amount | Number (display) | — | |
| 10 | Commission | commission | Number (display) | — | |
| 11 | Tax | tax | Number (display) | — | |
| 12 | Outstanding payment | outstanding_payment | Number (display) | — | |
| 13 | Payment status | payment_status | Text (display) | — | |
| 14 | Payment currency | payment_currency | Text (display) | — | |
| 15 | Payment description | payment_description | Text (display) | — | |
| 16 | Notes | notes | Text (display) | — | |
| **Guest Information** ||||| |
| 17 | Guest first name | guest_first_name | Text (display) | — | |
| 18 | Guest family name | guest_family_name | Text (display) | — | |
| 19 | Email | email | Text (display) | — | |
| 20 | Country | country | Text (display) | — | |
| 21 | Phone number | phone_number | Text (display) | — | |
| 22 | Mobile number | mobile_number | Text (display) | — | |
| 23 | Language | language | Text (display) | — | |
| 24 | Total guests | total_guest | Number (display) | — | |
| 25 | Adults | adult | Number (display) | — | |
| 26 | Children | child | Number (display) | — | |
| 27 | State/Province | state | Text (display) | — | |
| 28 | City | city | Text (display) | — | |
| 29 | Address | address | Text (display) | — | |
| 30 | Postal code | postal_code | Text (display) | — | |
| **Pre-arrival Information** ||||| |
| 31 | Assigned concierge | assigned_concierge | Text (display) | — | "Not assigned" if empty |
| 32 | Estimated arrival time | estimated_arrival | Text (display) | — | |
| 33 | Transfer needed | transfer_needed | Text (display) | — | |
| 34 | Transfer information | transfer_data | Text (display) | — | |
| 35 | Special requests | extra_requirement | Text (display) | — | |
| 36 | Guest chat status | guest_chat_status | Text (display) | — | |
| **Check-in / Check-out Information** ||||| |
| 37 | Check-in time | check_in_time | Text (display) | — | |
| 38 | Check-out time | check_out_time | Text (display) | — | |
| 39 | Check-in staff | check_in_staff | Text (display) | — | |
| 40 | Check-out staff | check_out_staff | Text (display) | — | |
| 41 | Electricity meter start reading | electricity_start_reading | Number (display) | — | |
| 42 | Electricity meter end reading | electricity_end_reading | Number (display) | — | |
| 43 | Electricity payment | electricity_payment | Number (display) | — | |
| 44 | Payment received | payment_received | Text (display) | — | |
| 45 | Post-checkout review | check_out_reviews | Text (display) | — | |
| 46 | Booking images | booking_images | List of images | — | |

## Functions / Actions

- View all booking details (not editable)

## Navigation

- Opened from OWP-010 (view details icon) or OWP-008 (click a calendar cell)
- Close popup → returns to the originating screen
