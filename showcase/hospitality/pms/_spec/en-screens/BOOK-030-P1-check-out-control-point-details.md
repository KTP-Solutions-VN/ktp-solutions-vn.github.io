# BOOK-030-P1 — Departure Checkpoint Details

**Type:** Popup (opened from BOOK-030)
**Route:** Booking/viewCheckOutDetail/:id/:check_out_date/:booking_id
**Module:** Reservations

## Overview
A popup for viewing the details of a single check-out control run: villa information, satisfaction rating, damage/comment notes, and the control items.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa (Property) | `data_array.name` | Text (readonly) | - | |
| 2 | Satisfaction score | `satisfaction_text` | Text (readonly) | - | |
| 3 | Comment | `comment_text` | Text (readonly) | - | |
| 4 | Control point | `point_text` | Sub-table | - | List of check-out control items |

## Functions / Actions
- View the check-out control results for each item

## Navigation
- Opened from: BOOK-030 (Departure Audit)
- Closing the popup returns to BOOK-030
