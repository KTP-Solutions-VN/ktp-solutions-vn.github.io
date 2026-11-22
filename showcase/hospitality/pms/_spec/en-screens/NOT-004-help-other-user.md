# NOT-004 — Cover for Colleague

**Type:** Full page

**Route:** `NoticeController::helpOtheruser($id)` — default `/notice/help-otheruser/:id`

**Module:** Announcements

## Overview
Allows the recipient of a task to forward/request another staff member to jointly assist in handling that task (adds a new `NoticeBoardDetail` associated with the same `NoticeBoard`).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Task Content | `notice` | Textarea | Yes | Default value taken from the original task |
| 2 | Department | `department_id` | Radio (list of Employee Roles, excluding 4 role ids 14-17) | Yes | Changing this reloads the recipient list via AJAX `/notice/getHelpOtherUsers` |
| 3 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Combined with the department to filter recipients |
| 4 | Person Requested to Help | `received_by` | Select2 (list of Users) | Yes | Excludes the current user and the original sender |

## Functions / Actions
- **Send:** creates an additional `NoticeBoardDetail` record (and updates the `NoticeBoard` status to pending), then redirects to NOT-002.
- **Cancel:** returns to NOT-002.

## Navigation
- Opened from: NOT-003 (Announcement View) — the "Get Help" link (currently commented out in the code; accessible only via a direct route).
- After sending/canceling: redirects to NOT-002 (Announcements & Tasks).
