# PROP-026 — Photography Planning

**Type:** Full page
**Route:** property/photography/:shootId/:guidelineId (default dashed-format route; `$shootId` also doubles as a special "sub-action" value: `guidelines`, `download-guideline`, `delete-guideline` to branch into photography guideline management actions)
**Module:** PROP = Properties

## Overview
The central page for managing Photo Shoot Planning for Properties/Residences/Units by Business Unit: creating/editing shoot schedules, tracking post-shoot follow-ups, and confirming completed photo sets. This action renders the `Photos/planning.ctp` template (not `photography.ctp` directly — `photography.ctp` is a legacy/simplified template, while the main dashboard lives in the `planning` view).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` / `id` (query) | Select2 | Yes | Changing the value → redirects with `business_unit_id` (base64) |
| 2 | Plan Scope | (part of `scopeOptions`) | Select | Yes | The Property/Residence/Unit scope associated with the shoot schedule |
| 3 | Shoot Objective | (part of `shootObjectiveOptions`) | Select | Yes | |
| 4 | Scheduled date, notes, etc. | (per `editShoot`/planning form) | Multiple text/date fields | Yes (field-dependent) | Data saved via `savePlanningShoot()` into the Shoot Plan entity |

The main table data (`planningData`) includes the list of shoot schedules (status, date, business unit) and the list of pending follow-ups.

## Functions / Actions
- Create/edit shoot schedule (POST submit to the same action; `shootId` = 0 when adding, > 0 when editing) — supports both AJAX (returns JSON) and standard submission (flash message + redirect).
- Delete shoot schedule — `deleteShootPlan/{shootId}`.
- Confirm shoot schedule — `confirmShootPlan/{shootId}`.
- Confirm photo set as completed — `confirmPhotoSet/{shootId}`.
- Record a follow-up action — `recordFollowUpAction/{followUpId}`.
- Mark a follow-up as complete — `completeFollowUp/{followUpId}`.
- Delete a follow-up — `deleteFollowUp/{followUpId}`.
- View property photo set — links to `Photos::property`.
- If planning storage (`photoPlanningReady()`) is not ready, save actions are blocked and a warning/JSON error is displayed.
- Special sub-routes: `photography/guidelines/{guidelineId}` (manage photography guideline templates in PDF), `photography/download-guideline/{guidelineId}` (download a guideline), `photography/delete-guideline/{guidelineId}` (delete a guideline).

## Navigation
- Opened from: the main Photography menu; PROP-027 ("Plan Photo Shoot" button); PROP-019 (breadcrumb).
- Navigates to: `newShooting` (PROP-019), `photographyScores` (PROP-028), `photographyMissingPhotos` (PROP-027), `photographerEvaluation` (PROP-025), `Photos::property` (view/upload photos, outside this scope).
- Child popup: none (the main view lives in `Photos/planning.ctp`, not `photography.ctp`).
