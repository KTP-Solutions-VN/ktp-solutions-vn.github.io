# VSV-020-P1 — Job Status (Garden Job Status)

**Type:** Popup (opened from VSV-020, as a dedicated page — currently a static mockup only)

**Route:** `VillaServicesController::gardenJobStatus()` — `/villa-services/garden-job-status`

**Module:** Villa Services — Garden

## Overview
An unfinished mockup screen simulating a mobile interface for operations staff to view the progress of a shift (villa, start/end time) and take photos, with Stop/Finish buttons. All content is static (hard-coded) data; the action only sets the page title (mistakenly taken from `pool_text`).

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Shift info (villa, time) | — | Static text ("Villa a – Start: 8:25 – End: 10:30") | — | Hard-coded, does not read real data |
| 2 | Take photo | — | Camera icon (not yet wired to any action) | — | |
| 3 | Illustration images | — | 4 static icon images | — | |

## Functions / Actions
- **Stop**: not yet wired to any real action (empty href).
- **Finish**: not yet wired to any real action (empty href).

## Navigation
- Entered from: VSV-020 (embedded in the same page in the current mockup).
- Navigates to: none (static mockup).
