# FUND-005 — Edit Funded Project

**Type:** Full page

**Route:** `FundController::updateProject($id)` — `/fund/update-project/:id` (POST)

**Module:** FUND = Investor Capital

## Overview
A form for adding a "progress update" (`ProjectLog` entry) to an open fund project — rather than directly editing the project's original information, it adds a new update entry with images and comments.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Update Date | `date` | Date picker | Yes | |
| 2 | Images | `img1`…`img4` | File upload (jpg/png/jpeg/gif) | No | Up to 4 images, each maximum 1 MB |
| 3 | Comment | `comment` | Textarea | Yes | |

## Functions / Actions
- **Save**: saves a `ProjectLog` record linked to `project_id` = the project being viewed; on success, navigates back to FUND-003.
- **Cancel**: returns to FUND-003 without saving.

## Navigation
- Entry point: FUND-003 ("Update" button, shown only when the project is open).
- After saving/canceling: returns to FUND-003 (the update content can be reviewed on FUND-006).
