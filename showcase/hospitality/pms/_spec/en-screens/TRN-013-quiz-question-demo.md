# TRN-013 — Quiz Question Demo

**Type:** Full page
**Route:** `TrainingController::quizQuestion()` — `/training/quiz-question`
**Module:** TRN = Training

## Overview
A static page illustrating a sample quiz question interface (hard-coded "A VIP booking has a value"), not connected to any actual Quiz data. This appears to be a demo/placeholder screen, with no link pointing to it from elsewhere in the module.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|-----------|---------------------|----------|---------|
| 1 | Sample question | — | Static text | — | Hard-coded in the view |
| 2 | Options A/B/C | — | Radio (static) | — | Not actually submitted to the server |

## Functions / Actions
- **Validate**: a form submit button, but with no server-side handling action (the form has no action attribute; it exists only to illustrate the interface).

## Navigation
- **Entered from:** no link pointing to this page was found from other screens in the Training module; only accessible via a direct URL.
- **Leads to:** none.
