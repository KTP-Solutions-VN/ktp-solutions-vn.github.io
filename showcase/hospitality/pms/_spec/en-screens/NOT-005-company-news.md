# NOT-005 — Company News

**Type:** Full page

**Route:** `NoticeController::companyNews()` — default `/notice/company-news`

**Module:** Notices

## Overview
List of published internal company news, filtered by the business unit(s) the current user belongs to.

## Detailed Description

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Posted Date | `created_at` | Format d M y |
| 2 | Posted By | `senders` | Name of the creator (`created_by`) |
| 3 | Business Unit | `business_units` | List of BU names, comma-separated; if the news item is not restricted to specific BUs, it is visible to all users |
| 4 | Title | `title` | |
| 5 | Actions | — | Download attachment, Delete (if the current user is the creator or a Superadmin/Admin) |

No dedicated search filter beyond the default DataTable pagination.

## Functions / Actions
- **Add new:** opens NOT-006 (Add Company News) — shown only to Superadmin/Admin/Business Unit Manager, or a Team Leader within the Content/Marketing department.
- **Download:** downloads the attached file (PDF) from the `company-news-attachment` directory.
- **Delete:** opens the confirmation popup NOT-005-P1, then calls `notice/delete-company-news/:id`.

## Navigation
- Accessed from: the main menu (Company News) or from NOT-002.
- Navigates to: NOT-006 (Add new), NOT-005-P1 (Delete confirmation).
