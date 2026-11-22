# BOOK-037 — Modify Reservation

**Type:** Full page
**Route:** Booking/edit/:id (default: `/booking/edit/:id`)
**Module:** Reservations

## Overview
Booking edit page consisting of 3 independent form blocks (each submitted separately via AJAX): guest/booking information (see the corresponding section in BOOK-028), check-in/check-out information, and notably the **Extra Services** block — where services requested by the guest are recorded. Includes a modal for assigning the responsible concierge.

## Detailed Description

### Extra Services Block — separate form, submitted via AJAX
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Extra Bed | `extra_bed` | Text | No | |
| 2 | Food Delivery | `food_delivery` | Text | No | |
| 3 | Baby Cot | `baby_cot` | Text | No | |
| 4 | High Chair | `high_chair` | Text | No | |
| 5 | Private Chef | `meal_chef` | Text | No | |
| 6 | BBQ | `bbq` | Text | No | |
| 7 | Vehicle Rental | `vehicle_rental` | Text | No | |
| 8 | Excursion | `excursion` | Text | No | |
| 9 | Special Request | `special_request` | Text | No | |
| 10 | Pick-up Point | `pick_up_point` | Text | No | |
| 11 | Pick-up Time | `pick_up_time` | Time picker (H:i) | No | |
| 12 | Transport Company | `transport_company` | Text | No | |
| 13 | Contact Phone Number | `phone_number` | Text | No | |

### Booking Details, Guest Details, and Arrival/Departure Date-Time Blocks
Layout and fields are similar to the corresponding block in BOOK-028 (Reservation Record), but here the fields are **editable inputs** (not read-only), and each block has its own separate AJAX Submit button.

### Concierge Assignment Modal (`#exampleModalLabel1`)
Popup for selecting/assigning the concierge staff member responsible for the booking.

### Booking Images Block (conditionally displayed)
List of images attached to the booking, which can be viewed/managed.

## Functions / Actions
- Submit each block separately (Booking Details, Guest Details, Arrival & Departure, Extra Services) — each block has its own independent AJAX Submit button
- Assign concierge via modal
- Manage images attached to the booking

## Navigation
- Opened from: BOOK-002 (All Reservations), BOOK-028 (Reservation Record) — Edit button
- Navigates to: back to BOOK-028/BOOK-002 after saving
