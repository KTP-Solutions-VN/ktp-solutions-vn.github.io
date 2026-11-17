# BOOK-101-P2 — Adjust Villa Status (Adjust Detail)

**Type:** Popup / sub-page (opened from BOOK-101)

**Route:** Booking/adjustDetail (default: `/booking/adjust-detail?param=<booking_id>_<clean_id>_<makeup_id>_<villa_id>_<clean_status>_<makeup_status>_<guest_status>_<booking_id_2>_<mode>`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Booking

## Overview

Popup allowing quick adjustment of the cleaning, makeup, and guest status (check-in/check-out) of a villa directly from the BOOK-101 screen, instead of navigating into each individual module. Accessed via the "Adjust" icon on a villa row (shown only when the villa is not currently in "Checking-out" status).

## Detailed Description

The `param` parameter is a string concatenation of 9 values separated by `_`: booking_id, villasclean_id (clean_id), makeupclean_id, villaId, clean_status, makeup_status, guest_status, booking_id_2, mode.

**Conditionally Displayed Adjustment Forms:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest Status (Check-out) | left_option_checkout | Select: Select/Early check-out/Late check-out/No show | No | Shown only when `guest_status` has a value and `mode` = 1 or 3 |
| 2 | Guest Status (Check-in) | left_option_checkin | Select: Select/Early check-in/Late check-in/No show | No | Shown only when `guest_status` has a value and `mode` = 2 or 3 |
| 3 | Cleaning Status | right_option (clean_status) | Select: Clean / To be Cleaned | No | Shown only when `clean_status` has a value; defaults to the current value |
| 4 | Makeup Status | makeup_option (makeup_status) | Select: Clean / To be Cleaned | No | Shown only when `makeup_status` has a value |

## Functions / Actions

- "Update" button next to each select sends a separate AJAX call per status type:
  - Cleaning status → `updateCleaningstatus` (blocked if the selected status matches the current one, reported via Sweetalert).
  - Makeup status → `updateMakeupstatus` (same behavior).
  - Guest check-in/check-out status → `updateGueststatus`.
- After successfully updating the cleaning/makeup status, redirects back to BOOK-101.
- Close icon (close image) returns to BOOK-101.

## Navigation

- Opened from BOOK-101 ("Adjust" icon on a villa row, hidden when the guest is currently in "Checking-out" status).
- After saving the cleaning/makeup status, automatically returns to BOOK-101.
- Closing the popup returns to BOOK-101.
