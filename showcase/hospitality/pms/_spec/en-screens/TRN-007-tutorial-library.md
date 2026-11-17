# TRN-007 — Tutorial Library

**Type:** Full page
**Route:** `TrainingController::library()` — `/training/library`
**Module:** TRN = Training

## Overview
A list of released (active) Tutorials that the current user is authorized to view, used for browsing and starting to read/study a lesson.

## Detailed Description
Filters:
| # | Filter Label | Field Code | Input Type | Notes |
|---|-----------|-----------|------------|---------|
| 1 | Business unit | `business_unit` (GET) | Select2 | Saved to a cookie when changed |
| 2 | Sort by | `sort_by` (GET) | Select (title/level/due) | |
| 3 | Show/Hide hidden items | `list_data` (GET, hide/show) | Button | Changes the `Tutorial.status` condition |

Displayed columns:
| # | Column | Field Code | Notes |
|---|-----|-----------|---------|
| 1 | Title | `title` | |
| 2 | Audience/Module | `role` | |
| 3 | Level | `access_level` | |
| 4 | Slide count | `slide_number` | |
| 5 | Release date | `release_date` | |
| 6 | Due status | `due` | New / Due Now / Overdue / From {date} |
| 7 | Created date | `created_at` | |
| 8 | Actions | — | Read, Hide/Show |

Data is automatically filtered by `user_type` (Employees only see access_level=staff; Team Leader/BU Manager see staff+manager) and by the user's roles (`user_roles`).

## Functions / Actions
- **Read** (book icon): → TRN-009 (readTutorial).
- **Hide/Show** (crossed-eye icon): calls `trainingStatus` to toggle the active/inactive status and reloads this page.

## Navigation
- **Entered from:** main menu "Training" → "Library".
- **Leads to:** TRN-009 (reading a lesson).
