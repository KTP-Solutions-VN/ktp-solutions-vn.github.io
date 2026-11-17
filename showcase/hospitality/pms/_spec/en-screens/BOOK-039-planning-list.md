# BOOK-039 — Planning List

**Type:** Full page
**Route:** Booking/planningList (default: `/booking/planning-list`)
**Module:** Booking

## Overview
List of requests/plans related to check-in/check-out by villa: booking channel, time, responsible concierge, and chat status with the guest. Supports filtering by business unit, date range, and data export.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | |
| 2 | Select Date | `select_date` | Datepicker | No | |
| 3 | Export Data | `export` | Checkbox/button | No | Exports the current list to a file |

### Displayed Columns
| # | Column | Notes |
|---|---|---|
| 1 | Sr No | Sequence number |
| 2 | Check by | Check type (check-in/check-out) |
| 3 | Villa | |
| 4 | Channel | Booking channel |
| 5 | Name | Guest name |
| 6 | Country | Nationality |
| 7 | Time | Expected time |
| 8 | By | Person performing the task |
| 9 | Request | Special request |
| 10 | Concierge | Responsible concierge |
| 11 | Chat Status | Chat status with the guest |

## Functions / Actions
- Filter by business unit and date
- Export data
- View details of each planning row

## Navigation
- Opened from: Booking module menu > Planning
- Navigates to: BOOK-040 (Villa Planning Calendar)
