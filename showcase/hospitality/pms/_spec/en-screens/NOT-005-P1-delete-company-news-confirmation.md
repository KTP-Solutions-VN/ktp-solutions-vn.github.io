# NOT-005-P1 — Delete Company News Confirmation

**Type:** Popup (opened from NOT-005)

**Route:** Static modal within `company_news.ctp`; confirming calls `NoticeController::deleteCompanyNews($id)` via `GET /notice/delete-company-news/:id`

**Module:** Notices

## Overview
Confirmation dialog shown before deleting a company news item.

## Detailed Description
No input fields; only a confirmation message.

## Functions / Actions
- **Delete:** navigates to `notice/delete-company-news/:id`, deletes the `CompanyNews` record.
- **Cancel:** closes the modal.

## Navigation
- Opened from: NOT-005 (Company News).
- After confirming: returns to NOT-005.
