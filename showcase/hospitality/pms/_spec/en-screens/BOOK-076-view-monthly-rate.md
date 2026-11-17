# BOOK-076 — View Monthly Rate

**Type:** Full page (sub-page, navigated from BOOK-067 — not a popup/modal)
**Route:** Booking/rentalMonthView/:business_unit_id/:villa_id
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route, e.g. `/booking/rental-month-view/1/2`)
**Module:** Booking

## Overview
Page for viewing details of the Monthly rental agreement currently applied to a villa: an overview of the agreement and the monthly rent payment history.

## Detailed Description

### Overview Information (a summary paragraph, not a form)
Displays a descriptive paragraph including: villa name, the monthly rental start date (`starting_date`), the end date (if switched back to Daily, taken from the `created_at` of the subsequent Daily record; otherwise shown as "-----"), deposit status (amount deposited, or not yet deposited), monthly rent (`monthly_rent`), the next payment due date, and the expected contract termination date (`expected_termination_date`).

### Payment History Table
| # | Column | Notes |
|---|---|---|
| 1 | Rental Month | Rental month (`rental_month`) |
| 2 | Paid On | Date paid (`payment_date`); if not yet paid, shows "Due on: `<next_due_date>`" |

## Functions / Actions
No editing actions are available — this is a read-only page that only displays the agreement information and payment history.

## Navigation
- Opened from: BOOK-067 ("Monthly" link in the Status column of the villa's rate status history table)
- Navigates to: none
