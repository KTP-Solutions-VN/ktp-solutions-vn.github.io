# BOOK-080 — Villa Recommendation Criteria

**Type:** Full page
**Route:** Booking/criteria
**Pretty route:** no dedicated route found in config/Routes.php
**Module:** Booking

## Overview
A list of criteria sets used to evaluate villa occupancy rates across different time horizons (Last Minute/Regular/Early Bird), supporting the "Recommendation Check" feature (BOOK-084). Each criteria set can be added, edited, or deleted.

## Detailed Description

### Displayed Columns
| # | Column | Notes |
|---|---|---|
| 1 | Criteria | Name of the criteria set, e.g. "Standard Occupancy" |
| 2 | Actions | Edit (opens BOOK-082), Delete |

## Functions / Actions
- **Add new** button — opens the BOOK-081 popup (Add Criteria)
- **Edit** icon on each row — opens the BOOK-082 popup (Edit Criteria), passing a base64-encoded `id`
- **Delete** icon on each row — opens a confirmation modal, calls `deleteCriteria/:id` on confirmation (deletes the `Recommendation` record)

## Navigation
- Opened from: Booking module menu > Recommendations (BOOK-083) > Criteria
- Navigates to: BOOK-081 (Add Criteria), BOOK-082 (Edit Criteria)

**Note:** `deleteCriteria($id)` (line ~16425) is simply a delete action with a redirect, not a separate screen, so it is not documented in its own file.
