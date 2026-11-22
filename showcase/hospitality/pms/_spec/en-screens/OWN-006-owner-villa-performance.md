# OWN-006 — Property Performance

**Type:** Full page

**Route:** `/Owner/performance` (controller `Owner`, action `performance()`)

**Module:** Owner Relations (Admin)

## Overview

A screen presenting business performance statistics for a villa by owner: Nights Booked, revenue, and Outlook metrics (current month/next month/until year-end) compared against previous years, supporting evaluation of villa operational effectiveness.

## Detailed Description

### Filters

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 | No | |
| 2 | Villa | `villa_id` | Select2 | Yes (to view results) | |

### Outlook Table

| # | Column Name | Field Code | Data Type | Notes |
|---|---|---|---|---|
| 1 | Metric | — | Text | "Nights Booked" and other revenue metrics |
| 2 | Current Month | `out_look.current_month` | Number | |
| 3 | Next Month | `out_look.next_month` | Number | |
| 4 | Until Year-End | `out_look.till_year_end` (similar) | Number | |

The screen also compiles year-over-year performance comparison data (current year, previous year, first year with available data) to support trend charts/comparisons.

## Functions / Actions

- **Search**: reloads performance figures for the selected villa/business unit.

## Navigation

- Entered from: main menu (sidebar) item "Property Performance".
- No child popups; this is a standalone screen.
