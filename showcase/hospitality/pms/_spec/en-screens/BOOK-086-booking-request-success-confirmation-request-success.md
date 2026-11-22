# BOOK-086 — Enquiry Received

**Type:** Sub-page (opened from BOOK-085, a post-submission confirmation page rather than a popup)
**Route:** Booking/requestSuccess/:array
**Pretty route:** No dedicated route found in config/Routes.php
**Module:** Reservations

## Overview
A confirmation page displayed after the guest successfully submits a booking request from BOOK-085, summarizing the guest's name, the villa, and the requested date range, and notifying the guest that they will subsequently receive a booking confirmation email.

## Detailed Description
No data entry form — only displays information that has been encoded (serialized + URL-encoded) and passed via the `$array` parameter from BOOK-085.

| # | Displayed Content | Data Source | Notes |
|---|---|---|---|
| 1 | Thank-you message with guest name and villa name | `data['guest_name']`, `data['villa']` | Template: "Dear {NAME}, thank you for booking with us at {PROPERTY_NAME}" |
| 2 | Requested date range | `data['arrival']`, `data['departure']` | Format: "From {arrival date} to {departure date}" |
| 3 | Notice that a confirmation email will be received | Static | "You will receive a booking confirmation shortly" |

## Functions / Actions
- **Back** button — returns to BOOK-085 (`bookingEnquiry`) with the corresponding `villa_id`

## Navigation
- Opened from: BOOK-085 (Stay Enquiry) — automatically navigated to after a successful submission
- Navigates to: BOOK-085 when clicking Back
