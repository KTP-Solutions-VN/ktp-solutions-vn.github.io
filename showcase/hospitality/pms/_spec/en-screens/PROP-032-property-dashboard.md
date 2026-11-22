# PROP-032 — Portfolio Health

**Type:** Full page
**Route:** property/dashboard (default CakePHP DashedRoute: `/property/dashboard`)
**Module:** PROP = Property Records

## Overview
The overview dashboard page for the Property Records module, displaying 2 alert widgets by Business Unit: the number of properties without an assigned Concierge, and the number of staff without an assigned Leader, along with buttons to download the corresponding reports.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | No | `{0: 'All'} + business_unit`; changing the value → re-triggers 2 AJAX calls to refresh the widgets without reloading the page |
| 2 | "SET-UP" Widget (properties without an assigned Concierge) | `#total_properties` | Text (read-only, updated via AJAX) | — | Calls AJAX POST `checkNotAssignConciergeToVilla` with `business_unit`; shows "N properties not assigned" or the corresponding message |
| 3 | Staff Without Leader Widget | `#total_leaders` | Text (read-only, updated via AJAX) | — | Calls AJAX POST `checkNoLeaderAssigned` with `business_unit`; shows "N staff have no leaders" or the corresponding message |

## Functions / Actions
- Changing Business Unit → re-invokes the JS functions `checkNotAssignConciergeToVilla()` and `checkNotAssignedToLeader()` to refresh both widgets in place (no page navigation).
- "save-it" image button below the "SET-UP" widget (`.save_btn`) → navigates to the `territories` action (outside the scope of the 3 assigned actions); hidden (`d-none`) when there are no unassigned properties or the business unit has no properties.
- "save-it" image button below the Leader widget (`.leader_save_btn`) → navigates to `User::downloadUserReport/leader-list` (report download, outside the assigned scope); hidden when all staff already have a leader.

## Navigation
- Opened from: the main menu (`active_menu = '8'`).
- Navigates to: the `territories` action (Property) and `User::downloadUserReport/leader-list` (both outside the scope of the 3 assigned actions — noted for navigation reference only).
- Child popup: none.
