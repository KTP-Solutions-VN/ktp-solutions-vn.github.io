# PROP-058 — Listing Refresh Queue

**Type:** Full page
**Route:** property/listing-redone
**Module:** PROP = Property Records

## Overview
Page summarizing all OTA listing redo requests for Properties within a Business Unit, split into 2 groups: pending (sorted by request date) and completed (sorted by the most recent completion date). Allows marking a request as done or canceling it directly on the list.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (includes "All" option, supports Zone) | Yes (class `required`) | Changing value → reloads, saved to cookie |

### Displayed Columns
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `villa.name` | |
| 2 | Channel | `chanel.name` | Via Chanel contain |
| 3 | Requested By | `requested_by` | |
| 4 | Requested On | `requested_date` | |
| 5 | Done By | `done_by` | Only present once completed |
| 6 | Done On | `done_date` | Only present once completed |

## Functions / Actions
- Changing Business Unit → reloads the list.
- "Done" button on a pending row → calls AJAX `redoAction` with `action=done`, marking the request as completed.
- "Cancel" button on a pending row → calls AJAX `redoAction` with `action=cancel`, canceling the redo request.
- View log icon (if present) → opens PROP-057 (Listing Refresh History) by `villa_id`/`channel_id`.

## Navigation
- Opened from: Listing Quality menu (outside the scope of the current code).
- Navigates to: PROP-057 (Listing Refresh History).
- Child popup: None (Done/Cancel operations are handled via AJAX in place).
