# BOOK-042 — Direct Booking List

**Type:** Full page
**Route:** Booking/directBookingList (default: `/booking/direct-booking-list`)
**Module:** Booking

## Overview
List of direct booking requests (not via OTA) submitted by villa owners/partners, pending approval or already processed, along with approval status.

## Detailed Description
| # | Column | Notes |
|---|---|---|
| 1 | No | Sequence number |
| 2 | Property | Villa |
| 3 | Check-in Date | |
| 4 | Check-out Date | |
| 5 | Requested By | Requester |
| 6 | On | Request date |
| 7 | Status | Status (pending/approved/rejected) |
| 8 | Processed By | Processor |
| 9 | Action | View/Approve/Reject/Edit/Delete |

## Functions / Actions
- Add a new direct booking request (opens BOOK-043)
- View details (opens BOOK-045)
- Edit (opens BOOK-044)
- Approve request (approveDirectBooking)
- Reject request (rejectDirectBooking)
- Delete request (deleteDirectBooking)

## Navigation
- Opened from: Booking module menu > Direct Booking
- Navigates to: BOOK-043 (Add), BOOK-044 (Edit), BOOK-045 (View), BOOK-046 (Cancelled List)
