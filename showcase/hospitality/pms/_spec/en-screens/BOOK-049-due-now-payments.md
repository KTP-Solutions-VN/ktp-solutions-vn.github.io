# BOOK-049 — Due Now Payments

**Type:** Full page (opened from BOOK-052)
**Route:** Booking/dueNow (default: `/booking/due-now`)
**Friendly route:** `/booking/partner-payments/due-now`
**Module:** Booking

## Overview
List of partner payments (villa owners under a partnership model) that have become due (based on the payment frequency configured in the villa contract: before check-in date, on check-in date, one month in advance, at time of booking, or the Monday of the previous week). Allows selecting multiple rows and confirming payment.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | No | Defaults to the user's cookie/BU |

### List (Columns)
| # | Column | Notes |
|---|---|---|
| 1 | No | |
| 2 | Property | Villa name |
| 3 | Booking Number | Booking code |
| 4 | Check-in | |
| 5 | Check-out | |
| 6 | Amount | Amount payable to the owner |
| 7 | Actions | Checkbox to select the row for payment confirmation |

## Functions / Actions
- Filter by business unit
- Select (checkbox) one or multiple rows
- **Paid** confirmation button — calls `addPartnerPayment` to mark the selected items as paid (moves them to BOOK-051 Paid)

## Navigation
- Opened from: BOOK-052 (Partner Payments) > "Due Now" button
- Navigates to: BOOK-051 (Paid) after confirming payment
