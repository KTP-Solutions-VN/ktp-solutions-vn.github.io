# BU-019-P1 — Popup: Confirm Bank Deletion

**Type:** Popup (opened from BU-019)

**Route:** Static Bootstrap modal (`#exampleModal`) within `banks.ctp`; confirmation navigates to `BusinessUnitController::deleteBank($id)` — `/business-unit/delete-bank/{id}` (id base64-encoded).

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting a bank.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the bank to be deleted |

## Functions / Actions
- **Delete:** navigates the browser to `delete-bank/{id}`, deletes the `Bank` record.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-019 (bank list) — Delete icon on each row.
- After confirmation: redirects back to BU-019.
