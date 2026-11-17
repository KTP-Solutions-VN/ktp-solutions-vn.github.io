# BU-001-P1 — Delete Business Unit Confirmation Popup

**Type:** Popup (opened from BU-001)

**Route:** Static Bootstrap modal (`#exampleModal`) in `list.ctp`; on confirmation the browser navigates to `BusinessUnitController::delete($id)` — `/business-unit/delete/{id_base64}`.

**Module:** Business Unit

## Overview
A confirmation popup shown before deleting a business unit from the system.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the business unit to be deleted in the modal title |

## Functions / Actions
- **Delete (confirmation button, id `submit_button`):** navigates to `delete/{id}` (the id is base64-encoded client-side using `btoa`) to perform the deletion.
- **Cancel:** closes the modal without performing any action.

## Navigation
- Opened from: BU-001 (Business Unit List) — Delete icon on each row.
- After confirmation: calls `BusinessUnitController::delete()`, logs the activity, displays a flash message, then redirects back to BU-001.
