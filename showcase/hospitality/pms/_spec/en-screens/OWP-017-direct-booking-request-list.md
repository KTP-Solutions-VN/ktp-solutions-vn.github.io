# OWP-017 — Stay Requests

**Type:** Full page

**Route:** `ExternalUserController::directBookingList()` — no dedicated friendly route (default `/external-user/direct-booking-list`)

**Module:** Owner Hub

## Overview

List of direct booking requests (not via OTA) submitted by the Owner to the management unit, organized into 2 groups: pending and processed (Approved/Rejected).

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa | Select2 | No | Includes an "All" option |

List — displayed columns (both tables: pending and processed):

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | no | |
| 2 | Property | villa | |
| 3 | Check-in date | check_in_date | |
| 4 | Check-out date | check_out_date | |
| 5 | Requested by | requested_by (user) | |
| 6 | Request date | on (created_at) | |
| 7 | Status | status | Add:Pending / Cancel:Pending / Add:Approved / Add:Rejected / Cancel:Approved / Cancel:Rejected |
| 8 | Processed by | processed_by (action_by) | |
| 9 | Actions | — | View, Edit (edit only for pending items) |

## Functions / Actions

- New booking request ("Request New Booking" button → opens OWP-017-P1)
- View request details (eye icon → OWP-017-P3)
- Edit a pending request (pencil icon → OWP-017-P2)
- Filter by property

## Navigation

- Accessed from the main menu (Stay Requests)
- "Request New Booking" button → OWP-017-P1 (New Stay Request popup)
- View icon → OWP-017-P3 (view detail popup)
- Edit icon → OWP-017-P2 (Edit Stay Request popup)
