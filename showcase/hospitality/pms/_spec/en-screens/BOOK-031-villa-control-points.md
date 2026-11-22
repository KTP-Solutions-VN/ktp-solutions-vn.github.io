# BOOK-031 — Audit Checkpoints

**Type:** Full page
**Route:** Booking/checkControlPoint (default: `/booking/check-control-point`)
**Module:** Reservations

## Overview
A list of villas by business unit, showing the number of control points and reminders configured for each villa. This is the master administration/configuration screen underlying the check-in/check-out control process (BOOK-029, BOOK-030).

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | "All" + the list of BUs per the user's permissions; selecting a value re-submits via POST and saves to a cookie |

### Displayed Columns of the Villa List
| # | Column | Notes |
|---|---|---|
| 1 | Property (villa name) | |
| 2 | Control Points | Number of configured control points (counted from VillaControl) |
| 3 | Reminders | Number of reminders (counted from VillaReminder) |
| 4 | Actions | Action buttons |

## Functions / Actions
- Filter by business unit
- View/manage control points and reminders for each villa

## Navigation
- Opened from: Reservations module menu > Audit Checkpoints
- Navigates to: detailed control point/reminder configuration by villa (within the scope of the Villa module)
