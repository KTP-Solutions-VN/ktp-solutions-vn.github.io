# OPR-015 — Final Prep Checklist

**Type:** Full page
**Route:** operator/makeupDetails?id=&last_id= + dashed-style pretty route: operator/makeup-details
**Module:** OPR = Upkeep Jobs

## Overview
Step-by-step (point-by-point) wizard screen for staff to perform make-up items: each point requires an evidence photo, with the ability to Next/Back/Reset/Update each point, and Finish to complete the entire make-up round. Structure/behavior are similar to OPR-008 (Housekeeping Checklist).

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Make-up round code | `url_id` | Query string `id` | Yes | |
| 2 | Current point | "Point N" | Display | — | Increments with Next |
| 3 | Evidence photo | `uploaded_*_img` | Image upload | Yes | |
| 4 | Description | `description` | Text | No | |
| 5 | Previous point ID | `last_id` | Query string | No | Used when clicking Back |

## Functions / Actions
- **Reset**: clears the data of the current point.
- **Next**: saves the current point (AJAX `saveMakeupDetails`/`setNextClickedMakeup`), moves to the next point.
- **Back**: returns to the previous point (AJAX `backMakeup`).
- **Update**: updates a saved point (AJAX `updateMakeupDetails`).
- **Finish**: completes the make-up round (AJAX `finishMakeupDetails`).

## Navigation
- Entered from: OPR-014 (clicking Start) or continuing an in-progress make-up round.
- Leads to: after Finish, returns to OPR-014 — Final Prep Rounds.
