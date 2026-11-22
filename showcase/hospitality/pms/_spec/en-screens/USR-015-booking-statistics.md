# USR-015 — Reservation Analytics

**Type:** Full page

**Route:** `UserController::statistics()` — default `user/statistics`

**Module:** Sign-in & Workforce

## Overview
A consolidated reporting/statistics page for bookings, filterable by date range, business unit, and sales channel: total bookings, total nights, average length of stay, average lead time, distribution by lead time, distribution by day of month/week, and a report by guest nationality.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date Range (Month) | `selected_months` | Date range/month picker | No | Defaults to the previous month; submitted via POST |
| 2 | Business Unit | `business_unit_id` | Select2 | No | Based on the `business_units` the user has access to |
| 3 | Sales Channel | `channel_name` | Select2 | No | Filters via `Booking.referer LIKE` |

**Displayed Metrics/Blocks:**

| # | Block | Field Code | Notes |
|---|---|---|---|
| 1 | Total Bookings | `data_arr.total_arr.total_booking` | KPI |
| 2 | Total Nights | `data_arr.total_arr.total_night` | KPI |
| 3 | Average Length of Stay | `data_arr.total_arr.average_length_of_stay` | KPI |
| 4 | Average Lead Time (days) | `data_arr.total_arr.average_lead_time` | KPI |
| 5 | Distribution by Lead Time | `data_arr.lead_time_distribution` | Table/chart |
| 6 | Average Price by Lead Time | `data_arr.average_price_by_lead_time` | Table |
| 7 | Booking Rate by Early/Mid/Late Month | `data_arr.total_arr.booking_day_of_month` | 3 percentage blocks |
| 8 | Trend by Day of Week | `data_arr.day_of_week_pattern` | Table (booking date / check-in date) |
| 9 | Report by Nationality | `data_arr.nationality_report` | Table, with color badges based on average lead time |

## Functions / Actions
- **Filter (submit form via GET/POST):** recalculates all figures based on the selected filters.

## Navigation
- Entry point: Workforce menu → Reservation Analytics.
- No further navigation to other screens.
