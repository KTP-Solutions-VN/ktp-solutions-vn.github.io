# NOT-002 — Announcements & Tasks

**Type:** Full page

**Route:** `NoticeController::noticeList($tab, $sub_tab)` — default `/notice/notice-list/:tab/:sub_tab`

**Module:** Announcements

## Overview
Central task/notice management screen organized into tabs: My Task (my-task), Assigned Task (assigned-task), My Team Task (my-team-task), Reminders (reminders). Each tab displays 3 groups: in progress (active), pending completion confirmation (review/is_clap), completed (completed).

## Detailed Description

List (each group within a tab is a data table — DataTable):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Villa/Property | `villa_name` | Name of the related villa |
| 2 | Task Content | `notice` | Service name (GardenService.name), or free-text content if `service_category = other` |
| 3 | Sender | `senders` | Concatenation of usage_name or first+last name; shows "Azura" if sent automatically by the system (sent_by = 0) |
| 4 | Receiver | `receivers` | Concatenation of usage_name or first+last name |
| 5 | Deadline | `deadline` | Format d M y H:i |
| 6 | Completed Date | `completed_on` | Only present in the review/completed groups |
| 7 | Status | `status` | pending / is_clap (pending confirmation) / done / reminder |
| 8 | Company News (separate block) | — | List of `company_news` displayed alongside (posted date, poster, BU, title) |

Filter/navigation: main tab (`tab`: my-task, assigned-task, my-team-task, reminders), hidden field `sub_tab` used for the sub-tab within each tab (active/review/completed) — rendered via the elements `notice_board/my_task`, `notice_board/assigned_task`, `notice_board/my_team_task`, `notice_board/reminders`.

## Functions / Actions
- **Assign Task (icon):** opens NOT-001 (New Announcement) to create a new task.
- **View Detail:** opens NOT-003 (Announcement View) for the selected row.
- **Reminder:** calls the `remindernotice($id)` action — re-sends the reminder for the notice (no dedicated view, redirects back to the current page).
- **Mark as completed / Clap:** calls the `statusUser($id)` action (changes status to `is_clap`) or `clapUpdate($id)` (changes status to `done`) — no dedicated view, redirect only.
- **Get Help:** opens NOT-004 (Cover for Colleague).
- **Delete notice:** opens the confirmation popup NOT-002-P1; confirming calls `notice/delete/:id`.
- **Add/Edit Quote:** a hidden form submitted directly within the page (saves to the `Quote` table), no dedicated view.

## Navigation
- Accessed from: the main "Announcements" menu.
- Navigates to: NOT-001 (create new), NOT-003 (view detail), NOT-004 (get help), NOT-005 (Newsroom, via the company news block / dedicated link).
