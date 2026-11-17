# BOOK-079 — Guest Arrival Preparation Work

**Type:** Full page (opened from BOOK-078)
**Route:** Booking/preparationWork/:button/:booking_id
**Pretty route:** no dedicated route found in config/Routes.php
**Module:** Booking

## Overview
Form for logging the preparation work for an arriving VIP guest: cleaning status and check-in preparation status, supporting the operations team ahead of the VIP guest's arrival.

**Note on routing:** There are 2 related actions in this feature group:
- `preparationWork($button = null, $booking_id = null)` (line ~16796): this is the action that **actually renders the `preparation_work.ctp` view** — it takes the `$button` parameter (`green-icon` if history already exists, another value otherwise for a new entry) and `$booking_id`; on POST it saves a log to the `VipGuestInformation` table and redirects to BOOK-078. This is the primary route for this screen.
- `viewPreparationWork()` (line ~16909): a pure AJAX action returning JSON (`response`/`result`/`message`, with `_serialize`) for another component to retrieve the log history — **it does not render a UI** and has no separate file.

## Detailed Description

### Form
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Cleaning | `cleaning` | Textarea | Yes | Note on cleaning status; the history of prior notes (author, date, content) is displayed above if `$button = green-icon` |
| 2 | Check-in (Preparation) | `check_in` | Textarea | Yes | Note on guest-arrival preparation work; similarly displays prior history |

## Functions / Actions
- **"Let's get ready!"** button (submit) — saves a new log entry to `VipGuestInformation.data` (appending to the `cleaning`/`check_in` history array if it already exists), then redirects to BOOK-078 (VIP Guests)
- **Cancel** button (reset) — clears the content currently entered on the form

## Navigation
- Opened from: BOOK-078 (VIP Guest List) — clicking the "Get Ready" icon (blue/green) on a booking
- Navigates to: back to BOOK-078 after a successful or failed save
