# BOOK-106 — Guest Origins

**Type:** Full page

**Route:** Booking/nationalities (default: `/booking/nationalities`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

Manage "nationality groups" (mega-nationality groups) — grouping multiple guest nationalities into a common group with notes on business behavior/conduct — organized by the geographic region (country) of the business unit. Used to classify guests by region for operational/marketing purposes.

## Detailed Description

**Filters:**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | country_id (country_filter) | Select | No | Fixed list in the order Singapore, Greece, France; defaults to the user's country |

**Nationality Group List (cards):**

| # | Field | Field Code | Notes |
|---|---|---|---|
| 1 | Group Name | name | |
| 2 | Nationalities in Group | nationality_ids | Displayed as tags |
| 3 | Edit Button | — | Opens the form on the right, pre-filled with data |
| 4 | Delete Button | — | Deletes the group |

**Add/Edit Group Form (right-hand panel):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Group Name | name | Text | Yes | |
| 2 | Nationalities | nationality_ids | Select2 multiple | Yes | Sourced from the list of countries with guests booked in the past year (from `guest_details`), excluding nationalities already assigned to other groups |
| 3 | Business Behavior Notes | behaviour | Textarea | Yes | |
| 4 | ID (hidden, when editing) | id | Hidden | — | |

**"Unassigned Nationalities" section:** lists nationalities not yet assigned to any group.

## Functions / Actions

- "New Group": opens an empty form on the right to create a new group.
- Edit icon on each group: populates the form on the right for editing (via modal `#exampleModal`).
- Delete icon on each group: deletes the group (submits action=delete).
- "Save" (groupBtn): saves a new group or updates an existing one (submits action=add/edit via form `group_form`).
- "Cancel": cancels the current edit operation.
- Changing the Country + "Load": reloads the group list filtered by the selected country.
- Superadmin: can view groups for all countries; regular users can only view groups for their business unit's country.

## Navigation

- Accessed from the Settings menu ("Booking-standardTime" group) in the management sidebar.
- Does not navigate to other screens; all operations are performed in place (form submit/redirect back to this same page).
