# BU-008 — FX Rates

**Type:** Full page

**Route:** `BusinessUnitController::rates()` — default `/business-unit/rates`

**Module:** Operating Units

## Overview
A table of exchange rates between the reference currency and other currencies, broken down by period (month), with support for entering forecast rates for the current period.

## Detailed Description

Rates table (rows = period, columns = each non-reference currency):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Period | `period` | Format month/year, sorted descending |
| 2..n | Each currency | `rates[currency_id]` (JSON) | Exchange value relative to the reference currency; click to edit |

Additional information: a "Forecast" row (for the current month's forecast) is displayed separately, with a warning `is_rate_set = false` shown if rates have not been fully entered for all currencies in the current year. Includes a link to a reference exchange-rate website (`forex_rates_website` — configured in Settings).

## Functions / Actions
- **Click a rate cell / "Add rate" button:** opens the BU-008-P1 popup to enter or update the exchange rate for a period or forecast.
- The reference currency's rate is always fixed at 1 (not editable).

## Navigation
- Accessed from: BU-007 (Currency Setup) — "Rates" button.
- Navigates to: BU-008-P1 (enter/update exchange rate popup).
