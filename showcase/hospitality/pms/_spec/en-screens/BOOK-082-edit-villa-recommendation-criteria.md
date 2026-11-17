# BOOK-082 — Edit Villa Recommendation Criteria

**Type:** Popup (opened from BOOK-080)
**Route:** Booking/editCriteria/:id
**Pretty route:** no dedicated route found in config/Routes.php
**Module:** Booking

## Overview
Form for editing an existing criteria set, with a field structure identical to BOOK-081 but pre-populated with the criteria's current values (`$id` is passed as a base64-encoded value).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Criteria Name | `name` | Text | Yes | Pre-populated with the `data_array['name']` value |
| 2 | Last Minute — Days | `criteria_data[0][days]` | Number | Yes | |
| 3 | Last Minute — Under Threshold | `criteria_data[0][under]` | Number | Yes | |
| 4 | Last Minute — Over Threshold | `criteria_data[0][over]` | Number | Yes | |
| 5 | Regular — Day Range | `criteria_data[1][days]` (automatic) | Calculated display | - | |
| 6 | Regular — Under Threshold | `criteria_data[1][under]` | Number | Yes | |
| 7 | Regular — Over Threshold | `criteria_data[1][over]` | Number | Yes | |
| 8 | Early Bird — Days | `criteria_data[2][days]` | Number | Yes | |
| 9 | Early Bird — Under Threshold | `criteria_data[2][under]` | Number | Yes | |
| 10 | Early Bird — Over Threshold | `criteria_data[2][over]` | Number | Yes | |
| 11 | Up To | `up_to` | Number | Yes | |
| 12 | Exclude Villas With Notes Newer Than (X days) | `number_of_days` | Number | Yes | |

All criteria data (`criteria_data`) is unserialized from the `Recommendation` record for display on the form.

## Functions / Actions
- **Save** button (submit) — updates the `Recommendation` record by `id`, logs the activity, shows a success message, and returns to BOOK-080
- **Cancel** button (reset) — discards the entered changes
- If the `id` is invalid or no data is found — an error message is shown and the user is redirected to BOOK-080

## Navigation
- Opened from: BOOK-080 (Villa Recommendation Criteria) — Edit icon on each row
- Navigates to: back to BOOK-080 after saving
