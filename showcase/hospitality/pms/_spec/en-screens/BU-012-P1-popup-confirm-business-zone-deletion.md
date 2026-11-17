# BU-012-P1 — Popup: Confirm Business Zone Deletion

**Type:** Popup (opened from BU-012)

**Route:** Static Bootstrap modal (`#exampleModal`) within `zoning.ctp`; confirmation navigates to `BusinessUnitController::deleteZoning($id)` — `/business-unit/delete-zoning/{id}` (id base64-encoded).

**Module:** Business Unit

## Overview
A confirmation popup shown before deleting (marking as hidden) a business zone.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the zone to be deleted |

## Functions / Actions
- **Delete:** navigates the browser to `delete-zoning/{id}`, sets `is_deleted=1` on the `BusinessUnitZone` record.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-012 (business zone list) — Delete icon on each row.
- After confirmation: redirects back to BU-012.
