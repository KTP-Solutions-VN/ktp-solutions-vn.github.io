# FUND-006 — Funded Project Profile

**Type:** Full page

**Route:** `FundController::viewProject($id)` — `/fund/view-project/:id`

**Module:** FUND = Investor Capital

## Overview
View the detailed information of a fund project (logo, description, original images) along with the full history of progress updates (`ProjectLog`) created on FUND-005, ordered newest first.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Logo | `project_logo` | Image (view-only) | — | Default image shown if the file does not exist |
| 2 | Project Name | `project_name` | Text (view-only) | — | |
| 3 | Description | `description` | Text (view-only) | — | |
| 4 | Date Added | `created_at` | Date (view-only) | — | |
| 5 | Original Images | `img1`…`img4` | Image (view-only) | — | |
| 6 | Update List | `project_log[]` | Repeating block | — | Each entry includes: update date, comment, 4 images, Delete button |

## Functions / Actions
- **Delete an update entry** (Delete button on each history item): AJAX `fund/delete-project-log`, removes the entry from the UI upon successful deletion.

## Navigation
- Entry point: FUND-003 (View button, or after successfully saving FUND-005, returning to FUND-003 and then opening View).
- Does not navigate further to any other screen.
