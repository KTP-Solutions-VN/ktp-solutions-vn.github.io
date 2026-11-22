# BOOK-041 — Concierge Duty Roster

**Type:** Full page
**Route:** Booking/team (default: `/booking/team`)
**Module:** Reservations

## Overview
Screen for viewing the work schedule/assignments of the concierge team by business unit, used to quickly look up who is responsible for which villa on a given day.

## Detailed Description
Content is loaded dynamically via AJAX (the controller only sets the page title); the structure is similar to the calendar table in BOOK-040 but focused on a staff/team perspective rather than a villa perspective.

## Functions / Actions
- View the work schedule/assignments by staff member
- Navigate by date, filter by business unit

## Navigation
- Opened from: BOOK-040 (Handover Calendar)
- Navigates to: BOOK-028 (Reservation Record) when clicking on a specific booking
