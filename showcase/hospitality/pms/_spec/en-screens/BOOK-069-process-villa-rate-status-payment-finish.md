# BOOK-069 — Process Villa Rate Status (Payment/Finish)

**Type:** Full page (sub-page, navigated from BOOK-067 — not a popup/modal)
**Route:** Booking/ratesStatusEdit/:business_unit_id/:villa_id/:action (action = `payment` or `finish`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route, e.g. `/booking/rates-status-edit/1/2/payment`)
**Module:** Booking

## Overview
Confirmation screen for an action on the Monthly rate record currently applied to a villa: confirm that the current month's rent has been collected (`action=payment`), or confirm termination of the monthly rental agreement to move the villa back to a daily rate (`action=finish`).

Access condition: all 3 parameters `business_unit_id`, `villa_id`, and `action` must be present in the URL, and the corresponding `VillaRateStatus` record (type=Monthly, status=active) must have a `starting_date` in the past; otherwise the system displays an error and redirects to BOOK-067.

## Detailed Description
There is no input form — only a single confirmation line and one action button are displayed:

| # | Case | Displayed Content | Button |
|---|---|---|---|
| 1 | `action=payment` | "`<Villa Name>`, rent of `<monthly_rent>` THB due on `<next_due_date>`" | **Paid** button |
| 2 | `action=finish` (default) | "`<Villa Name>` goes back to daily rate. There is no outstanding monthly Rent due." | **Confirm** button |

## Functions / Actions
- **Paid** (when action=payment) — creates a new `VillaRatesStatusPayment` record (computing the next `next_due_date` a month ahead), updates the `till_date` of the most recent log, and creates a new `VillaRatesStatusLog` record, then redirects to BOOK-067
- **Confirm** (when action=finish) — creates a new `VillaRateStatus` record with type=Daily, sets the old Monthly record's `status` to `inactive`, creates the corresponding `VillaRatesStatusPayment` and `VillaRatesStatusLog` records, then redirects to BOOK-067

## Navigation
- Opened from: BOOK-067 (Payment/Finish icon on the Monthly overview table)
- Navigates to: back to BOOK-067 after processing
