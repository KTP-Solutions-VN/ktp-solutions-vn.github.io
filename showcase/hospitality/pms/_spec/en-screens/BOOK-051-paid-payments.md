# BOOK-051 — Settled Payouts

**Type:** Full page (opened from BOOK-052)
**Route:** Booking/paid (default: `/booking/paid`)
**Friendly route:** `/booking/partner-payments/paid`
**Module:** Reservations

## Overview
List of partner payments (villa owners under a partnership model) that have been confirmed as paid (`PartnerBooking.status = paid`), including the payment date, the person who confirmed payment, and the payment method.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | No | |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | No | |
| 2 | Property | |
| 3 | Booking Number | |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | |
| 7 | Paid On | Payment date |
| 8 | Paid By | Person who confirmed the payment |
| 9 | Paid Through | Payment method |

## Functions / Actions
- Filter by business unit

## Navigation
- Opened from: BOOK-052 (Partner Payouts) > "Paid" button, or from BOOK-049 after confirming payment
