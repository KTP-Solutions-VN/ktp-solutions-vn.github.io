# BU-008-P1 — Enter/Update Exchange Rate Popup

**Type:** Popup (opened from BU-008)

**Route:** Static Bootstrap modal (`#exampleModal`) in `rates.ctp`; submitted via POST to the same `BusinessUnitController::rates()` action.

**Module:** Business Unit

## Overview
A popup for entering the exchange value of a currency relative to the reference currency, for a specific period (month) or for the current month's forecast.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Period Type | `period_forecast_option` | Radio (`Period` / `Forecast`) | Yes | Selecting Forecast hides the month-selection field |
| 2 | Period (month) | `period` | Date picker (month/year selection) | Yes (when Period) | Cannot select a month beyond the current month |
| 3 | Currency | `currency_id` | Select | Yes | List excludes the reference currency; AJAX checks `checkEuroSelection`/`getRate` to pre-populate the existing value |
| 4 | Exchange Rate | `rate` | Number | Yes | Locked to 1 if the reference currency itself is selected |
| 5 | Action (hidden) | `action` | Hidden | — | |
| 6 | ID (hidden) | `id` | Hidden | — | ID of the `Rate` record for the period being edited (if any) |

## Functions / Actions
- **Save:** saves the exchange rate into the `Rate` record for the corresponding period (updates the `rates` JSON field), logs the activity.
- **Cancel:** closes the modal without saving.
- When the currency or month is changed, the system automatically calls the `getRate` AJAX endpoint to load any previously saved rate.

## Navigation
- Opened from: BU-008 (Rates table) — clicking a rate cell or the add button.
- After submission: redirects back to BU-008 (`referer()`).
