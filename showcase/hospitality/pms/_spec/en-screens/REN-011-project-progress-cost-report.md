# REN-011 — Project Progress & Cost Report

**Type:** Full page
**Route:** renovation/report/:id + dashed-style route: renovation/report/:id (id passed as base64)
**Module:** REN = Renovation

## Overview
Read-only screen presenting a summary report comparing the plan versus actual figures for a renovation project across four criteria: start date, completion date, construction duration, and total cost, along with the variation between them.

## Detailed Description

### Displayed Columns
| # | Column | Notes |
|---|---|---|
| 1 | (Metric name) | Starting Date / Completion Date / Duration / Expenses |
| 2 | Plan | Planned value (`start_date`, `end_date`, planned number of days, `total_budget_amount`) |
| 3 | Actual | Actual value (`actual_start_date`, `actual_end_date`, actual number of days, `total_real_amount`) |
| 4 | Variation | Difference between actual and plan (days early/late, cost difference) |

## Functions / Actions
- View only; no editing actions are available on this screen.

## Navigation
- Entered from: REN-003 — Renovation Project Follow-up.
- Leads to: no further navigation; return to REN-003 using the browser back button.
