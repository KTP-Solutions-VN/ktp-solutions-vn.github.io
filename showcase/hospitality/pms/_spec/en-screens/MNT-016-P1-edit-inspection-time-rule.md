# MNT-016-P1 — Edit Inspection Time Rule

**Type:** Popup (opened from MNT-016)
**Route:** maintenance/editInspection/:id (id base64)
**Module:** Maintenance

## Overview
Page for editing the maturity days of a villa inspection rule set for a business unit.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Read-only text | — | Shown for reference, cannot be changed |
| 2 | List of Villas in Business Unit | `properties` | Read-only text (list) | — | For reference |
| 3 | New — days | `data[0][meturity]` | Numeric text | No | |
| 4 | Seen — days | `data[1][meturity]` | Numeric text | No | |
| 5 | OK — days | `data[2][meturity]` | Numeric text | No | |

## Functions / Actions
- **Save**: updates the `InspectionServices`, returns to MNT-016.
- **Cancel**: returns to MNT-016.

## Navigation
- Entered from: Edit icon on MNT-016 — Inspection Time Rules.
- Navigates to: after Save, returns to MNT-016.
