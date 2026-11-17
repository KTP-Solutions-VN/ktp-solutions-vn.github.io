# BOOK-028 — Booking Details (Full)

**Type:** Full page
**Route:** Booking/viewDetails/:id (default: `/booking/view-details/:id`, id is base64_encoded)
**Module:** Booking

## Overview
A page displaying the full (read-only) details of a booking, comprising multiple information blocks: booking details, guest details, pre-arrival information, check-in/check-out times, and booking-attached images. It differs from BOOK-002-P1 (Quick View) in that it includes additional blocks: Pre-arrival Details, Arrival & Departure (check-in/check-out time and staff), and Booking Images.

## Detailed Description

### Block 1 — Booking Details
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking code (Beds24) | `beds_24_booking_id` | Text (readonly) | - | |
| 2 | Booking channel (Referer) | `referer` | Text (readonly) | - | |
| 3 | Booking date | `booking_date` | Text (readonly) | - | Format d, D M Y H:i:s |
| 4 | Status | `status` | Text (readonly) | - | |
| 5 | Check-in date | `check_in_detail.check_in_date/time` | Text (readonly) | - | |
| 6 | Check-out date | `check_in_detail.check_out_date/time` | Text (readonly) | - | |
| 7 | Amount | `amount` | Text (readonly) | - | |
| 8 | Commission | `commission` | Text (readonly) | - | |
| 9 | Tax | `tax` | Text (readonly) | - | |
| 10 | Outstanding payment | `outstanding_payment` | Text (readonly) | - | |
| 11 | Payment status | `payment_status` | Text (readonly) | - | |
| 12 | Payment currency | `payment_currency` | Text (readonly) | - | |
| 13 | Villa | `villa.name` | Text (readonly) | - | |
| 14 | Owner | `owner.name` | Text (readonly) | - | |
| 15 | Payment description | `payment_description` | Text (readonly) | - | |
| 16 | API message | `api_message` | Text (readonly) | - | |
| 17 | Message | `message` | Text (readonly) | - | |
| 18 | Notes | `notes` | Text (readonly) | - | |

### Block 2 — Guest Details
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest first name | `guest.first_name` | Text (readonly) | - | |
| 2 | Guest family name | `guest.family_name` | Text (readonly) | - | |
| 3 | Email | `guest.email` | Text (readonly) | - | |
| 4 | Country | `guest.country` | Text (readonly) | - | |
| 5 | Language | `guest.language` | Text (readonly) | - | |
| 6 | Total number of guests | `guest.guest_no` | Text (readonly) | - | |
| 7 | Adults | `guest.adult` | Text (readonly) | - | |
| 8 | Children | `guest.child` | Text (readonly) | - | |
| 9 | Mobile phone number | `guest.mobile_number` | Text (readonly) | - | |

### Block 3 — Pre-arrival Details
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Leader (group chat leader) | `group_chat.leader_name` | Text (readonly) | - | Displays "Not assigned" if not yet assigned |
| 2 | Estimated arrival time | `pre_arrival_detail.estimated_arrival` | Text (readonly) | - | |
| 3 | Transfer required | `pre_arrival_detail.transfer_required` | Text (readonly) | - | |
| 4 | Transfer details | `pre_arrival_detail.transfer_data` | Text (readonly) | - | |
| 5 | Extra requirements | `pre_arrival_detail.extra_requirement` | Text (readonly) | - | |
| 6 | Guest chat status | `group_chat_status` | Text (readonly) | - | |

### Block 4 — Arrival & Departure
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Check-in time | `check_in_detail.check_in_time` | Text (readonly) | - | |
| 2 | Check-out time | `check_in_detail.check_out_time` | Text (readonly) | - | |
| 3 | Check-in staff | `check_in_detail.check_in_staff` | Text (readonly) | - | |
| 4 | Check-out staff | `check_in_detail.check_out_staff` | Text (readonly) | - | |

### Block 5 — Booking Images (conditionally displayed when images exist)
List of images attached to the booking (`booking_images`), displayed as an image grid.

## Functions / Actions
- View-only page, with no direct edit button — edits are made via the "Edit Booking" screen
- Breadcrumb navigation: Home > Booking List > Booking Details

## Navigation
- Opened from: BOOK-002 (Booking List), BOOK-001 (Check-in/Check-out Calendar) — click on guest name/villa
- Navigates to: back to BOOK-002 via the breadcrumb
