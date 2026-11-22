# MNT-002 — New Repair Request

**Type:** Full page
**Route:** maintenance/add
**Module:** Repair Desk

## Overview
Screen for creating a new maintenance log (Maintenance log/task): select villa, maintenance category (priority level is auto-assigned by category), enter an issue description, and attach supporting photos (multiple photos, dynamically added).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa | `villa` | Select2 | Yes | List of villas based on the user's business unit permissions |
| 2 | Maintenance Category | `maintenance_category_id` | Select2 | Yes | When changed, automatically selects the corresponding priority radio button (mapped via `data_c_p`) |
| 3 | Priority | `maintenance_priority_id` | Radio (readonly, auto-selected by category) | Yes | Not manually selectable by the user; depends on the category |
| 4 | Description | `description` | Textarea | Yes | |
| 5 | Supporting Photos | `files[]` | Photo upload (multiple photos, "+" button to add new photo slot) | No | Saved to the `MaintenanceMedia` table |

## Functions / Actions
- **Save**: saves the `Maintenance` record (default status `Pending`, `due_date` calculated from the priority level's `response_time`, `availability` = current date + 3 days), uploads photos to `MaintenanceMedia`, logs the activity, shows a success message, and returns to MNT-001.
- **Add Photo** (+ icon): adds a new photo upload slot.
- **Cancel**: returns to MNT-001.

## Navigation
- Entered from: "+" button on the MNT-001 — Repair Requests screen.
- Navigates to: after Save, returns to MNT-001.
