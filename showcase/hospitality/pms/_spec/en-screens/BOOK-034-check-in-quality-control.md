# BOOK-034 — Check-in Quality Control

**Type:** Full page (opened following BOOK-029/BOOK-029-P1)
**Route:** Booking/qualityControl/:checkin_detail_id/:date/:villa_id (default: `/booking/quality-control/...`)
**Module:** Booking

## Overview
A screen for reconciling the quality of the check-in process performed: comparing the staff member who performed the task against the assigned staff member (concierge), comparing the actual GPS location against the villa's location (matching or differing), and comparing the planned check-in time against the actual time.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `data_array.villa_name` | Text (readonly) | - | |
| 2 | Staff who performed the task | `data_array.user_name` | Text (readonly) | - | Shown in red if different from the assigned concierge |
| 3 | Assigned staff member | `data_array.planning_name` | Text (readonly) | - | Shown only when different from the staff who performed the task |
| 4 | Location | `data_array.location` | Text (readonly: same/differ) | - | Compares the GPS distance between the villa and the location where the task was performed (200m threshold) |
| 5 | Planned time | `data_array.planned_time` | Text (readonly) | - | |
| 6 | Actual time | (actual time) | Text (readonly) | - | |

## Functions / Actions
- Automatic reconciliation, with no edit actions — used for monitoring execution quality

## Navigation
- Opened from: BOOK-029 (Check-in Control) / BOOK-029-P1
- No further navigation — this is the final results screen
