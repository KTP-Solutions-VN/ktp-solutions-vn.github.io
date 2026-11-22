# BOOK-068 — New Rate Plan Status

**Type:** Full page (sub-page, navigated from BOOK-067 — not a popup/modal)
**Route:** Booking/ratesStatusAdd (default: `/booking/rates-status-add`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Reservations

## Overview
Form for adding a new rate-status record (`VillaRateStatus`) for a villa: select the rate type (Yearly/Monthly/Daily) and the effective date.

**Note:** the "Add" button that used to lead to this screen from BOOK-067 (and related pages) has now been commented out (hidden) throughout the module's views — there is no longer a direct entry point from the UI; the page is only reachable via a direct URL. It remains documented because the underlying action and view are still functional.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Yes | Changing it reloads the villa list via the `getBusinessUnitVilla` AJAX call |
| 2 | Villa | `villa` | Select | Yes | Empty initially; populated only after a business unit is selected |
| 3 | Rate Type | `type` | Radio (Yearly/Monthly/Daily) | Yes | If Daily is selected, the "Until" and "Rent due date" fields are hidden |
| 4 | Until | `until` | Date picker | Yes (if type is not Daily) | Format dd-mm-yyyy |
| 5 | Rent Due Date | `rent_due_date` | Number | Yes (if type is not Daily) | |

## Functions / Actions
- **Save** — saves the new `VillaRateStatus` record (villa_id, business_unit_id, type, until, rent_due_date), then redirects to BOOK-067
- **Reset** — clears the data entered on the form

## Navigation
- Opened from: BOOK-067 (Add button — currently hidden in the UI)
- Navigates to: back to BOOK-067 after a successful/failed save
