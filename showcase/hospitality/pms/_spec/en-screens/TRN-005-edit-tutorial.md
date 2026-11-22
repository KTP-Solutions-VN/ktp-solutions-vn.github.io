# TRN-005 — Edit Lesson

**Type:** Full page
**Route:** `TrainingController::editTutorial($id)` — `/training/edit-tutorial/{id}`
**Module:** TRN = Staff Academy

## Overview
Edit the general information of a Tutorial and manage the list of Slides within it (view/edit/delete each slide, add new slides).

## Detailed Description

**Edit Lesson form**
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | |
| 2 | Title | `title` | Text | Yes | |
| 3 | Image | `image` | File upload (max 1MB) | No | Keeps the existing image if no new one is selected |
| 4 | Level | `access_level` | Select | Yes | |
| 5 | Target audience | `user_role[]` | Multi-select checkbox | Yes | |
| 6 | Has Quiz | `is_quiz` | Radio (Yes/No) | Yes | |
| 7 | Maximum/minimum quiz frequency | `max_quiz_frequency`, `min_quiz_frequency` | Number | Yes | |
| 8 | Ready for release | `is_ready_release` | Toggle switch | No | |

**Child Slide list** (table)
| # | Column | Notes |
|---|-----|---------|
| 1 | Slide title | |
| 2 | Content (truncated to 100 characters) | Has a "Read more" link opening TRN-004 |
| 3 | Actions | Edit / Delete |

## Functions / Actions
- **Update**: saves the Tutorial changes, returns to the previous page (`referer`).
- **Cancel**: returns to TRN-002.
- **Add New** (slide): opens TRN-003 (`addTutorial($id)`) to add a new slide to this Tutorial.
- **Edit slide** (pencil icon, per row): → TRN-006 (editSlide).
- **Delete slide** (trash icon, per row): opens confirmation popup **TRN-005-P1**.

## Navigation
- **Entered from:** TRN-002 (edit icon).
- **Leads to:** TRN-003 (add slide), TRN-006 (edit slide), TRN-005-P1 (delete slide popup), TRN-002 (Cancel/after updating), TRN-004 (Read more).
