# OWN-007 — Generate Owner Report

**Type:** Full page

**Route:** `/Owner/generateReports` (controller `Owner`, action `generateReports()`)

**Module:** Owner Management (Admin)

## Overview

A screen for generating a revenue/payout report for a villa owner by villa and time period (either a predefined report period or a custom date range), showing a detailed table per booking (channel, customer, gross revenue, OTA commission, net revenue, service charges, payout, other charges, total, and notes) along with totals and averages, with Excel export capability.

## Detailed Description

### Filters

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | |
| 2 | Villa | `villa_id` | Select2 | Yes | |
| 3 | Owner | `owner_id` | Select (readonly, auto-filled based on villa) | — | |
| 4 | Period | `period` | Select | No | Includes "Add new period" / "Remove period" options |
| 5 | Date Range | `date_range` | Date range picker (with back/forward 1-month buttons) | No | |
| 6 | Total Amount | `total_amount` | Number (readonly, with copy button) | — | Calculated after generating |
| 7 | Average Amount | `average_amount` | Number (readonly, with copy button) | — | Calculated after generating |

### Detailed Report Table (after Generate)

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | Date | `date` | Date | |
| 2 | Channel | `show_channel` | Text | |
| 3 | Customer | `customer` | Text | |
| 4 | Gross Revenue | `gross` | Number | |
| 5 | OTA Commission | `ota_commission` | Number | |
| 6 | VAT (%) | `vat` | Number | Only shown if percentage-based VAT applies |
| 7 | Net Revenue | `net` | Number | |
| 8 | Daily Net Revenue | `daily_net` | Number | |
| 9 | Services (dynamic) | `services_array` | Number/% | Columns generated dynamically based on villa service categories |
| 10 | Payout | `owner` | Number (inline editable) | |
| 11 | Other | `other` | Number (inline editable) | |
| 12 | Total | `total` | Number | |
| 13 | Comment | `comment` | Text (inline editable) | |

## Functions / Actions

- **Generate**: calculates and displays the report table based on the applied filters.
- **Sync**: syncs the latest bookings before generating the report.
- **Export Excel**: exports the current report to an Excel file.
- **Copy** (copy icon next to Total Amount/Average): copies the value to the clipboard.
- **Remove Period**: opens a confirmation modal to delete a previously created custom report period.
- Inline editing of the "Other" and "Comment" cells on each booking row.

## Navigation

- Entered from: main menu (sidebar) item "Generate Report"; also linked from the Property page (report_ready.ctp).
- No separate page-level popups; the period-removal modal is an in-page action modal on the same screen.
