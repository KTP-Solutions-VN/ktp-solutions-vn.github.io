# BOOK-088 — Monitored Stays

**Type:** Full page
**Route:** Booking/watchList
**Pretty route:** No dedicated route found in config/Routes.php (the URL uses the form `/booking/watch-list?business_unit=...` per the script in the view)
**Module:** Reservations

## Overview
A list of bookings that require special monitoring based on guest nationality/phone number (per the list of countries configured for monitoring for each business unit), helping to identify bookings from guest groups requiring attention (e.g. by country phone code). Allows marking each booking as "seen" and exporting an Excel report.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select | No | Changing the value reloads the page |
| 2 | Watched Country List | `country_name` | Multi-select | No | List of countries whose guest bookings (by nationality/phone number) will be added to the watch list; saved to the `CountryWatchList` table per business unit (also applies to child BUs if it is a "zone") |

### Displayed Columns
| # | Column | Notes |
|---|---|---|
| 1 | Check-in | Check-in date |
| 2 | Check-out | Check-out date |
| 3 | Property | Villa name |
| 4 | Guest Name | Guest full name |
| 5 | Country | Country (inferred from the guest's phone number code) |
| 6 | Group Chat | Group chat status, link to open/activate chat (`activateChat`) |
| 7 | Seen By | If already marked as seen (`is_watch_list = yes`): the name of the person who viewed it; if not: an eye icon to mark as seen |

Only bookings with a check-out date from yesterday onward, that are not cancelled, and whose guest phone number matches the code of the watched country/countries are displayed.

## Functions / Actions
- **Updated** button (submit filter) — saves the watched country list for the business unit and reloads the list
- Eye icon on each row — marks the booking as seen (`watch_list = 1`, `watched_by` = current user)
- **Download** icon — exports an Excel (`.xlsx`) file of the entire current list (columns: Check-In, Check-Out, Property, Guest Name, Country, Group Chat, Seen By)
- **Group Chat** status link — opens/activates the booking's chat group (`activateChat` action)

## Navigation
- Opened from: Reservations module menu > Monitored Stays
- Navigates to: no dedicated sub-page; the chat group is opened via the `activateChat` action (outside the scope of this screen group)
