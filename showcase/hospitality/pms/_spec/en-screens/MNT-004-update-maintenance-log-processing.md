# MNT-004 — Update Maintenance Log Processing

**Type:** Full page
**Route:** maintenance/edit/:id (id base64)
**Module:** Maintenance

## Overview
Screen for the technician who has accepted a task to update the processing progress of a maintenance log: change status, add comments/notes, manage supporting photos (remove old photos/add new photos). Accessible only to the assigned person or Admin/Superadmin/Team Leader (verified via `checkTechnician`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Log Information (villa, category, description, opened by) | `data_array` | Readonly display | — | Includes `MaintenanceMedia`, `MaintenanceLog` (history) |
| 2 | New Status | `type` | Select/Radio | Yes | Values per `data_status` (Open/Pending/Closed/Rejected...) |
| 3 | Comment | `comment` | Textarea | Yes | Saved to `MaintenanceLog.comment` |
| 4 | Existing Photos (kept) | `media_ids[]` | Hidden (hidden checkbox per photo) | No | Photos not included in `media_ids[]` upon submit will be removed from `MaintenanceMedia` |
| 5 | New Photos | `files[]` | Photo upload | No | Added to `MaintenanceMedia` |

## Functions / Actions
- **Save/Update**: updates `Maintenance.status`, removes deselected photos, uploads new photos, adds a `MaintenanceLog` record (comment + status), logs the activity, returns to MNT-001.
- If the user is not the assigned technician: displays an error "only the assigned technician may access this" and returns to the previous page.

## Navigation
- Entered from: MNT-001 — Maintenance Log List (clicking on a task in progress).
- Navigates to: after Update, returns to MNT-001.
