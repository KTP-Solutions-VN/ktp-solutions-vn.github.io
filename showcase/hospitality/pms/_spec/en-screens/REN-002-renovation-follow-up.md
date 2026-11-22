# REN-002 — Refurbishment Tracker

**Type:** Full page
**Route:** renovation/followUp + dashed-style pretty route: renovation/follow-up
**Module:** REN = Refurbishment

## Overview
Overview list screen for renovation projects, filtered by business unit and villa, allowing the actual start/completion dates of a project to be marked, projects to be deleted, and navigation to related screens (detailed project follow-up, create new project, edit project).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Notes |
|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Sets the `property_business_unit_id` cookie |
| 2 | Villa | `villa_id` | Select2 (by BU) | |

### Displayed columns
| # | Column | Source Field Code | Notes |
|---|---|---|---|
| 1 | Property (villa) | `villa.name` | |
| 2 | Title | `title` | Project name |
| 3 | Start | `actual_start_date` / `start_date` (planned) | Displays "Will start on..."/"Started since..." |
| 4 | Status | `status` (Not Started / Under Progress / Completed) | |
| 5 | Actions | — | Follow up project, Edit, Delete |

## Functions / Actions
- **+ Create New Project**: navigates to REN-001 — New Refurbishment Project.
- **Follow up project (view icon)**: opens REN-003 — Project Timeline (`projectFollowUp`).
- **Edit (pencil icon)**: opens REN-004 — Edit Refurbishment Project (`edit`).
- **Delete (trash icon)**: deletes the `Renovation` record along with all related `RenovationItem`, `RenovationReceipt`, `RenovationPhoto`, and `RenovationPayment` records.
- **Mark actual start/completion date**: hidden `date_type` form (start/close) submits the selected date, updating `actual_start_date`/`actual_end_date` and the corresponding `status` (Under Progress/Completed).

## Navigation
- Entered from: the "Refurbishments" menu in the sidebar.
- Leads to: REN-001 (create new), REN-003 (Project Timeline), REN-004 (edit project).
