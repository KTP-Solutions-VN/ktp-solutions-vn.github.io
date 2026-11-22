# NOT-002-P1 — Confirm Announcement Deletion

**Type:** Popup (opened from NOT-002)

**Route:** Static modal within `notice_list.ctp`; the delete action calls `NoticeController::delete($id)` via `GET /notice/delete/:id` (base64 id) when the confirm button in the modal is clicked.

**Module:** Announcements

## Overview
Confirmation dialog shown before deleting a notice/task from the system.

## Detailed Description
No input fields; only a confirmation message is displayed (`delete_confirm_help_text_notice`).

## Functions / Actions
- **Save/Confirm:** navigates the browser to `notice/delete/:id`, deletes the `NoticeBoard` record and its related `NoticeBoardDetail` records, shows a flash message, and returns to the previous page.
- **Cancel:** closes the modal.

## Navigation
- Opened from: NOT-002 (Announcements & Tasks).
- After confirming: reloads/redirects to the calling page (`referer`), typically NOT-002.
