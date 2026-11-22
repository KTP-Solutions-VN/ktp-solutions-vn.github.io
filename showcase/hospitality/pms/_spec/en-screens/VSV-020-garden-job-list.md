# VSV-020 — Today's Garden Jobs

**Type:** Full page

**Route:** `VillaServicesController::gardenJobList()` — defaults to `/villa-services/garden-job-list`

**Module:** In-Stay Services — Garden Care

## Overview
An unfinished mockup/wireframe screen: the action only sets the page title (the title is mistakenly taken from `pool_text` — likely an uncorrected copy-paste error), and the view contains entirely static (hard-coded) data, not tied to any real model/data. The content simulates a "Pool Operator" screen for operations staff to select a villa and start a shift.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | `#sel1` | Select (static, hard-coded options: "Villa Kari", "Villa Mika") | No | No PHP logic reads real data |
| 2 | Villa list | — | Static cards (image + villa name + start button) | — | Hard-coded with 2 sample villas |

The view file also contains (as an HTML comment, not displayed) an old schedule table with columns Villa/Start/End/Status — indicating this is a draft in the process of being gradually replaced.

## Functions / Actions
- "Start" button on each sample villa — not yet wired to any real action (empty href).
- No AJAX/submit integration in the current action.

## Navigation
- Entered from: Main menu (Garden Care Hub item — the path exists but is not yet linked from any other official UI in the module).
- Navigates to: VSV-020-P1 (job status mockup, embedded in the same page).
