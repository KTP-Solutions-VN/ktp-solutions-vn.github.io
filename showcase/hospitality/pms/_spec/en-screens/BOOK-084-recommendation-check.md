# BOOK-084 — Run Pricing Check

**Type:** Full page
**Route:** Booking/recommendationCheck
**Pretty route:** No dedicated route found in config/Routes.php
**Module:** Reservations

## Overview
A screen that analyzes villa occupancy rates against a configured set of criteria (Criteria) set up in BOOK-080/081/082, helping to identify villas that require price adjustments or promotions (red = low occupancy, green = high occupancy) across the Last Minute/Regular/Early Bird time horizons. Allows logging comments for each villa.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | Yes | |
| 2 | Property Type | `property_type` | Select | Yes | Villa category (VillaCategory), with an "All" option |
| 3 | Criteria | `criteria_id` | Select | Yes | List of criteria sets created in BOOK-080 |

### Results Table (loaded via AJAX after clicking Check)
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa name (the first row is "Average" — the overall average) |
| 2 | Last Minute | +/-/= indicator showing occupancy rate relative to the threshold (green/red/neutral) |
| 3 | Regular | Same as above |
| 4 | Early Bird | Same as above |
| 5 | Last Log | Date and content of the most recent note for that villa |
| 6 | Actions | Edit icon — opens a modal to add a note |

## Functions / Actions
- **Check** button — calls the `getRecommondationCheck` AJAX action to compute and render the results table into `#analysis_data`
- **Edit** icon on each villa row — opens the "Add Log" modal to enter a note (`comment`)
- **Save** button in the modal — calls the `saveRecommendationLog` AJAX action to save the note (appended to the `RecommendationCheck` `log` history), then reloads the results table

## Navigation
- Opened from: BOOK-083 (Pricing Signals) — "Check" button
- Navigates to: no sub-page; note logging is handled via a modal within the same page

**Note:** `getRecommondationCheck()` (~16505) and `saveRecommendationLog()` (~16638) are AJAX actions returning JSON that directly support this screen; there is no separate view, so they are not split into a separate file.
