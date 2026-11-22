# NOT-003-P1 — Delete Announcement from Detail

**Type:** Popup (opened from NOT-003)

**Route:** Static modal within `view_detail.ctp`; confirming calls `NoticeController::delete($id)` via `GET /notice/delete/:id`

**Module:** Announcements

## Overview
Confirmation dialog for deleting a notice directly from the detail view page.

## Detailed Description
No input fields; only a confirmation message.

## Functions / Actions
- **Save (Confirm delete):** navigates to `notice/delete/:id`.
- **Cancel:** closes the modal.

## Navigation
- Opened from: NOT-003 (Announcement View).
- After confirming: returns to the previous page (`referer`).
