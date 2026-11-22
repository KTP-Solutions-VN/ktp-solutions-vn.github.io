# USR-009 — Weekly Rest Days

**Type:** Full page

**Route:** `UserController::weeklyOff()` — default `user/weeklyOff`

**Module:** Sign-in & Workforce

## Overview
A screen for managing each staff member's fixed weekly day off (Sunday through Saturday), organized by department. The manager selects a department, the system loads the list of staff in that department (ajax `filterUser`), and allows selecting/changing each person's fixed day off (ajax `changeOff`).

## Detailed Description

**Filter:**

| # | Field Label | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Department | `department` | Select2 | Source: `Role` (is_show=1) |

**Data Table (loaded via ajax after selecting a department):**

| # | Column Name | Field Code | Input Type | Notes |
|---|---|---|---|---|
| 1 | Staff Name | `first_name` | Text (read-only) | |
| 2 | Sunday … Saturday | `day-<id>` | Radio (7 columns, one row per staff member) | Selects one fixed day off per week for each staff member |

## Functions / Actions
- **Select Department:** reloads the staff list (ajax, no page navigation).
- **Select Day-Off Radio:** saves immediately via ajax `changeOff`, displaying a success flash message.

## Navigation
- Entry point: Workforce menu → Weekly Rest Days, or from USR-004.
- Navigates to: no child navigation (all actions are handled directly via ajax on this screen).
