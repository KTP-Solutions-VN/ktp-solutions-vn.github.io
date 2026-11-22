# BOOK-062 — Report Exclusions

**Type:** Full page
**Route:** Booking/exception/:tab? (default: `/booking/exception`)
**Module:** Reservations

## Overview
Manages a list of keywords (typically guest names) excluded from booking reports/statistics, grouped into 4 categories: full exclusion (Complete), zero value (Nill Value), early exclusion (Early), and late exclusion (Late). Used to filter internal/owner-stay bookings out of business figures.

## Detailed Description

### Tabs
| # | Tab | Field Code |
|---|---|---|
| 1 | Complete | `complete` |
| 2 | Nill Value | `nill_value` |
| 3 | Early | `early` |
| 4 | Late | `late` |

### Fields (per tab)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Keyword | `keyword` | Text | Yes | Typically the guest's name/surname to exclude |

### List (per tab)
| # | Column | Notes |
|---|---|---|
| 1 | Keyword | |
| 2 | Actions | Edit/Delete |

## Functions / Actions
- Add an exclusion keyword under the currently selected tab
- Edit a keyword
- Delete a keyword (writes an activity log entry)
- Check for duplicate keywords before saving (`keywordCheck`)

## Navigation
- Opened from: Reservations module menu > Report Exclusions
