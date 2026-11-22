# TRN-005-P1 — Confirm Slide Deletion

**Type:** Popup (opened from TRN-005)
**Route:** Bootstrap modal within `edit_tutorial.ctp`; the delete action calls `TrainingController::deleteSlide($id)` — `/training/delete-slide/{id_base64}`
**Module:** TRN = Staff Academy

## Overview
Confirmation dialog shown before deleting a Slide (and its associated Quiz question, if any).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Confirmation text | — | Static text | — | Generic deletion confirmation message |

## Functions / Actions
- **Save/Delete**: navigates via JS to `/training/delete-slide/{base64(id)}`.
- **Cancel**: closes the modal.

## Navigation
- **Opened from:** TRN-005 (trash icon on each slide row).
- **Leads to:** after deletion, returns to TRN-005 (editTutorial) with a flash message.
