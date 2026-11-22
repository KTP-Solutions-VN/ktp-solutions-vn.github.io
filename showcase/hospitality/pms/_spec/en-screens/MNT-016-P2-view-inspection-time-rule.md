# MNT-016-P2 — Inspection SLA Details

**Type:** Popup (opened from MNT-016)
**Route:** maintenance/viewInspection/:id (id base64)
**Module:** Repair Desk

## Overview
Page for viewing the details (read-only) of a villa inspection time rule set for a business unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Read-only text | |
| 2 | List of Villas in Business Unit | `properties` | Read-only text | |
| 3 | New — maturity days | `new_meturity_days` | Read-only text | |
| 4 | Seen — maturity days | `seen_meturity_days` | Read-only text | |
| 5 | OK — maturity days | `ok_meturity_days` | Read-only text | |

## Functions / Actions
- View only, no editing actions available.

## Navigation
- Entered from: View icon on MNT-016 — Inspection SLAs.
- Navigates to: may link to MNT-016-P1 (Edit).
