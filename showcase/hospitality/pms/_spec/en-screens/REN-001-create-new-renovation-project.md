# REN-001 — Create New Renovation Project

**Type:** Full page
**Route:** renovation/new-project
**Module:** REN = Renovation

## Overview
Screen for creating a new renovation project for a villa: select the business unit and villa, enter project information (title, planned start/end dates), and declare the list of renovation items along with the planned budget for each item.

## Detailed Description

Project creation form (action `newProject`, POST to this same route):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 (list of business units per user permissions) | No | Defaults to the currently selected business unit (cookie); changing it calls AJAX `/VM/common/getBusinessUnitVilla` to reload the corresponding villa list |
| 2 | Villa | `villa_id` | Select2 (list of villas in the BU, status = Open) | Yes | Changing the villa calls AJAX `getNewProjectData` to check whether the villa already has a renovation project (if one exists and is not Completed, a warning is shown with a link to the project follow-up screen REN-003) |
| 3 | Project leader name | `leader_name` | Text, readonly | — | Displays the name of the currently logged-in user, for reference only; the system automatically assigns `leader_id` = the current user upon saving |
| 4 | Project title | `title` | Text | Yes | |
| 5 | Planned start date | `start_date` | Datepicker (dd-mm-yyyy) | Yes | Defaults to the current date |
| 6 | Planned completion date | `end_date` | Datepicker (dd-mm-yyyy) | Yes | Defaults to start_date + 1 day; cannot be set earlier than the start date |
| 7 | Item | `item[]` | Text (multiple rows, added dynamically) | Yes | Item names must not be duplicated across rows (JS validation) |
| 8 | Item budget | `budget[]` | Numeric text (comma-separated format) | Yes | Corresponds to each `item[]` row |
| 9 | Total budget | `total` | Text, readonly | — | Automatically sums all `budget[]` values |

## Functions / Actions
- **Create**: submits the form, saves the `Renovation` record plus the `RenovationItem` records (item/budget), then redirects to the Renovation Follow-up screen (REN-002).
- **Add new item (add-more)**: adds a new `item[]`/`budget[]` row to the item table.
- Changing **Business unit**: reloads the corresponding villa list via AJAX.
- Changing **Villa**: checks whether the villa already has a renovation project via AJAX `getNewProjectData`.

## Navigation
- Entered from: the "+ Create New Project" button on the Renovation Follow-up screen (REN-002).
- Leads to: after successfully saving, redirects to REN-002 (Renovation Follow-up); if the villa already has an in-progress project, a quick link to REN-003 (Renovation Project Follow-up) is provided.
