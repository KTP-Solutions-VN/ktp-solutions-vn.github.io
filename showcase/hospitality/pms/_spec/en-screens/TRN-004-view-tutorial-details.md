# TRN-004 — Lesson Overview

**Type:** Full page
**Route:** `TrainingController::viewTutorial($id)` — `/training/view-tutorial/{id}`
**Module:** TRN = Staff Academy

## Overview
Read-only page displaying the full information of a Tutorial along with the list of Slides and Quiz questions (if any) it contains.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Title | `title` | Text (readonly) | — | |
| 2 | Image | `image` | Image (readonly) | — | |
| 3 | Level | `access_level` | Text (readonly) | — | |
| 4 | Target audience | `role` | Text (readonly) | — | List of roles concatenated into a string |
| 5 | Has Quiz | `is_quiz` | Text (readonly) | — | |
| 6 | Quiz frequency | `quiz_frequency` | Text (readonly) | — | |
| 7 | Slide list | `tutorial_slide[]` | Repeating list | — | Each slide: title, media_type, text, image or video |
| 8 | Quiz question per slide | `quiz_question` | Repeating list | — | question, image, options 1-3, correct answer, points, explanation |

## Functions / Actions
- No edit/action buttons on this page; view only.

## Navigation
- **Entered from:** TRN-002 (view/eye icon), TRN-005 ("....Read more" link when slide content exceeds 100 characters, opens in a new tab).
- **Leads to:** no further navigation; the user returns via the browser back button.
