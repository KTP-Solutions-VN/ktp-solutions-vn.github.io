# TRN-006 — Edit Lesson Slide

**Type:** Full page
**Route:** `TrainingController::editSlide($id)` — `/training/edit-slide/{id}`
**Module:** TRN = Staff Academy

## Overview
Edit the content of a single Slide within a Tutorial: media (image/video), text content, and an optional Quiz question.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Slide title | `title` | Text | Yes | |
| 2 | Media type | `media_type` | Radio (Image/Video) | Yes | |
| 3 | Slide image | `slide_image` | File (max 3MB) | Conditional | Keeps the existing image if not changed |
| 4 | Slide video | `slide_video` | File (max 30MB) | Conditional | Uploaded via AJAX before submission |
| 5 | Content | `text` | TinyMCE textarea | Yes | |
| 6 | Has Quiz page | `is_quiz_page` | Radio (Yes/No) | Yes | |
| 7 | Question, options 1-3, correct answer, points, explanation | `question`, `option1-3`, `correct_answer`, `number_of_point`, `explanation` | Text/Textarea/Radio | Conditional | Shown when is_quiz_page=Yes |
| 8 | Question image | `question_image` | File (max 1MB) | No | |

## Functions / Actions
- **Update** (`finish_button`): saves the slide changes, returns to TRN-005.
- **Cancel**: returns to TRN-005 without saving.

## Navigation
- **Entered from:** TRN-005 (edit icon on each slide row).
- **Leads to:** TRN-005 (after saving or cancelling).
