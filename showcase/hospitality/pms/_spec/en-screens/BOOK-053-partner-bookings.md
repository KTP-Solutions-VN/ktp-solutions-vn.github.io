# BOOK-053 — Partner Reservations

**Type:** Full page
**Route:** Booking/partnerBookings (default: `/booking/partner-bookings`)
**Module:** Reservations

## Overview
List of bookings belonging to villas under a partnership contract (`VillaContract.ownership_type = partnership`), used by the villa owner/manager to confirm or reject each booking before it is passed into the partner payment flow (BOOK-052).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | No | |
| 2 | Status | `status` | Select | No | New / Sent / Confirmed / Paid / Rejected / All Future / All |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | Sr No | |
| 2 | Property | |
| 3 | Received | |
| 4 | Booking Number | |
| 5 | Check-in | |
| 6 | Check-out | |
| 7 | Status | PartnerBooking status |
| 8 | Actions | Confirm/Reject |
| 9 | Last Action By | |

## Functions / Actions
- Filter by business unit/status
- Confirm partner booking (`confirmPartnerBooking`) — changes the status to confirmed
- Reject partner booking (`rejectPartnerBooking`) — changes the status to rejected
- Send booking confirmation email to the villa owner with a PDF attachment (`sendEmailToBookingConfirmation`)

## Navigation
- Opened from: Reservations module menu > Partner Reservations
- Navigates to: BOOK-052 (Partner Payouts) once the booking is confirmed
