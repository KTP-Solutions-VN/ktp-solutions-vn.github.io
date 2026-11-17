# BOOK-101-P1 — Villa Staff Detail

**Type:** Popup / sub-page (opened from BOOK-101)

**Route:** Booking/staffDetail (default: `/booking/staff-detail?booking_id=...&clean_id=...&makeup_id=...&villa_id=...`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Booking

## Overview

Displays information about the staff assigned to checkout, cleaning, and additional bed-making/sanitation (makeup) tasks for a villa: who performed the task, the time, the start/end locations, and the distance to the villa. Accessed by clicking the "Staff" icon on a villa row in BOOK-101 (shown only when the villa has a booking).

## Detailed Description

**Input Parameters (query string, not a form):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Booking ID | booking_id | Query param | Yes | |
| 2 | Cleaning Record ID | clean_id | Query param | No | "null" if not yet available |
| 3 | Makeup Record ID | makeup_id | Query param | No | "null" if not yet available |
| 4 | Villa ID | villa_id | Query param | Yes | |

**Displayed Content (read-only):**

| # | Information Block | Content | Notes |
|---|---|---|---|
| 1 | Villa name + coordinates | villa_name, villa_detail (lat/lng) | Rounded to 3 decimal places |
| 2 | Checkout | Staff name (emoticon - usage_name - first_name), table: Start/Start Location/Start Distance/End/End Location/End Distance | If the villa has not yet completed checkout, the concierge staff assigned to the villa is shown as the default person |
| 3 | Cleaning | Cleaning staff name, cleaning date, "Clean" button (Preview) | Shown only when `cleaning_status == 3` (cleaning completed) |
| 4 | Makeup | Makeup staff name, cleaning date, "Clean" button (Preview) | Shown only when `cleaning_status == 3` |

## Functions / Actions

- View-only; no data entry form on this popup.
- "Clean" button in the Cleaning block opens `/VM/villa-services/planning-teams-detail/:id/staff` (part of the Villa Services module, outside the scope of Booking).
- "Clean" button in the Makeup block opens `/VM/villa-services/makeup-teams-detail/:id/staff` (part of the Villa Services module, outside the scope of Booking).
- Close icon (close image) returns to BOOK-101 (Property Status).

## Navigation

- Opened from BOOK-101 ("Staff" icon on a villa row with a booking).
- Navigates to Villa Services (planning-teams-detail / makeup-teams-detail) when the "Clean" button is clicked — outside the scope of this Booking documentation.
- Closing the popup returns to BOOK-101.
