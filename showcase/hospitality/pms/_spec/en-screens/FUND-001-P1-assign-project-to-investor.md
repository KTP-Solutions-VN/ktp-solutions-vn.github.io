# FUND-001-P1 — Assign Project to Investor

**Type:** Popup (opened from FUND-001)

**Route:** Submits via POST to `FundController::investors()` (`/fund/investors`, hidden field `action = project`). Project list data is loaded via AJAX `fund/check-project` (POST).

**Module:** FUND = Investment Fund

## Overview
A modal that allows one or more open projects (`ProjectFund.status = open`) to be assigned to an investor. Opened from the "Project" icon on the investor list (FUND-001).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Project | `project_id` | Select2 multiple | Yes | List loaded dynamically via AJAX `fund/check-project`, excluding projects already present in this investor's `Fund.project_id` |
| 2 | (hidden) Fund ID | `id` | Hidden | — | ID of the investor's `Fund` record |
| 3 | (hidden) Action | `action` | Hidden = `project` | — | Signals to the controller that this is a project-assignment action |

## Functions / Actions
- **Save**: merges the newly selected projects with the investor's previously assigned projects (removing duplicates), saves to `Fund.project_id` (serialized), and displays a success/failure notification.
- **Cancel**: closes the modal without saving.

## Navigation
- Opened from: FUND-001 (Project icon on each investor row).
- After saving (success or error): reloads FUND-001.
