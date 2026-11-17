# PROP-043 — Concierge Territories

**Type:** Full page
**Route:** property/territories/:id
**Module:** PROP = Properties

## Overview
Page listing Properties (Open status) grouped by Area, showing the assigned Concierge and allowing quick assignment/reassignment of Concierge for each Property. Filterable by Business Unit and by assigned Concierge, sortable by Area/Property/Concierge. Includes a CSV export button for the list.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 (includes "All" option, supports Zone) | Yes (class `required`) | Changing value → reloads with `id` query, saved to cookie |
| 2 | Concierge | `show_concierge` | Select2 (All/Unassigned/list of concierges) | Yes | Filters by assigned Concierge |
| 3 | Sort by | `sort_by` | Select2 (Area/Property/Concierge) | Yes | |

### Displayed Columns
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | No. | — | Text | — | |
| 2 | Area | `villa_location.area.name` | Text | — | Via VillaLocation→Area contain |
| 3 | Property | `name` | Text | — | |
| 4 | Concierge (Name) | `concierge_id` | Displayed text + Edit icon | — | Edit icon only shown to Superadmin/Admin/BU Manager/Team Leader (Planner/Content role) |

## Functions / Actions
- Changing Business Unit/Concierge/Sort by → reloads the list per the filter conditions.
- Edit icon on the Concierge column → opens an inline dropdown to select a new Concierge (data-villa_id, data-user_id), submits AJAX `assignConciergeToVilla` to assign the Concierge to the Property, updates the displayed name.
- Download button (icon) → downloads a CSV file via `downloadConciergeTerritories/:id/:sort_by/:show_concierge`.

## Navigation
- Opened from: Property/Concierge menu (outside the scope of the current code).
- Navigates to: No other page navigation (Concierge assignment is handled via AJAX in place); downloads a CSV file via `downloadConciergeTerritories`.
- Child popup: Inline Concierge assignment dropdown (no dedicated code, a small inline operation).
