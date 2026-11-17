# OWP-019 — Cancel Direct Booking List

**Type:** Full page

**Route:** `ExternalUserController::cancelDirectBookingList()` — no dedicated friendly route (default `/external-user/cancel-direct-booking-list`)

**Module:** Owner Portal

## Overview

List of the Owner's approved direct bookings (Add:Approved), allowing a cancellation request for an approved booking to be submitted to the management unit.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa | Select | No | Filters the list by property, submitted via the "Search" button |

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | no | |
| 2 | Check-in date | check_in_date | |
| 3 | Check-out date | check_out_date | |
| 4 | Guest | guest_first_name + guest_family_name | |
| 5 | Actions | — | "x" icon → opens a popup to enter the cancellation reason |

## Functions / Actions

- Filter by property
- Request booking cancellation: "x" icon → opens a popup to enter the "Cancellation Reason" (cancel_reason, required) → submit calls `cancelDirectBooking()` (changes the booking status to Cancel:Pending, sends a notification email, no dedicated view) → returns to OWP-019

## Navigation

- Accessed from OWP-017 (the "Delete Booking" link — currently hidden in the UI) or the main menu
- After submitting a cancellation request → returns to OWP-019
