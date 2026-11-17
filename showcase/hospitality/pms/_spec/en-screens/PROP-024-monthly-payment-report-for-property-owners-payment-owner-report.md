# PROP-024 — Monthly Payment Report for Property Owners (Payment/Owner Report)

**Type:** Full page
**Route:** property/payment-report
**Module:** PROP = Properties

## Overview
Screen for looking up and downloading the monthly reports (Monthly Report) sent to the owner of a specific property, filterable by Business Unit and Property, showing the projected next payment date.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | Yes (class `required`) | Changing the value reloads the Property list via AJAX `common/getBusinessUnitVilla` |
| 2 | Property | `villa_id` | Select2 | Yes | List of properties (status Open) belonging to the selected Business Unit |
| 3 | Search button | — | Submit button (`name="search"`) | — | |

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Name | `villas[villa_id]` | Text | No | |
| 2 | Owner | `last_name` | Text | No | |
| 3 | Report Name | `name` | Text | No | |
| 4 | Start | `start_date` | Datetime (`d M y`) | No | |
| 5 | End | `end_date` | Datetime (`d M y`) | No | |
| 6 | Sent On | `sent_on` | Datetime (`d M y`, shown only if `sent = 'True'`) | No | |
| 7 | Action | — | Download button | — | Downloads the report file from `/files/monthly-report/{url}` |

A notice line "Your Next Payment is scheduled on: {payment_date}" is displayed above the table when data is available.

## Functions / Actions
- "Search" button — submits the Business Unit + Property filter, queries `MonthlyReport` by `villa_id`, calculating the next payment date via `paymentDate()`.
- "Download Report" button on each row — downloads the corresponding report file.

## Navigation
- Opened from: the Property Reports/Payment menu (outside the scope of the current spec).
- Navigates to: downloaded file `/files/monthly-report/{url}` (not a page navigation).
- Child popup: none.
