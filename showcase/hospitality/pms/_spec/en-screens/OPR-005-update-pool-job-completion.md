# OPR-005 — Update Pool Job Completion

**Type:** Full page
**Route:** operator/poolJob/:id + dashed-style pretty route: operator/pool-job/:id
**Module:** OPR = Garden/Pool Operations

## Overview
Screen for pool staff while performing a job: capture/upload completion evidence photos, then submit to record the GPS location and end time, and change the status to `PoolCleaning.status = Cleaned`. Functionally similar to OPR-001 (garden job) but applied to pools.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa / start time | `pool_cleaning.villa.name`, `start_time` | Display text (readonly) | — | Retrieved from `PoolCleaning` by `id` |
| 2 | Job completion photos | `file` (dropzone, multiple images) | Image upload (Dropzone) | Yes | Saved to `PoolCleaning.images` (JSON) via `_imageUpload` |
| 3 | Current latitude / longitude | `lat`, `lon` | Hidden, captured via `navigator.geolocation` | Yes | Used to calculate distance to `villa.villa_location`; > 200m results in `gps = NOK` |
| 4 | Pool job ID | `id` | Hidden | Yes | |

## Functions / Actions
- **Camera/photo upload**: opens the Dropzone to select/capture photos.
- **Submit/Finish**: POSTs photos + `lat`/`lon` to this same route; the server calculates the GPS distance, updates `images`, `end_time`, `latlng_end`, `status = Cleaned`, `gps = OK/NOK`, and returns JSON `{status, url: 'operator/pools'}` for the JS to navigate.

## Navigation
- Entered from: the pool job start flow (mobile/villa-services) when staff accept a job.
- Leads to: after a successful submit, redirects to OPR-003 — Pool Job List.
