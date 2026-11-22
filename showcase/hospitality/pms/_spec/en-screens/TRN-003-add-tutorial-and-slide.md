# TRN-003 — New Lesson

**Type:** Full page
**Route:** `TrainingController::addTutorial($tutorial_id = null, $slide_id = null)` — `/training/add-tutorial/{tutorial_id}/{slide_id}`
**Module:** TRN = Staff Academy

## Overview
A 2-step wizard screen: (1) create/declare the Tutorial's general information; after saving, (2) a form for adding content Slides one after another (image/video + text + optional quiz) until the Finish button is pressed.

## Detailed Description

**Form 1 — Tutorial Information (`tutorial_form`)**
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | Based on the BUs the user is authorized for |
| 2 | Title | `title` | Text | Yes | |
| 3 | Image | `image` | File upload (image, max 1MB) | No | |
| 4 | Level | `access_level` | Select (staff/manager/admin) | Yes | |
| 5 | Target audience (Module Access) | `user_role[]` | Multi-select checkbox | Yes | Saved as JSON in `role_id` |
| 6 | Has Quiz | `is_quiz` | Radio (Yes/No) | Yes | |
| 7 | Maximum quiz frequency | `max_quiz_frequency` | Number | Yes | Number of days |
| 8 | Minimum quiz frequency | `min_quiz_frequency` | Number | Yes | Number of days |
| 9 | Ready for release | `is_ready_release` | Toggle switch (Yes/No, hidden input) | No | If Yes, sets `release_date` = today |

**Form 2 — Slide (`slide_form`, only shown once the Tutorial already has an id)**
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Slide title | `title` | Text | Yes | |
| 2 | Media type | `media_type` | Radio (Image/Video) | Yes | |
| 3 | Slide image | `slide_image` | File (max 3MB) | Required if media=Image | |
| 4 | Slide video | `slide_video` | File (max 30MB) | Required if media=Video | Uploaded separately via AJAX before form submission (`uploadSlideVideo`) |
| 5 | Content | `text` | WYSIWYG textarea (TinyMCE) | Yes | |
| 6 | Has Quiz page | `is_quiz_page` | Radio (Yes/No) | Yes | |
| 7 | Question | `question` | Text | Required if is_quiz_page=Yes | |
| 8 | Question image | `question_image` | File (max 1MB) | No | |
| 9 | Options 1/2/3 | `option1`, `option2`, `option3` | Text | Required if is_quiz_page=Yes | |
| 10 | Correct answer | `correct_answer` | Radio (1/2/3) | Required if is_quiz_page=Yes | |
| 11 | Points | `number_of_point` | Text/Number | Required if is_quiz_page=Yes | |
| 12 | Explanation | `explanation` | Textarea | Required if is_quiz_page=Yes | |

## Functions / Actions
- **Add Slide/Update** (Tutorial form): saves the Tutorial information; if this is a new creation, redirects back to this same page with the newly created `tutorial_id` to open the Slide form.
- **Upload** (video): AJAX uploads the slide video separately, returning the filename before the main form is submitted.
- **Next**: saves the current slide, returns to this page to enter the next slide.
- **Back**: returns to editing the previous slide.
- **Finish**: saves the current slide and ends the flow, redirecting to TRN-002.

## Navigation
- **Entered from:** TRN-002 ("Add New" button), TRN-005 ("Add New" slide button, calling `addTutorial($id)`), or repeats itself (Next/Back) within this same flow.
- **Leads to:** upon pressing Finish or on a save error → returns to TRN-002 (createTutorial).
