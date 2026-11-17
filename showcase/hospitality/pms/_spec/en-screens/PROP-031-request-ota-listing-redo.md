# PROP-031 — Request OTA Listing Redo

**Type:** Full page
**Route:** property/redo/:villa_id/:chanel_id
**Module:** PROP = Properties

## Overview
Form for submitting a "redo" request for a property's OTA listing to an assigned staff member, along with a deadline. On submission, the system creates a `VillaCoefficient` record (type `redo_list`) and a `NoticeBoard` (task notification) assigned to the recipient.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Redo (Property name, display only) | — | Text | — | Displays `villa.name` |
| 2 | Send to (recipient) | `user_id` | Select2 (list of eligible Users — Superadmin, Admin in the same BU, Employee/Team Leader with role_id=2 in the same BU) | Yes (class `required`) | |
| 3 | Deadline | `deadline` | Text (date picker, read-only, cannot select today or earlier) | Yes | |

## Functions / Actions
- "Save" button — submits the form: creates a `VillaCoefficient` (type=`redo_list`, status `redo_action=pending`, saving JSON `requested_by/requested_date/requested_to`), creates a `NoticeBoard` (status=pending, content "Request to redo {villa} on {channel} ...") and `NoticeBoardDetail`; then redirects to PROP-030 (Quality) with a query to open the corresponding Property/channel that was just marked for redo.
- "Cancel" button — returns to PROP-030 (Quality) with the same Property context (no data saved).

## Navigation
- Opened from: PROP-030 (Quality) — "Redo" button on each OTA channel when the listing is first flagged for redo.
- Navigates to: PROP-030 (`Property::quality`) after saving or clicking Cancel, with a `message` (success/fail) displayed as a banner on PROP-030.
- Child popup: none (this is a standalone page, not a modal).
