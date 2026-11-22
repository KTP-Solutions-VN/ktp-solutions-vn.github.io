# PROP-020 — Property Intake

**Type:** Full page
**Route:** property/on-boardings
**Module:** PROP = Property Records

## Overview
Screen listing Onboarding processes (adding a new property to the system via a multi-step wizard, stored as JSON in the `VillaOnboarding` table), showing status (pending/in_progress/completed/aborted) and allowing view/edit/review actions depending on status.

## Detailed Description

### Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (includes "All" option) | No | Stores the Business Unit cookie via `_setBusinessUnitCookie` |

### Displayed Columns (`#zero_config` table)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `property_name` (decoded from JSON field `data`) | Text | No (display) | |
| 2 | Status | `status` | Text (pending/in_progress/completed/aborted) | No | |
| 3 | Created On | `created_at` | Datetime (`d M y`) | No | |
| 4 | By | `created_by.usage_name` | Text | No | Via `CreatedBy` contain |
| 5 | Last Updated | `updated_at` | Datetime (`d M y`) | No | |
| 6 | By | `modify_by.usage_name` | Text | No | Via `ModifyBy` contain |
| 7 | Action | — | View/Edit/Review buttons | — | Depends on status |

## Functions / Actions
- "Add new" button — links to `Property::addOnboarding` (creation wizard, outside the scope of the current spec).
- "View" button (eye icon) — shown when status = pending/in_progress/completed → links to `Property::viewOnboarding/{id}`.
- "Edit" button (pencil icon) — shown when status = pending/in_progress → links to `Property::editOnBoarding/{id}`.
- "Review" button (pencil icon, yellow) — shown when status = aborted → links to `Property::reviewOnBoarding/{id}`.
- Changing Business Unit → (in the current build, JS only sets a variable and does not auto-reload the page).

## Navigation
- Opened from: the Property Intake menu (outside the scope of the current spec).
- Navigates to: `addOnboarding`, `viewOnboarding`, `editOnBoarding`, `reviewOnBoarding` (onboarding wizard actions, outside the scope of PROP-017..031).
- Child popup: none.
