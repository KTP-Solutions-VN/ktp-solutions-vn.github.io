# FUND-003 — Fund Project List

**Type:** Full page

**Route:** `FundController::projects()` — `/fund/projects`

**Module:** FUND = Investment Fund

## Overview
A list of open and closed fund-raising projects (Project Fund), used as the basis for assigning to individual investors on FUND-001.

## Detailed Description

**Display columns:**

| # | Column | Data Source | Notes |
|---|---|---|---|
| 1 | Project | `ProjectFund.project_name` | |
| 2 | Date Added | `ProjectFund.created_at` | |
| 3 | Created By | `User.usage_name` | |
| 4 | Last Updated | Latest `ProjectLog` entry or `ProjectFund.updated_at` | Displays "Closed" if `status = close` |
| 5 | Actions | — | View (always shown); Update, Close (shown only when `status` is open) |

No dedicated filter — displays all open projects followed by closed projects.

## Functions / Actions
- **Add New**: navigates to FUND-004 (Add Project).
- **View (eye)**: navigates to FUND-006 (Project Detail).
- **Update (pencil)**: navigates to FUND-005 (Update Project) — shown only when the project is open.
- **Close (X mark)**: AJAX `fund/close-project` — removes the project from the `Fund.project_id` of every investor referencing it, and sets `ProjectFund.status = close`.

## Navigation
- Entry point: Investment Fund management menu (`active_menu = 303`).
- Navigates to: FUND-004, FUND-005, FUND-006.
