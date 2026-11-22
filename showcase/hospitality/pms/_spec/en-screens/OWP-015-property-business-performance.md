# OWP-015 — Performance Trends

**Type:** Full page

**Route:** `ExternalUserController::performance()` — no dedicated friendly route (default `/external-user/performance`)

**Module:** Owner Hub

## Overview

A page analyzing a property's business performance: revenue outlook for the current month/upcoming month/full year, monthly rental revenue across years, monthly occupancy rate, and financial indicators (ROI, financial value).

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa_id | Select2 | Yes | List of currently open properties |

"Outlook" block (forecast):

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Nights booked | nights_booked | By current month / upcoming month / year-to-date |
| 2 | Occupancy rate | occupancy | |
| 3 | Revenue | revenue | |
| 4 | Net owner receipt | net_owner | |

"Rental Revenue" and "Occupancy" tables — columns for 12 months (Jan-Dec) + Year + Average + Growth, comparing 3 years (current year, prior year, two years prior).

"Financial Ratios" block: Return on Investment (ROI), Financial Value.

## Functions / Actions

- Search/view performance by property ("Search" button)
- View charts/tables comparing across years

## Navigation

- Accessed from the main menu (Performance Trends)
- No navigation to another screen
