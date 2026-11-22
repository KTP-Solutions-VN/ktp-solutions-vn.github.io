# BOOK-029 — Arrival Audit

**Type:** Full page
**Route:** Booking/checkInControl (default: `/booking/check-in-control`)
**Module:** Reservations

## Overview
A list of villa control points to be performed at check-in, for each villa/assigned staff member, along with start/end time, GPS location confirmation, and comments.

## Detailed Description
The list is displayed as a table with the following columns:
| # | Column | Notes |
|---|---|---|
| 1 | Villa (house icon) | Villa name |
| 2 | Staff (person icon) | Staff member performing the task |
| 3 | Start | Start time |
| 4 | End | End time |
| 5 | GPS | Coordinates confirming the location where the task was performed |
| 6 | Comments | Notes (25% width) |
| 7 | Actions | Action buttons (view details) |

## Functions / Actions
- View the details of each control point (opens BOOK-029-P1)
- Filter/collapse groups by villa ("closeBtn" collapse button)

## Navigation
- Opened from: Reservations module menu > Arrival Audit
- Navigates to: BOOK-029-P1 (Arrival Checkpoint Details)
