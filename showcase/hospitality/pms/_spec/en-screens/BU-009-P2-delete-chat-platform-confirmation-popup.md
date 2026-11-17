# BU-009-P2 — Delete Chat Platform Confirmation Popup

**Type:** Popup (opened from BU-009)

**Route:** Static Bootstrap modal (`#exampleModal`, form section hidden) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()` action with `action=delete`.

**Module:** Business Unit

## Overview
A confirmation popup shown before permanently deleting a chat platform.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Confirmation message | — | Static text | — | Displays the name of the platform to be deleted |
| 2 | ID (hidden) | `id` | Hidden | Yes | |
| 3 | Action (hidden) | `action` | Hidden (`delete`) | — | |

## Functions / Actions
- **Delete:** sends a POST to delete the `ChatPlatform` record.
- **Cancel:** closes the modal without deleting.

## Navigation
- Opened from: BU-009 (Chat platform list) — Delete icon on each row.
- After submission: redirects back to BU-009 (`referer()`).
