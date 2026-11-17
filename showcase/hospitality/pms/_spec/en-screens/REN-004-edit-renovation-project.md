# REN-004 — Edit Renovation Project

**Type:** Full page
**Route:** renovation/edit/:renovation_id + dashed-style pretty route: renovation/edit/:renovation_id (id passed as base64)
**Module:** REN = Renovation

## Overview
Form for editing the initial information of a renovation project: business unit, villa, project title, planned start/completion dates, and the list of items/planned budget. The field structure is similar to REN-001 (Create New Renovation Project) but pre-populated with existing data; saving deletes all existing `RenovationItem` records and recreates them from the newly entered list.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | No | Pre-populated with the current value |
| 2 | Villa | `villa_id` | Select2 (by BU) | Yes | Pre-populated with the current value |
| 3 | Project title | `title` | Text | Yes | |
| 4 | Planned start/completion date | `start_date`, `end_date` | Datepicker | Yes | |
| 5 | Item | `item[]` | Text (multiple rows) | Yes | Pre-populated from `RenovationItem.item_name` |
| 6 | Item budget | `budget[]` | Numeric text | Yes | Pre-populated from `RenovationItem.budget_amount` |

## Functions / Actions
- **Save**: `leader_id` is reassigned to the current user; all existing `RenovationItem` records for the project are deleted and recreated from the newly entered `item[]`/`budget[]`.
- **Add new item**: adds a new `item[]`/`budget[]` row.

## Navigation
- Entered from: the "Edit" icon on REN-002 — Renovation Follow-up.
- Leads to: after successfully saving, returns to REN-002 — Renovation Follow-up.
