# USR-022 — Time Clock

**Type:** Full page

**Route:** `UserController::clockIn()` — default `user/clockIn`

**Module:** Sign-in & Workforce

## Overview
A page allowing staff to start their workday ("Start my day"), end their workday ("End my day"), or mark a day off ("Day off today"). The system retrieves the current GPS location from the browser and matches it against the staff member's registered office to display a message such as "I am at [office name]".

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Latitude | `lat` | Hidden | Yes | Retrieved automatically via `navigator.geolocation` |
| 2 | Longitude | `lon` | Hidden | Yes | Retrieved automatically via `navigator.geolocation` |
| 3 | Time | `time` | Hidden | Yes | Auto-filled with the current time, updated every minute |

## Functions / Actions
- **Start my day:** shown when the user has not yet clocked in for the day; saves `clock_in_time` and `clock_in_location` (matched against offices within a 100m radius), and sets the session flag `is_start_clock_in = yes`.
- **Day off today:** marks `is_user_day_off = yes` for the current day, then logs the user out.
- **End my day:** shown after clocking in and before clocking out; saves `clock_out_time` and `clock_out_location`, then logs the user out.
- Location message (ajax `getClockInMessage`) displays "I am at [office name]" with the office photo if matched, or a message indicating the location could not be determined.

## Navigation
- Entry point: main menu (for staff who clock in), or enforced upon login if the user has not yet clocked in (depending on permission configuration).
- Navigates to: LOG-001 (Sign In) after "End my day" or "Day off today" (the system logs the user out).
