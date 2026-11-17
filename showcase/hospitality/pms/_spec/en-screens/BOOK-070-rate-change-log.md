# BOOK-070 — Rate Change Log

**Type:** Full page
**Route:** Booking/ratesLogs (default: `/booking/rates-logs`)
**Pretty route:** no dedicated route found in config/Routes.php (uses the default route)
**Module:** Booking

## Overview
Page for recording and looking up logs/notes related to villa rate changes, which can be declared at 3 levels: Villa (Property), Residence, or Unit/Block. Supports adding/editing/deleting logs directly on the page via a popup.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (GET) | No | Passed via query string in base64 form |
| 2 | Entry Level | `entry_level` | Select (Property/Residence/Unit) | No | Determines which subsequent filter field is displayed |
| 3 | Residence | `residence_id` | Select | Required if entry_level = Residence | Shown only when the Residence level is selected |
| 4 | Unit/Block | `unit_id` | Select | Required if entry_level = Unit | Shown only when the Unit level is selected |
| 5 | Villa | `villa_id` | Select | Required if entry_level = Property | Shown only when the Property level is selected |

Each time a filter is changed, the page reloads via the query string (`window.location`).

### Log List Table
| # | Column | Notes |
|---|---|---|
| 1 | Date | Date the log was recorded |
| 2 | Property Unit Or Residence | Name of the corresponding villa/residence/unit |
| 3 | Action | Note/comment content |
| 4 | By | Person who performed the action (`action_by`) |
| 5 | Actions | Edit icon (opens the Edit popup), Delete icon (opens the Delete popup) |

## Functions / Actions
- Filter by Business Unit / Entry Level / Villa / Residence / Unit
- **+** icon (top right of the table) — opens the **Add Log** popup (hidden inputs: villa, business_unit_id, residence_id, unit_id, entry_level; "Action" textarea) — submits via POST to the `ratesLogs` action itself with `action=Save`
- **Edit** icon on each row — reopens the popup, prefilled with the comment content — submits with `action=Edit`
- **Delete** icon on each row — opens a delete confirmation popup — submits with `action=delete`

The add/edit/delete popups share a single modal (`#exampleModal1`) on this page — they are not separate pages.

## Navigation
- Opened from: BOOK-066 (Logs button)
- Navigates to: no navigation to another page (add/edit/delete actions are handled directly in the popup on this page)

## Notes
The controller still has 2 separate actions, `ratesLogAdd` (BOOK-071) and `ratesLogEdit` (BOOK-072), with their own separate full-page views, but they are no longer linked from BOOK-070 (having been replaced by the add/edit popup on this page). See the notes in BOOK-071/BOOK-072.
