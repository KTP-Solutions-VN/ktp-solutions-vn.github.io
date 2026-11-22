# BU-005-P2 — Confirm Channel Deletion

**Type:** Popup (opened from BU-005)

**Route:** Static Bootstrap modal (`#deleteModal`) in `chanels.ctp`; submitted via POST to the same `BusinessUnitController::chanels()` action with `action=delete`.

**Module:** Operating Units

## Overview
A confirmation popup shown before deleting a channel (Chanel) from the system.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Generic delete-confirmation message |
| 2 | Channel ID (hidden) | `id` | Hidden | — | |

## Functions / Actions
- **Delete (confirmation button):** sends a POST with `action=delete` to delete the `Chanel` record, logs the activity.
- **Cancel:** closes the modal without performing any action.

## Navigation
- Opened from: BU-005 (Sales Channels) — Delete icon on each row.
- After confirmation: redirects back to BU-005, displays a flash message.
