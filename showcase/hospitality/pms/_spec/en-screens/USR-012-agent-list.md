# USR-012 — Sales Agents

**Type:** Full page

**Route:** `UserController::agents()` — default `user/agents`

**Module:** Sign-in & Workforce

## Overview
A list of sales agents (Agent) — a special `User` account type with `employment = Agent`, used to refer/sell villas and receive commission. The page lists agents together with their company and most recent contact date, and allows adding/editing/deleting.

## Detailed Description

**Displayed Columns:**

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Name | `name` (first_name + family_name) | |
| 2 | Company | `company_name` | |
| 3 | Most Recent Contact Date | `contact_date` | |
| 4 | Actions | — | Edit, Delete |

No dedicated filter/search; sorted by `first_name` ascending.

## Functions / Actions
- **Add New:** opens USR-013 (New Sales Agent).
- **Edit:** opens USR-014 (Edit Sales Agent).
- **Delete:** calls `user/deleteAgents/:id` (deletes both the `User` record and the linked `Agent` record), with a confirmation prompt before deletion.

## Navigation
- Entry point: Workforce menu → Sales Agents.
- Navigates to: USR-013 (Add), USR-014 (Edit).
