# OWP-017-P3 — Stay Request Details

**Type:** Popup (opened from OWP-017)

**Route:** `ExternalUserController::viewDirectBooking($id)` — no dedicated friendly route, opened from the eye icon on OWP-017 (default `/external-user/view-direct-booking/{id_base64}`)

**Module:** Owner Hub

## Overview

View the full details (not editable) of a direct booking request: guest information, booking information, the requester, and the approver.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest first name | guest_first_name | Text (display) | — | "N/A" if empty |
| 2 | Guest family name | guest_family_name | Text (display) | — | |
| 3 | Guest phone number | guest_phone_number | Text (display) | — | |
| 4 | Guest email | guest_email | Text (display) | — | |
| 5 | Booking type | booking_type | Text (display) | — | |
| 6 | Request created date | created_at | Date (display) | — | |
| 7 | Property | villa.name | Text (display) | — | |
| 8 | Check-in date | check_in_date | Date (display) | — | |
| 9 | Check-out date | check_out_date | Date (display) | — | |
| 10 | Booking amount | booking_amount | Number (display) | — | Displayed with the property's currency |
| 11 | Amount paid | payment | Number (display) | — | |
| 12 | Paid via | paid_via | Text (display) | — | |
| 13 | Special conditions | special_requirements | Text (display) | — | |
| 14 | Total guests | total_guest | Number (display) | — | |
| 15 | Total nights | total_night | Number (display) | — | |
| 16 | Status | status | Text (display) | — | The "Add:" prefix is stripped for display |
| 17 | Requested by | user (first_name + family_name) | Text (display) | — | |
| 18 | Approved by | action_by (first_name + family_name) | Text (display) | — | Only shown when the status is Add:Approved or Cancel:Approved |
| 19 | Approval date | (modified date) | Date (display) | — | Only shown when the status is Add:Approved or Cancel:Approved |

## Functions / Actions

- View all direct booking request details (not editable)

## Navigation

- Opened from OWP-017 (eye icon on each row)
- Close/return → OWP-017
