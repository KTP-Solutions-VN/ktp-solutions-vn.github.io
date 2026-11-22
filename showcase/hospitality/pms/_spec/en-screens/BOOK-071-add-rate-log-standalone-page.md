# BOOK-071 — New Price Note

**Type:** Full page (independent sub-page — not a popup/modal)
**Route:** Booking/ratesLogAdd (default: `/booking/rates-log-add`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Reservations

## Overview
Form for adding a new rate log record (`VillaRateLog`) at the villa level, including business unit, villa, and note content.

**Important note:** this action and view still exist and remain functional, but are no longer linked from any page in the module — BOOK-070 (`rates_logs.ctp`) now uses an add-log popup directly on the page instead of navigating to this page. This may be a legacy screen left over from before, reachable only via a direct URL.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Yes | Changing it reloads the villa list via the `getBusinessUnitVilla` AJAX call |
| 2 | Villa | `villa` | Select | Yes | Empty initially; populated only after a business unit is selected |
| 3 | Content (Action) | `action` | Textarea | Yes | Note describing the rate change |

## Functions / Actions
- **Save** — saves the new `VillaRateLog` record (villa_id, business_unit_id, action, action_by = current user), then redirects to BOOK-070
- **Reset** — clears the data entered on the form

## Navigation
- Opened from: no link in the current UI leads to this page (it may previously have been opened from BOOK-070)
- Navigates to: back to BOOK-070 after a successful/failed save
