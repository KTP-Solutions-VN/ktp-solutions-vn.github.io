# OPR-022 — Manage Field Repair

**Type:** Full page
**Route:** operator/editMaintenanceTicket/:id + dashed-style pretty route: operator/edit-maintenance-ticket/:id (id passed as base64/btoa)
**Module:** OPR = Upkeep Jobs

## Overview
Form for editing an existing maintenance ticket: redisplays all the data entered in OPR-021 (villa, guest status, issue classification, priority level, description, photos, villa access method, action requested, etc.) and allows it to be updated.

## Detailed Description

The field structure mirrors OPR-021 — Report Field Repair, the difference being that fields are pre-populated from `ticket_data` (the `MaintenanceTicket` record by `id`):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Ticket code / Status | `ticket_data.ticket_number`, `ticket_status` | Display text (page title) | — | Shown as "Status #ticket_number" |
| 2 | Villa, location | `property_id`, `location` | Select, Text | Yes/No | Pre-populated with current values |
| 3 | Guest status, reporter | `guest_status`, `reported_by`, `reported_name` | Radio, Select | Yes | |
| 4 | Issue classification | `category_id`, `subcategory_id`, `problem_option_id` | Cascading radio | Yes | |
| 5 | Priority level | `base_priority_id`, `final_priority_id` | Hidden, auto-calculated | — | |
| 6 | Description, tried/checked | `description`, `tried_checked` | Textarea | Yes/No | |
| 7 | Evidence photo | `cropped_image` | Image upload | No | Existing photo displayed if available |
| 8 | Villa access method, key | `access`, `key_availability` | Radio | Yes | |
| 9 | Deadline, action requested | `deadline`, `action_requested` | Text/Radio | No/Yes | |

## Functions / Actions
- **Update**: calls AJAX `updateMaintenanceTicket` to save all changes.
- **Start Over (modal)**: same as OPR-021, confirms restarting data entry from scratch.
- Category/Subcategory/Problem cascading selections work the same as in OPR-021.

## Navigation
- Entered from: the "Edit/Manage" icon on OPR-020 — Field Repair Reports.
- Leads to: after a successful Update, returns to OPR-020 — Field Repair Reports.
