# BU-009-P1 — Messaging App Form

**Type:** Popup (opened from BU-009)

**Route:** Static Bootstrap modal (`#exampleModal`) in `chat_platform.ctp`; submitted via POST to the same `BusinessUnitController::chatPlatform()` action.

**Module:** Operating Units

## Overview
A shared popup for adding a new chat platform or editing an existing one.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Platform Name | `name` | Text | Yes | Duplicate name validated via AJAX `checkChatPlatform` |
| 2 | Image | `image` / `cropped_image` | Image file (1:1 crop, ≤1MB) | No | Uploaded to the `villas` folder |
| 3 | Action (hidden) | `action` | Hidden (`add`/`edit`) | — | |
| 4 | ID (hidden) | `id` | Hidden | — | Present only when editing |

## Functions / Actions
- **Save/Update:** saves the `ChatPlatform` record.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: BU-009 (Messaging Apps) — "Add new" button, Edit icon on each row.
- After submission: redirects back to BU-009 (`referer()`).
