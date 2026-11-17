# NOT-003 — Notice Detail (View Detail)

**Type:** Full page

**Route:** `NoticeController::viewDetail($id)` — default `/notice/view-detail/:id`

**Module:** Notices

## Overview
View the full details of a notice/task: sender, receiver, content, sent date, status, deadline (highlighted red if overdue), and completion date.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Sender | `send_array` (usage_name/first+family name) | Text (read-only) | — | Includes a module prefix if `data_array.module` is not empty |
| 2 | Receiver | `recieve_array` | Text (read-only) | — | |
| 3 | Task Content | `data_array.notice` | Text (read-only) | — | Uses the GardenService name unless it is "other" |
| 4 | Sent Date | `data_array.created_at` | Text (read-only, d M y H:i) | — | |
| 5 | Status | computed from `status`, `sent_by`, `received_by`, `user_type` | Text (read-only) | — | Displays "Acknowledged"/"Done" depending on the viewer's role |
| 6 | Deadline | `data_array.deadline` | Text (read-only, colored red if overdue) | — | |
| 7 | Completed Date | `data_array.update_at` | Text (read-only) | — | Only shown when status = done/is_clap |

## Functions / Actions
- **Close/Return to list (Close notice):** returns to NOT-002.
- **Delete notice:** (this code block is currently commented out and not active on the current UI) opens the NOT-003-P1 confirmation popup before calling `notice/delete/:id`.
- (Commented out, no longer active on the UI): Reminder, Done notice, Get Help — the old links pointed to `remindernotice`, `statusUser`, `helpOtheruser`.

## Navigation
- Opened from: NOT-002 (Notice List) when viewing the detail of a row.
- Navigates to: NOT-002 (when clicking Close), NOT-003-P1 (when clicking Delete).
