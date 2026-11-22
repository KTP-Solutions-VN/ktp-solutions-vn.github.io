# NOT-006 — New Newsroom Post

**Type:** Full page

**Route:** `NoticeController::addCompanyNews()` — default `/notice/add-company-news`

**Module:** Announcements

## Overview
Form for posting a new internal news item, optionally with a PDF attachment, restricted in visibility to selected business units.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_units[]` | Multi-select checkbox | Yes | Stored as JSON in the `business_units` column |
| 2 | Title | `title` | Textarea | Yes | |
| 3 | Attachment | `news_attachment` | File upload (accepts `application/pdf`) | Yes (per the `required` class on the input) | Stored in the `company-news-attachment` directory |

## Functions / Actions
- **Send:** uploads the file, saves a `CompanyNews` record, and redirects to NOT-005.
- **Cancel:** returns to NOT-005.

## Navigation
- Opened from: the "Add new" button on NOT-005 (Newsroom).
- After sending/canceling: redirects to NOT-005.
