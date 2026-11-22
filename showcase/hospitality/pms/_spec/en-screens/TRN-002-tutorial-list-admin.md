# TRN-002 — Lesson Builder

**Type:** Full page
**Route:** `TrainingController::createTutorial()` — `/training/create-tutorial`
**Module:** TRN = Staff Academy

## Overview
A list of all tutorials (training lessons) in the system, for administrators to create/edit/delete training content.

## Detailed Description
A list (table), with no dedicated filter on this page. Sorted by default by `Tutorial.id DESC`.

Displayed columns:
| # | Column | Field Code | Notes |
|---|---------|-----------|---------|
| 1 | Title | `title` | |
| 2 | Audience/Module | `role` (joined from `role_id`, list of roles) | List of roles allowed to access |
| 3 | Level | `access_level` | staff / manager / admin |
| 4 | Created by | `user.usage_name` | Joined with the User table |
| 5 | Created date | `created_at` | Format d M y, H:i |
| 6 | Actions | — | View / Edit / Delete |

## Functions / Actions
- **Add New**: "Add New" button → opens TRN-003 (addTutorial, without an id).
- **View** (eye icon): → TRN-004 (viewTutorial).
- **Edit** (pencil icon): → TRN-005 (editTutorial).
- **Delete** (trash icon): opens confirmation popup **TRN-002-P1**; confirming calls `deleteTutorial` (cascade-deletes the Tutorial along with its related TutorialSlide and QuizQuestion records) and reloads this list.

## Navigation
- **Entered from:** main menu "Staff Academy" → "Lesson Builder".
- **Leads to:** TRN-003 (add new), TRN-004 (view), TRN-005 (edit), TRN-002-P1 (delete popup).
