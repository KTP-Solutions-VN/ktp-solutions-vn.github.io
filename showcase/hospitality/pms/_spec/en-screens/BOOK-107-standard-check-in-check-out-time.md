# BOOK-107 — Default Stay Times

**Type:** Full page

**Route:** Booking/standardTime (default: `/booking/standard-time`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

Configure the standard check-in and check-out times for each Business Unit.

## Detailed Description

**List:**

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No | — | Row number |
| 2 | Business Units | name | Business unit name |
| 3 | Check In Time | check_in_time | Format H:i A |
| 4 | Check Out Time | check_out_time | Format H:i A |
| 5 | Action | — | Edit / Delete buttons |

Only displays business units whose `check_in_time`/`check_out_time` differ from `00:00:00`.

**Add/Edit Form (modal):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit_id | Select | Yes | Selectable only when adding new; fixed to the row being edited when editing |
| 2 | Check In Time | check_in_time | Time picker | Yes | |
| 3 | Check Out Time | check_out_time | Time picker | Yes | |
| 4 | ID (hidden, when editing) | id | Hidden | — | |

## Functions / Actions

- "Add New" (modal `#exampleModal`): adds a standard time configuration for a business unit (action=save by default).
- Edit icon: opens the modal pre-filled with the selected row's data (action=edit).
- Delete icon: resets that business unit's `check_in_time`/`check_out_time` back to `00:00:00` (action=delete).
- Each save/edit/delete operation is recorded in the Activity Log and displays a success/error flash message.

## Navigation

- Accessed from the Settings menu ("Booking-standardTime" group) in the management sidebar, alongside BOOK-106 and BOOK-108.
- After save/edit/delete, reloads this same page (redirect referer).
