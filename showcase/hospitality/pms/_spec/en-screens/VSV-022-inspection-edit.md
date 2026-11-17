# VSV-022 — Inspection Report Processing Setup (Inspection Edit)

**Type:** Popup (opened from VSV-021, as a dedicated page)

**Route:** `VillaServicesController::inspectionEdit()` — `/villa-services/inspectionEdit?id=<inspection_key>`

**Module:** Villa Services — Inspection

## Overview
An intermediate page before processing an inspection report: summarizes the villa/inspector/timing/number of items, allows setting a common due date and assigning a responsible person per department (Maintenance, Cleaning, Purchasing, Gardening, Renovation) corresponding to the flagged items, before starting (Start) the detailed processing screen.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Report summary | — | Text (read-only) | — | Villa, inspector, timing, number of tasks; if already approved, also shows the approver/approval date |
| 2 | Set Global Due Date | `date_planning` | Text (datepicker) | No | Only shown to non-Team Leader users |
| 3 | Maintenance | `maintenance[]` | Select (select2) | Yes, if this department appears in the inspection items | Only shown if the report has items belonging to this department |
| 4 | Cleaning | `cleaners[]` | Select (select2) | Yes, if applicable | |
| 5 | Purchasing | `purchasing[]` | Select (select2) | Yes, if applicable | |
| 6 | Gardening | `gardening[]` | Select (select2) | Yes, if applicable | |
| 7 | Renovation | `renovation[]` | Select (select2) | Yes, if applicable | |

- For Team Leader: the due-date/department-assignment section is not shown — they only see the summary and click Start.
- Each department select has an error label "Please Select the supervisor." if left blank when that department is required.

## Functions / Actions
- **Start**: if the report already has work in progress → shows a confirmation modal "Do you wish to continue the report?" (Yes to continue, No to start over); then navigates to VSV-022-P1 (`inspectionEditDetails`) to process each item.

## Navigation
- Entered from: VSV-021 — the "Edit" button on each report.
- Navigates to: VSV-022-P1 (Process inspection items in detail).
