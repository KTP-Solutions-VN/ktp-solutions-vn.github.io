# PROP-057 — Listing Refresh History

**Type:** Popup (opened from PROP-040 or PROP-058)
**Route:** property/redo-log/:villa_id/:channel_id
**Module:** PROP = Property Records

## Overview
Popup/page displaying the history of OTA listing redo requests for a Property on a specific channel, including completion date, the person who completed it, and the person who originally requested it (sourced from the `VillaCoefficient` table of type `redo_list`, with `NoticeBoard`/`ReceivedUser`/`SendUser` information).

## Detailed Description
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Redone On | `done_date` | Date the redo request was completed |
| 2 | By | `done_by` | Person who completed it |
| 3 | Requested By | `requested_by` | Person who made the original request |

## Functions / Actions
- View-only history, no editing operations.

## Navigation
- Opened from: PROP-040 (Listing Quality — icon to view Redo request log), PROP-058 (Listing Refresh Queue).
- Navigates to: None.
- Child popup: None.
