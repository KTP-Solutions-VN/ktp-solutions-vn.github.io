# MNT-016 — Inspection Time Rules

**Type:** Full page
**Route:** maintenance/inspection
**Module:** Maintenance

## Overview
Screen for configuring maturity days for the villa inspection process, per business unit — applied to 3 issue statuses: New (newly detected), Seen (reviewed), OK (fully resolved). Each business unit can have only one rule set configured.

## Detailed Description

### List
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Business Unit | `business_unit_id` → name | |
| 3 | Rule | — | Quick view of the 3 day thresholds (New/Seen/OK) |
| 4 | Created By | `CreatedUser.usage_name` | |
| 5 | Updated Date | `updated_at` | |
| 6 | Actions | — | Edit (MNT-016-P1), View (MNT-016-P2), Delete |

### Add New Form (modal on the same page)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_ids[]` | Multi-select checkbox | Yes | Only shows business units without an existing rule set (`_getBusinessUnit`) |
| 2 | New — maturity days | `data[0][meturity]` | Numeric text | No (default 0) | |
| 3 | Seen — maturity days | `data[1][meturity]` | Numeric text | No (default 0) | |
| 4 | OK — maturity days | `data[2][meturity]` | Numeric text | No (default 0) | |

## Functions / Actions
- **Add New** (modal): creates an `InspectionServices` rule set for each selected business unit (`action=add`).
- **Delete**: deletes the rule set (`action=delete`, requires only `id`).
- **Edit** (icon): opens MNT-016-P1 — Edit Rule.
- **View** (icon): opens MNT-016-P2 — View Rule.

## Navigation
- Entered from: Settings/Maintenance menu in the sidebar.
- Navigates to: MNT-016-P1 (Edit), MNT-016-P2 (View).
