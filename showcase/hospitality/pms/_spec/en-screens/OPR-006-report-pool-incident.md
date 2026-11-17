# OPR-006 — Report Pool Incident

**Type:** Full page
**Route:** operator/poolReport/:id + dashed-style pretty route: operator/pool-report/:id
**Module:** OPR = Garden/Pool Operations

## Overview
Screen for pool staff to report an incident that occurred during a job: description of the issue with evidence photos; the system saves a `PoolCleaningProblem` record, changes `PoolCleaning.status = Problem`, and sends a warning email to the business unit responsible for the villa.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa / start time | `pool_cleaning.villa.name`, `start_time` | Display text (readonly) | — | |
| 2 | Incident photos | `file` (dropzone, multiple images) | Image upload (Dropzone) | Yes | Saved to `PoolCleaningProblem.image` (JSON) |
| 3 | Incident description | `text` | Textarea | Yes | Saved to `PoolCleaningProblem.text`; also used as the content of the email sent to the business unit |
| 4 | Pool job ID | `id` | Hidden | Yes | |

## Functions / Actions
- **Camera/photo upload**: opens the Dropzone to select/capture incident evidence photos.
- **Submit**: POSTs the data; if an incident report already exists for this job, it is updated (upsert by `pool_cleaning_id`); after saving, changes `PoolCleaning.status = Problem` and sends an email (template `pool_cleaning_problem_email`) with attached photos to the `Villa.business_unit` email address.

## Navigation
- Entered from: the pool job handling flow when an incident is detected (typically linked to OPR-005).
- Leads to: no specific automatic navigation (returns JSON `{status:1}`); returns to the pool operations flow.
