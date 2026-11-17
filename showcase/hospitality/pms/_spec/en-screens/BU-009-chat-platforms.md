# BU-009 — Chat Platforms

**Type:** Full page

**Route:** `BusinessUnitController::chatPlatform()` — default `/business-unit/chat-platform`

**Module:** Business Unit

## Overview
A list of chat platforms (Zalo, WhatsApp, Messenger, etc.) used to contact customers, which can be added, edited, or deleted directly on the page via a popup.

## Detailed Description

List (DataTable `#zero_config`):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Platform Name | `name` | |
| 3 | Created On | `created_at` | Format `d M Y h:i A` |
| 4 | Actions | — | Edit, Delete |

## Functions / Actions
- **Add new:** opens the BU-009-P1 popup in Add mode.
- **Edit (pencil icon):** opens the BU-009-P1 popup in Edit mode.
- **Delete (trash icon):** opens the BU-009-P2 delete confirmation popup.

## Navigation
- Accessed from: Settings menu.
- Navigates to: BU-009-P1 (add/edit popup), BU-009-P2 (delete confirmation popup).
