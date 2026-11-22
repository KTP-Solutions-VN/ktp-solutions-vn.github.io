# BOOK-043 — New Stay Request

**Type:** Popup (opened from BOOK-042)
**Route:** Booking/addDirectBooking/:id? (default: `/booking/add-direct-booking`)
**Module:** Reservations

## Overview
Form for submitting a direct booking request for a villa (typically used by villa owners/partners), including guest information, stay dates, and special conditions.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `property` | Select | Yes | |
| 2 | Check-in Date | `check_in_date` | Datepicker | Yes | |
| 3 | Check-out Date | `check_out_date` | Datepicker | Yes | |
| 4 | Number of Nights | `nights` | Number (auto-calculated) | - | |
| 5 | Guest First Name | `first_name` | Text | Yes | |
| 6 | Guest Last Name | `last_name` | Text | Yes | |
| 7 | Email | `email` | Text | No | |
| 8 | Phone Number | `phone_number` | Text | Yes | |
| 9 | Number of Guests | `guests` | Number | Yes | |
| 10 | Booking Type | `type` | Select | Yes | |
| 11 | Amount | `amount` | Number | Yes | |
| 12 | Payment Status | `paid` | Select/Checkbox | No | |
| 13 | Special Request | `requested_by` | Text | No | |
| 14 | Special Conditions | `special_conditions` | Textarea | No | |
| 15 | Requested By (Person) | `by` | Text | No | |

## Functions / Actions
- **Submit Request** button — creates a new direct booking request, moving it into BOOK-042 pending approval

## Navigation
- Opened from: BOOK-042 (Direct Stay Requests)
- Navigates to: back to BOOK-042
