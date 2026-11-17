# BU-015-P1 — Popup: Confirm Office Deletion

**Type:** Popup (opened from BU-015)

**Route:** Static Bootstrap modal (`#exampleModal`) within `offices.ctp`; confirmation navigates to `BusinessUnitController::deleteOffice($id)` — `/business-unit/delete-office/{id}` (id base64-encoded).

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting an office.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the office to be deleted |

## Functions / Actions
- **Delete:** navigates the browser to `delete-office/{id}`, deletes the `Office` record.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-015 (office list) — Delete icon on each row.
- After confirmation: redirects back to BU-015.
