# MNT-006 — Maintenance Cost

**Type:** Full page
**Route:** maintenance/cost/:id (id base64)
**Module:** Maintenance

## Overview
Screen for declaring costs incurred for a maintenance log: a list of expense items (reimbursable materials, labor, available materials), each item having a type, material/labor name, cost, and attached invoice; total cost is calculated automatically.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Expense Type | `type[]` | Select (per row) | Yes | Values: `reimbursement_material` (reimbursable material), `labour` (labor), `available_material` (available material) |
| 2 | Material/Labor Name | `material[]` | Text | Yes | |
| 3 | Cost | `cost[]` | Numeric text | Yes | Readonly (=0) if type is `available_material` |
| 4 | Invoice | `files[]` | Photo upload (per row) | No | Saved to `MaintenanceCost` (serialized by type) |
| 5 | Total Cost | `total` | Readonly text (auto-calculated) | — | Sum of all `cost[]`, or manually entered if applicable |

## Functions / Actions
- **Add Row** (+ icon): adds a new expense item row.
- **Delete Row**: removes an expense item from the list before saving.
- **Save** (submits `cost_form`): saves/updates the `MaintenanceCost` record (data serialized by 3 type groups), logs the activity, returns to the previous page.

## Navigation
- Entered from: MNT-005 — View Maintenance Log Details (or directly from MNT-001).
- Navigates to: after Save, returns to the referring page (referer).
