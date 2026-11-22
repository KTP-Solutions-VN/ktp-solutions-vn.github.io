# OWP-014 — Earnings Statement

**Type:** Full page

**Route:** `ExternalUserController::generateReports()` — no dedicated friendly route (default `/external-user/generate-reports`)

**Module:** Owner Hub

## Overview

Screen for generating a detailed financial report (income and expense statement) for a property over a selected time period: daily revenue, OTA commission, GST, maintenance costs, other expenses, and the owner's net payout. Booking data can be synced and the report can be downloaded.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa_id | Select2 | Yes | List of the owner's currently open properties |
| 2 | Date range | date_range | Date range picker | Yes | |
| 3 | Report type | type | Select/hidden | No | |

Report table — displayed columns (by day):

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Date | date | |
| 2 | Booking channel | channel | |
| 3 | Customer | customer | |
| 4 | Gross revenue | gross / payout | |
| 5 | OTA commission | ota_commission | |
| 6 | GST | vat | Shown when GST applies by channel |
| 7 | Net revenue | daily_net / net | |
| 8 | Service fee by type | services (%) | Multiple dynamic columns by service type |
| 9 | Owner receives | owner | |
| 10 | Other amount | other | |
| 11 | Total | total | |
| 12 | Comment | comment | |

## Functions / Actions

- Search/generate the report by property and date range ("Search" button)
- Sync bookings ("Sync" button, calls an AJAX action to sync the latest bookings)
- Download the report ("Download Report" button)

## Navigation

- Accessed from the main menu (Statements)
- No navigation to another screen (processed in place)
