# BOOK-040 — Handover Calendar

**Type:** Full page
**Route:** Booking/planning/:date? (default: `/booking/planning`)
**Module:** Reservations

## Overview
A visual calendar screen displaying the check-in/check-out plan and concierge work schedule by villa/business unit and by date, allowing quick viewing of team readiness status (Team Availability).

## Detailed Description

### Filters/Controls
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Date | `date` | Datepicker (date selection button) | No | Passed via the `date` route/query parameter |
| 2 | Business Unit | `business_unit`/`id` | Selection button (dropdown) | No | |
| 3 | Team Availability | `#team-avail` button | View mode toggle button | No | Displays team readiness status |
| 4 | Planning | `#team-plan` button | View mode toggle button | No | Displays the planning calendar mode |

### Data Table (loaded via AJAX by villa/date)
| # | Column | Notes |
|---|---|---|
| 1 | Name | Guest/staff name |
| 2 | Avatar | Avatar image |
| 3 | Check-in | Check-in date/time |
| 4 | Check-out | Check-out date/time |
| 5 | Start | Shift/task start time |
| 6 | End | Shift/task end time |

## Functions / Actions
- Switch between "Team Availability" and "Planning" view modes
- Navigate by date, filter by business unit
- Update the plan (linked to the `savePlanning`, `updateBookingPlan` actions)

## Navigation
- Opened from: BOOK-039 (Handover Schedule), Reservations module menu > Handover Calendar
- Navigates to: BOOK-041 (Concierge Duty Roster)
