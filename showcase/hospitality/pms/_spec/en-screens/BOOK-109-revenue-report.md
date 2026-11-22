# BOOK-109 — Revenue Breakdown

**Type:** Full page

**Route:** Booking/revenueReport (default: `/booking/revenue-report`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

Monthly revenue report aggregated by Company → Subsidiary → Villa, based on `MonthlyReport` data, converted according to the selected currency, allowing multiple months to be selected for comparison and downloaded as an Excel report.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Company | company_id | Select | No | |
| 2 | Subsidiary | subsidiary_id | Select | No | |
| 3 | Business Unit | business_unit_id | Select | No | "All" (0) applies the user's `selected_business`; supports business unit zones |
| 4 | Select Months | selected_months | Custom picker (multi-month selection dialog, saved to hidden field `monthValues`) | Yes | Required for data to display; the table is empty if none are selected |
| 5 | Currency | currency_code | Select | No | Used to convert figures (`currency_convert`) |

The "Calculate" button submits the form to reload the report based on the filters (GET).

If the selected months do not yet have a corresponding rate configured (`Rate`), a missing-rate warning is displayed, which may link to BOOK-027 (Unpriced Properties) / BOOK-... (Unpriced Alert Threshold).

**Report Table (grouped by Company/Subsidiary, expandable to view by Villa):**

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Company | company_name | |
| 2 | Subsidiary | subsidiary_name | |
| 3 | Property | property | "All" on the total row, villa name on child rows |
| 4 | Currency | currency_name / selected_currency_name | |
| 5 | (columns for each selected month) | months_array | Total amount per month, marked "Converted Amount" if currency conversion applies |
| 6 | Total | month_total | Sum across all months |
| 7 | Currency | — | |
| 8 | Owner | owner_total | Total payable to the owner |
| 9 | Bookings | bookings | Number of bookings |
| 10 | Ops | ops | |
| 11 | Status | status | |

Clicking a Company/Subsidiary row expands to show details by Villa below.

## Functions / Actions

- "Calculate": reloads the report according to the selected filters.
- Download icon (red): downloads the Excel report file via `downloadRevenueReport/:company_id/:subsidiary_id/:business_unit_id/:currency_id/:selectedMonths`.
- Expand/collapse Company/Subsidiary rows to view Villa-level details.
- Missing rate warning (if any) directs the user to configure rates before viewing an accurate report.

## Navigation

- Accessed from the management menu (Revenue icon, active_menu = 1018), permission `Booking-revenueReport`.
- Downloads the Excel file (download, no page navigation) when the Download icon is clicked.
- May link to the missing rate configuration screen when the system warns of missing rates for the selected months.
