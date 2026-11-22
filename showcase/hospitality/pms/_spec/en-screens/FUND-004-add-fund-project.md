# FUND-004 — New Funded Project

**Type:** Full page

**Route:** `FundController::addProject()` — `/fund/add-project` (POST)

**Module:** FUND = Investor Capital

## Overview
A form for creating a new fund-raising project (Project Fund) with description, logo, and up to 4 illustrative images.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Project Name | `project_name` | Text | Yes | |
| 2 | Project Logo | `project_logo` | File upload (jpg/png/jpeg/gif) | Yes | Maximum 1 MB |
| 3 | Project Description | `description` | Text | Yes | |
| 4 | Images | `img1`…`img4` | File upload (jpg/png/jpeg/gif) | No | Up to 4 images, each maximum 1 MB, added via the "+" button |

## Functions / Actions
- **Save**: uploads images (if any), saves the `ProjectFund` record with `added_by` set to the current user; on success, navigates back to FUND-003.
- **Cancel**: returns to FUND-003 without saving.

## Navigation
- Entry point: FUND-003 ("Add New" button).
- After saving/canceling: returns to FUND-003.
