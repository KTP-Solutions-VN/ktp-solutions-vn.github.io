# OPR-001 — Grounds & Pool Jobs

**Type:** Full page
**Route:** operator/gardenJobStatus (query `?id=`) + dashed-style pretty route: operator/garden-job-status
**Module:** OPR = Upkeep Jobs

## Overview
Screen for garden staff (gardener) while performing a garden job: capture/upload photo evidence of completed work, then click Finish to record the GPS location, end time, and change the job status to "Cleaned"; or click Stop to halt the job midway.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa / start - end time | `garden_jobs.villa.name`, `start_time`, `end_time` | Display text (readonly) | — | Retrieved from the `GardenJobs` record by the `id` passed via query string |
| 2 | Job completion photos | `file` (dropzone, multiple images) | Image upload (Dropzone, resize 1000x500, crop) | Yes (required when clicking Finish) | Saved to `GardenCleaning.images` (JSON list of file names) |
| 3 | Current latitude / longitude | `lat`, `lon` | Hidden, auto-captured via `navigator.geolocation` | Yes | If the browser does not share location, a warning modal (`operator/location_allow_error`) is shown and Finish is blocked |
| 4 | Garden job ID | `id` | Hidden | Yes | Taken from the `id` query string |

## Functions / Actions
- **Camera/photo upload**: opens the Dropzone to select/capture evidence photos.
- **Finish**: if no images are queued, sends an AJAX POST directly to `garden-job-status?id=` with `lat`, `lon`, `id`; if images are present, Dropzone automatically uploads the files (multipart) first. On success, updates `GardenCleaning.images`, `end_time`, `latlng_end`, `status = Cleaned`, and navigates back to OPR-002 (Garden Rounds) filtered to the job's date.
- **Stop** (link): calls the `stopStatus/:id` action, sets `GardenCleaning.status = Stopped`, then returns to OPR-002.

## Navigation
- Entered from: the view/start job button in the garden job list OPR-002 (or the job-start flow on mobile).
- Leads to: after Finish/Stop, returns to OPR-002 — Garden Rounds (filtered by the job's date).
