# TRN-009 — Read Tutorial

**Type:** Full page
**Route:** `TrainingController::readTutorial($tutorial_id, $reading_id = null)` — `/training/read-tutorial/{tutorial_id}/{reading_id}`
**Module:** TRN = Training

## Overview
A slideshow presentation of a Tutorial's Slides, letting the user page through each slide (image/video + text) using the left/right arrows, automatically recording the reading session.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Current slide | `data_array[]` (title, text, image/video) | Sequential display (readonly) | — | Navigated via left/right arrow buttons; each slide auto-hides the Next button, which reappears after 10s |
| 2 | Reading session ID | `reading_id` | Hidden/URL param | — | Auto-generated (`uniqid()`) when reading starts, used to avoid creating duplicate UserTraining records |

Note: the reading interface currently does not display a slide's Quiz question (`quiz_question`) even though this data exists — only the title, media, and text are shown.

## Functions / Actions
- **Right arrow**: advances to the next slide.
- **Left arrow**: returns to the previous slide.
- **Stop** (before finishing): exits, returns to TRN-008 without marking the session complete.
- **Stop → "End"** (once the final "The End" slide is reached): submits the form, marks `is_complete_read=1` on the UserTraining record, returns to TRN-008.

## Navigation
- **Entered from:** TRN-007 (Library) or TRN-008 (My Record), via the "Read" icon.
- **Leads to:** TRN-008 (upon Stop or completing the reading session).
