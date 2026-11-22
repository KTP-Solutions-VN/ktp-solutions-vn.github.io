# PHO-001 — Shoot Coordination

**Type:** Full page

**Route:** `PhotosController::planning($shootId)` — default `/photos/planning/:shootId`

**Module:** Photo Library

## Overview
A screen for creating and tracking photo shoot plans for a villa/residence/unit: scheduling shoots, selecting photographers, and tracking photo delivery progress and follow-up items. Includes a consolidated dashboard showing shoots pending photo delivery and follow-up items requiring action.

Note: this feature depends on the "planning workflow" storage table — if the table is not ready (`planningReady = false`), the page is displayed in read-only mode, blocking save actions (warning: "Planning workflow storage is pending review").

## Detailed Description

Create/edit shoot schedule form (`$shootId` > 0 = edit, otherwise = create new):
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Type | `entry_level` | Dropdown | - | Villa / Residence / Unit |
| 2 | Property | `villa_id` | Dropdown | Yes (when Type = Villa) | |
| 3 | Residence | `residence_id` | Dropdown | Yes (when Type = Residence) | |
| 4 | Unit | `unit_id` | Dropdown | Yes (when Type = Unit) | |
| 5 | Photographer | `service_provider_id` | Dropdown | - | |
| 6 | Planned Date | `date` | Date picker | - | |
| 7 | Shoot Objective | `shoot_objective` | Dropdown | - | |
| 8 | Comment | `comment` | Textarea | - | |

Follow-up panel (tracking photo delivery after the shoot):
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Photo set result | `photo_set_result` | Quick selection (adequate/followup) | |
| 2 | Short log note | `short_log_note` | Text | |
| 3 | Follow-up type | `follow_up_type` | Dropdown | |
| 4 | Target resolution date | `target_resolution_date` | Date | |
| 5 | Action required | `action_required` | Textarea | |
| 6 | Expected delivery date | `expected_delivery_date` | Date | |
| 7 | Delivery note for follow-up | `delivery_note` | Textarea | |
| 8 | Corrective action | (label "Corrective action") | Textarea | |
| 9 | Follow-up date | (label "Follow-up date") | Date | |

Dashboard with 2 list tables (no separate pagination, data consolidated from `getPlanningDashboardData`):
- "Follow-up Required" table: columns Sr. No., Property, Follow-up Required, Date, Actions.
- Second table (comment/log): columns Sr. No., Property, Comment, Date, Actions.

Filter: Business Unit/Zone dropdown (`id`, saves the business unit to a cookie when changed).

## Functions / Actions
- **Save shoot plan** (create new or update `$shootId`): validates, saves, redirects back to `planning` with business_unit_id.
- **Delete shoot plan**: action `deleteShootPlan($shootId)` (POST, no dedicated view — deletes both the `Photography` record and the `PhotographDetail` details), redirects back to `planning`.
- **Select Business Unit/Zone**: filters all villa/residence/unit data and the dashboard by BU.
- **Record follow-up / photo delivery result**: updates the tracking status for each shoot.

## Navigation
- Accessed from: the Photo Library menu (active_menu = 185). Note: `PropertyController` also has a separate action that renders this same template (`setTemplatePath('Photos')->setTemplate('planning')`) for the "Property > Shoots" flow — this is outside the scope of PhotosController and therefore not documented here.
- Navigates to: no navigation to other screens in the main flow; can return via the main menu.
