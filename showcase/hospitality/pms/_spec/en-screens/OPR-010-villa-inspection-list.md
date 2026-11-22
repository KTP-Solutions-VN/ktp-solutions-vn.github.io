# OPR-010 — Condition Checks

**Type:** Full page
**Route:** operator/inspection + dashed-style pretty route: operator/inspection
**Module:** OPR = Upkeep Jobs

## Overview
Screen for selecting a business unit and villa to start a villa inspection round, while also displaying a history table of inspection rounds (completed/in-progress/draft) with view, continue-management, download PDF, and archive actions.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business unit | `business_unit_id` | Select2 | Yes | Defaults based on cookie |
| 2 | Villa | `villa_id` | Select2 (loaded via AJAX by BU) | Yes | |
| 3 | Inspection history table | `inspectionTable` (DataTable, AJAX `inspectionAjax`) | Table | — | Columns: Villa, Date, Status (completed/draft), Actions |

## Functions / Actions
- **Start**: creates a new `Inspection` record (AJAX `saveInspection`, generates `inspection_key`), navigates to `operator/inspectionDetails?id=<inspection_key>` (OPR-011).
- **View (eye icon, when completed)**: navigates to OPR-012 — View Inspection Results (`inspectionView`).
- **Manage (edit icon, when in-progress/draft)**: navigates to OPR-013 — Resume Condition Check (`inspectionTaskView`).
- **Download PDF**: opens the inspection report PDF file if one exists.
- **Archive (trash icon)**: deletes/archives the inspection record (AJAX `deleteInspection`).
- **Draft**: for a record in draft status, click to continue entering data (`fetchDraftInspection`).

## Navigation
- Entered from: the "Condition Checks" menu in the sidebar.
- Leads to: OPR-011 (start a new inspection), OPR-012 (view results), OPR-013 (manage an in-progress inspection).
