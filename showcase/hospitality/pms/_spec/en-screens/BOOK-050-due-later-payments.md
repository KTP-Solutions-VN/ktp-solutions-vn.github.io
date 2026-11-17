# BOOK-050 — Due Later Payments

**Type:** Full page (opened from BOOK-052)
**Route:** Booking/dueLater (default: `/booking/due-later`)
**Friendly route:** `/booking/partner-payments/due-later`
**Module:** Booking

## Overview
List of partner payments (villa owners under a partnership model) that have been confirmed (`PartnerBooking.status = confirmed`) but are NOT YET due for payment, based on the payment frequency configured in the villa contract. Used to preview upcoming amounts that will need to be paid.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | No | |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | No | |
| 2 | Property | Villa name |
| 3 | Booking Number | |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | |
| 7 | Actions | View payment details (`paymentModule`) |

## Functions / Actions
- Filter by business unit
- View payment details (popup retrieves data via `paymentModule`, including the villa owner's bank account information)

## Navigation
- Opened from: BOOK-052 (Partner Payments) > "Due Later" button
- Navigates to: none (the item automatically moves to BOOK-049 once it becomes due)
