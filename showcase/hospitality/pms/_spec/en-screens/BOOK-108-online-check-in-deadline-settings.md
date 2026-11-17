# BOOK-108 — Online Check-in Deadline Settings

**Type:** Full page

**Route:** Booking/onlineCheckinDeadlineSettings

**Friendly route:** `/booking/online-checkin/deadline-settings`

**Module:** Booking

## Overview

Configure "deadline groups" (deadline rules) measured in number of days before the check-in date, and assign each active Business Unit to exactly one deadline group — used to determine when an incomplete online check-in should trigger a warning.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | country | Dropdown (custom, not a standard `<select>`) | No | "All countries" or the list of countries with active business units; client-side display filter only |

**Each "Deadline Group Card" includes:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Number of Days Before Check-in | days | Number input | Yes | 0–60, must not duplicate across groups |
| 2 | Assigned Business Units | assignments | Multi-select as chips (drag/assign via modal) | Yes | Each business unit belongs to exactly one group; selecting a business unit already in another group automatically removes it from that group |
| 3 | Updated By / Updated At | updated_by, updated_at | Display | — | |

Includes a "Business Units without a deadline" area warning about business units not yet assigned to any group, and a preview block illustrating the warning threshold based on a sample check-in date (today + 10 days).

## Functions / Actions

- "Add new Deadline": adds a new deadline group (client-side, not saved immediately).
- Assign/unassign a Business Unit to each group via a selection modal (client-side).
- "Delete deadline": deletes a deadline group (warns if the group has assigned business units, requiring them to be moved to another group first).
- "Save Changes": submits the full `rules` + `assignments` payload to AJAX `saveOnlineCheckinDeadlineSettings` (POST, JSON payload); validates: unique day count (0–60), all eligible business units must be assigned, each group must have at least 1 business unit. Saved within a transaction (creates/updates `OnlineCheckinDeadline` records and the `OnlineCheckinDeadlineBusinessUnit` assignment table, deleting groups left with no business units).
- "Unsaved changes" status is displayed when there are unsaved modifications.

## Navigation

- Accessed from the Settings menu ("Booking-standardTime" group), near BOOK-106 and BOOK-107.
- Does not navigate to other pages; all operations are handled via AJAX directly on this page (breadcrumb points back to BOOK-002, the bookings list).
