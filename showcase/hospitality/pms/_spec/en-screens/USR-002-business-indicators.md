# USR-002 — Revenue Scorecard

**Type:** Full page

**Route:** `UserController::indicators()` — default `user/indicators`

**Module:** Sign-in & Workforce

## Overview
A revenue reporting/chart screen (past and future) segmented by business unit, sales channel, revenue type, and date range, for Superadmin/Admin/Business Unit Manager to track villa business performance. Data is aggregated from bookings and converted using the reference currency.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | From Date | `from` | Text (date picker) | Yes | Defaults to Jan 1 of the current year |
| 2 | To Date | `to` | Text (date picker) | Yes | Defaults to Dec 31 of the current year |
| 3 | Ownership Type | `owner_ship_type` | Select | No | Source: `Azura Stays`, `Partner`, `All` |
| 4 | Currency | `currency` | Select2 | Yes | Source: `Currency` table; defaults to the reference currency (`is_reference_currency=1`) |
| 5 | Business Unit / Region | `business_unit[]` | Select2 multiple | No | Source: business units per user permissions + zone (`BusinessUnitZone`) |
| 6 | Sales Channel | `chanel[]` | Select2 multiple | No | Source: `Chanel` table + "Direct Booking", "All" |
| 7 | Revenue Type | `revenue_type` | Select2 | Yes | Gross revenue / Net revenue / Gross margin / Owner revenue |

Results are displayed as a monthly chart/table: past revenue (`past_amount`), future revenue (`future_amount`), and totals.

## Functions / Actions
- **Filter/View Report (submit form via POST):** recalculates figures based on the selected criteria.
- No add/edit/delete functionality — this is a read-only report screen.

## Navigation
- Entry point: main menu (Revenue Scorecard item), after login.
- Navigates to: no child navigation.
