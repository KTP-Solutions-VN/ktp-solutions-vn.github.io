# BOOK-081 — Add Villa Recommendation Criteria

**Type:** Popup (opened from BOOK-080)
**Route:** Booking/addCriteria
**Pretty route:** no dedicated route found in config/Routes.php
**Module:** Booking

## Overview
Form for adding a new set of criteria for evaluating villa occupancy across 3 fixed time horizons: Last Minute (close to the date), Regular (mid-range), and Early Bird (booked ahead), each with an "under"/"over" threshold used to color-code results red/green during a check.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Criteria Name | `name` | Text | Yes | Name of the criteria set |
| 2 | Last Minute — Days | `criteria_data[0][days]` | Number | Yes | Number of days counting back from today (the "Less than" threshold) |
| 3 | Last Minute — Under Threshold | `criteria_data[0][under]` | Number | Yes | Occupancy % below this threshold → colored red |
| 4 | Last Minute — Over Threshold | `criteria_data[0][over]` | Number | Yes | Occupancy % above this threshold → colored green |
| 5 | Regular — Day Range | `criteria_data[1][days]` (automatic) | Calculated display | - | Automatically composed as "Last Minute days — Early Bird days" on save, shown directly in the UI (not manually entered) |
| 6 | Regular — Under Threshold | `criteria_data[1][under]` | Number | Yes | |
| 7 | Regular — Over Threshold | `criteria_data[1][over]` | Number | Yes | |
| 8 | Early Bird — Days | `criteria_data[2][days]` | Number | Yes | The "More than" threshold |
| 9 | Early Bird — Under Threshold | `criteria_data[2][under]` | Number | Yes | |
| 10 | Early Bird — Over Threshold | `criteria_data[2][over]` | Number | Yes | |
| 11 | Up To (Early Bird upper limit) | `up_to` | Number | Yes | Maximum number of days counted from the Early Bird threshold onward |
| 12 | Exclude Villas With Notes Newer Than (X days) | `number_of_days` | Number | Yes | Excludes villas that have had a log entry recorded within the last X days during the check |

The three Last Minute/Regular/Early Bird rows have "Horizon" (the horizon name) and "Time" (Less than/Between/More than) columns that are fixed values (hidden inputs); the user only enters the day count and thresholds.

## Functions / Actions
- **Save** button (submit) — saves a new `Recommendation` record (the `criteria_data` is serialized), logs the activity, shows a success message, and returns to BOOK-080
- **Cancel** button (reset) — clears the entered data

## Navigation
- Opened from: BOOK-080 (Villa Recommendation Criteria) — "Add new" button
- Navigates to: back to BOOK-080 after saving
