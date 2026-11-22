# BOOK-075 — Switch Rate Basis

**Type:** Full page (sub-page, navigated from BOOK-067 — not a popup/modal)
**Route:** Booking/changeVillaRates/:business_unit_id/:villa_id/:action (action = `monthly` or `daily`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route, e.g. `/booking/change-villa-rates/1/2/monthly`)
**Module:** Reservations

## Overview
Form for quickly switching a villa's rate calculation method between Daily and Monthly rates, initializing a corresponding new rate-status record (`VillaRateStatus`).

Access condition: all 3 parameters `business_unit_id`, `villa_id`, and `action` must be present in the URL; otherwise the system displays an error and redirects to BOOK-067.

## Detailed Description

### When `action = monthly` (switching to a monthly rate)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Starting Date | `starting_date` | Date picker | Yes | |
| 2 | Monthly Rent | `monthly_rent` | Text/Number | Yes | |
| 3 | Deposit | `deposit` | Text/Number | Yes | |
| 4 | Rent Due Date | `rent_due_date` | Select (Month End / Day of the month) | Yes | If "Day of the month" is selected, an additional field to pick the specific day is shown |
| 5 | Specific Day of the Month | `day_of_the_month` | Select (1–31) | Required if `rent_due_date` = day_of_month | Hidden by default, shown only when needed |
| 6 | Expected Termination Date | `expected_termination_date` | Date picker | Yes | |

### When `action = daily` (switching back to a daily rate)
There are no input fields, only a confirmation line: "`<Villa Name>` goes back to daily rate. There is no outstanding monthly Rent due."

## Functions / Actions
- **Confirm** — saves a new `VillaRateStatus` record with the corresponding type (Monthly/Daily), creates a `VillaRatesStatusPayment` record (computing `next_due_date`) and a `VillaRatesStatusLog` record documenting the change, then redirects to BOOK-067

## Navigation
- Opened from: BOOK-067 ("Change to Monthly"/"Change to Daily" button in the villa's rate status history table)
- Navigates to: back to BOOK-067 after a successful save
