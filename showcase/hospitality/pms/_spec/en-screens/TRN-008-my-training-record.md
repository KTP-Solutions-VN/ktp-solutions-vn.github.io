# TRN-008 — My Learning Progress

**Type:** Full page
**Route:** `TrainingController::myRecord()` — `/training/my-record`
**Module:** TRN = Staff Academy

## Overview
A list of the Tutorials the current user has previously read, including the number of views, the most recent read date, and whether a re-read is due (based on the quiz frequency).

## Detailed Description
Filters:
| # | Filter Label | Field Code | Input Type | Notes |
|---|-----------|-----------|------------|---------|
| 1 | Business unit | `business_unit` (GET) | Select2 | |
| 2 | Sort by | `sort_by` (GET) | Select (title/level/due) | |

Displayed columns:
| # | Column | Field Code | Notes |
|---|-----|-----------|---------|
| 1 | Title | `tutorial_data.title` | |
| 2 | Level | `tutorial_data.access_level` | |
| 3 | Module | `tutorial_data.role` | |
| 4 | View count | `view_count` | Counts UserTraining records |
| 5 | Last read date | `reading_date` | |
| 6 | Status | `status` | Due on {date} / Due Now / Overdue |
| 7 | Actions | — | Read |

## Functions / Actions
- **Read** (book icon): → TRN-009 (readTutorial), starting a new reading session.

## Navigation
- **Entered from:** main menu "Staff Academy" → "My Learning Progress"; also the destination after completing or stopping a reading session (TRN-009).
- **Leads to:** TRN-009 (reading a lesson).
