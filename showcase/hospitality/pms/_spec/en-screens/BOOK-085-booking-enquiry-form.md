# BOOK-085 — Stay Enquiry

**Type:** Full page (intended for customers/guests, not an internal admin page)
**Route:** Booking/bookingEnquiry/:id
**Pretty route:** No dedicated route found in config/Routes.php (note: the `/booking-enquiry` route in Routes.php points to `Api2::bookingEnquiry`, which is DIFFERENT from this action)
**Module:** Reservations

## Overview
A public-facing page displaying villa information and allowing guests to fill out a form to submit a booking request directly to the villa owner (via email), together with a date picker highlighting already-booked dates. This form is intended to be filled out by external guests/partners, not as an internal tool for operations staff.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | First Name | `first_name` | Text | Yes | Value is stored in a 30-day cookie to pre-fill on the next visit |
| 2 | Last Name | `last_name` | Text | Yes | Stored in a cookie in the same way |
| 3 | Phone Number | `phone_number` | Text | Yes | Stored in a cookie in the same way |
| 4 | Email | `email` | Email | Yes | Stored in a cookie in the same way |
| 5 | Number of Adults | `adult` | Number | Yes | Default: 2 |
| 6 | Number of Children | `children` | Number | Yes | Default: 0 |
| 7 | Booking Date Range | `booking_range` | Date range picker | Yes | Format `DD-MM-YYYY/DD-MM-YYYY`; disables dates that already have a booking (`Booking.check_in/check_out`), and checks the minimum number of nights (villa's `minimum_stay`) |

### Display-Only Information (not entered)
- Villa name, villa cover image
- Greeting message "Thank you for booking with us + villa name"

## Functions / Actions
- **Submit** button — checks whether the selected dates overlap with an existing booking (if so: displays a "Dates already booked..." warning and returns to the form); if valid, sends a request email to the business unit's email address that owns the villa (`business_unit.email`), then navigates to BOOK-086 (Enquiry Received)
- Calendar month navigation (prev/next buttons on the date range picker) — calls the `getOccupiedDates` AJAX action to load fully booked dates for that month

## Navigation
- Opened from: the (public) villa detail page when the guest clicks "Enquire"/"Book now"
- Navigates to: BOOK-086 (Enquiry Received) after a successful submission
