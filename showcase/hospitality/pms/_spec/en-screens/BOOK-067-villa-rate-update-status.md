# BOOK-067 — Rate Plan Status

**Type:** Full page
**Route:** Booking/ratesStatus (default: `/booking/rates-status`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Reservations

## Overview
Lookup page for the current rate status (Monthly/Daily/Yearly) of a villa by business unit: view an overview list of all villas currently on Monthly rates along with their next payment due date, or look up the rate-status change history of a specific villa.

## Detailed Description

### Filter / Search Form
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | Defaults to the currently selected business unit (cookie); changing it reloads the villa list via the `getBusinessUnitVilla` AJAX call |
| 2 | Villa | `villa` | Select | Yes (to click Search) | List of villas belonging to the selected business unit |
| 3 | Search button | `search` | Submit | | Clicking it auto-creates a default "Daily" log record starting 2020-01-01 for the villa if no log exists yet |

### Table 1 — System-wide Monthly Rate Overview (shown before searching or when no villa is selected)
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa name |
| 2 | Type | Rate type (only rows with type = Monthly are shown) |
| 3 | Value | Monthly rent (`monthly_rent`) |
| 4 | Starting Date | Date the rate took effect |
| 5 | Next Due Date | Next payment due date; shown in red if overdue |
| 6 | Actions | "Payment" icon (opens BOOK-069 with action=payment) and "Finish" icon (opens BOOK-069 with action=finish) |

The list is sorted ascending by `next_due_date`.

### Table 2 — Rate Status History by Villa (shown after searching for a specific villa)
| # | Column | Notes |
|---|---|---|
| 1 | Since | Date the status took effect |
| 2 | Till | Date the status ended (blank if currently active) |
| 3 | Status | Rate type (Monthly/Daily/Yearly); if Monthly, it is a link opening BOOK-076 (Monthly Rent Terms) |
| 4 | Note | Note (e.g., monthly rent amount or due date) |

Above Table 2 are the following buttons:
- **Payment** + **Change to Daily** (if the most recent log record is Monthly) — opens BOOK-069 (payment) or BOOK-075 (daily)
- **Change to Monthly** (if the most recent log record is not Monthly) — opens BOOK-075 (monthly)

## Functions / Actions
- Search by Business Unit + Villa (form submit, POST)
- Payment/Finish icon on the Monthly overview table (opens BOOK-069 — ratesStatusEdit)
- "Monthly" link in the Status column (Table 2) opens BOOK-076 — rentalMonthView
- Payment/Change to Daily/Change to Monthly button (Table 2) navigates to BOOK-069 or BOOK-075 depending on the action

## Navigation
- Opened from: BOOK-066 (Status button)
- Navigates to: BOOK-069 (Monthly Rent Action popup), BOOK-075 (Switch Rate Basis), BOOK-076 (Monthly Rent Terms)
