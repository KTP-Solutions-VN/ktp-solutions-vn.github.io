# OWP-021 — Owner Bulletin

**Type:** Full page

**Route:** `ExternalUserController::MonthlyNewsletter()` — no dedicated friendly route (default `/external-user/monthly-newsletter`)

**Module:** Owner Hub

## Overview

List of Monthly Newsletters issued by the management unit and sent to Owners by language and business unit, with options to preview or download as PDF.

## Detailed Description

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Date/Newsletter name | name | |
| 2 | Content | text | Displayed in truncated/HTML form |
| 3 | Actions | — | Eye icon (quick preview in a popup), download icon (PDF) |

## Functions / Actions

- Quick preview of newsletter content (eye icon → opens a popup displaying the content, no dedicated view — shares the page layout)
- Download newsletter PDF (download icon → calls `downloadNewletterPdf($news_id)`)

## Navigation

- Accessed from the main menu (Owner Bulletin)
- No further navigation — the eye icon opens a popup in place, the download icon opens/downloads the PDF file
