# OPR-021 — Create New Maintenance Ticket

**Type:** Full page
**Route:** operator/addMaintenanceTicket + dashed-style pretty route: operator/add-maintenance-ticket
**Module:** OPR = Garden/Pool Operations

## Overview
Multi-step form for creating a new maintenance ticket for a villa: select the villa, guest status, reporter, issue classification (category → subcategory → problem), urgency-affecting factors, description, evidence photos, villa access information, and the requested course of action. The ticket is saved as `draft` as soon as the form is opened (keyed by `session_id`) and changes to `publish` upon complete submission.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit` | Radio/card selection | Yes | |
| 2 | Villa | `property_id` | Select | Yes | |
| 3 | Specific location | `location` | Text | No | E.g. Master bedroom, pool deck, etc. |
| 4 | Guest status | `guest_status` | Radio: guest_in_house/arriving_today/vacant_no_guest | Yes | |
| 5 | Reported by | `reported_by`, `reported_name` | Select (role) + Select (name) | Yes | |
| 6 | Category / Subcategory / Problem | `category_id`, `subcategory_id`, `problem_option_id` | Card-style radio, cascading (AJAX) | Yes | `problem_option_id` carries a `data-priority-id` used to calculate `base_priority_id` |
| 7 | Aggravating factors | `factor[makes_it_worse][]` | Multi-select checkbox | No | Affects the calculation of `final_priority_id` |
| 8 | Urgency-reducing factors | `factor[makes_it_less_urgent][]` | Multi-select checkbox | No | |
| 9 | Base/final priority | `base_priority_id`, `final_priority_id` | Hidden, auto-calculated | — | Calculated from the problem plus the factors |
| 10 | Issue description | `description` | Textarea | Yes | |
| 11 | Actions already tried/checked | `tried_checked` | Textarea | No | |
| 12 | Evidence photo | `cropped_image` | Image upload (crop) | No | |
| 13 | Villa access method | `access` | Radio: vacant_villa/ask_concierge_to_call/access_ring_bell | Yes | |
| 14 | Key location | `key_availability` | Radio: ask_guest/maintenance/concierge/housekeeping | Yes | |
| 15 | Deadline | `deadline` | Text/Datepicker | No | |
| 16 | Action requested | `action_requested` | Radio: repair_on_site/replace_item/inspect_and_advise/temporary_fix_now_permanent_later/order_part_or_book_contractor/other | Yes | |

## Functions / Actions
- **Submit (Create Ticket)**: validates all required fields, then calls AJAX `saveMaintenanceTicket`, changing `MaintenanceTicket.status` from `draft` to `publish`.
- **Start Over (modal)**: confirms discarding the currently entered data and creates a new draft ticket.
- Cascading Category → Subcategory → Problem selections: AJAX `getMaintenanceSubcategories`, `getMaintenanceProblems` load the next set of options.
- Selecting Reported by: AJAX `getReporterList` loads the list of names by role.

## Navigation
- Entered from: the "+ New Ticket" button on OPR-020 — Maintenance Ticket List.
- Leads to: after a successful submit, returns to OPR-020 — Maintenance Ticket List.
