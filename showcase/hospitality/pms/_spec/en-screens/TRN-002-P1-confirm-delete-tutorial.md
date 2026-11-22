# TRN-002-P1 — Confirm Lesson Deletion

**Type:** Popup (opened from TRN-002)
**Route:** Bootstrap modal within `create_tutorial.ctp`; the delete action calls `TrainingController::deleteTutorial($id)` — `/training/delete-tutorial/{id_base64}`
**Module:** TRN = Staff Academy

## Overview
Confirmation dialog shown before permanently deleting a Tutorial (together with all of its related Slides and Quiz questions).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Name of the tutorial to delete | shown in the modal title | Text (readonly) | — | Taken from the `data-title` attribute of the selected row |

## Functions / Actions
- **Delete/Save**: confirms the deletion, navigates via JS to `/training/delete-tutorial/{base64(id)}`.
- **Cancel**: closes the modal, no action taken.

## Navigation
- **Opened from:** TRN-002 (trash icon on each row).
- **Leads to:** after a successful or failed deletion, returns to TRN-002 (createTutorial) with a flash message.
