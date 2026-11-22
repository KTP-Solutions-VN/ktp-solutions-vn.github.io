# OWP-020 — Statement Archive

**Type:** Full page

**Route:** `ExternalUserController::ReportHistory($villa_id)` — no dedicated friendly route (default `/external-user/report-history/{villa_id_base64}`)

**Module:** Owner Hub

## Overview

List of the history of Monthly Reports sent to the Owner, filterable by property and date range, with the report file (PDF/Excel) available for download.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa_id | Select2 | Yes | |
| 2 | Date range | date_range | Date range picker | No | |

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Report name | name | |
| 2 | Start date | start_date | |
| 3 | End date | end_date | |
| 4 | Sent date | sent_on | Only shown if the report has been sent (sent = True) |
| 5 | Actions | — | Download icon (direct link to the report file) |

## Functions / Actions

- Filter by property and date range ("Search" button)
- Download the report file (download icon)

## Navigation

- Accessed from OWP-005 (view report history icon on a property) or the main menu
- No further navigation — file download only
