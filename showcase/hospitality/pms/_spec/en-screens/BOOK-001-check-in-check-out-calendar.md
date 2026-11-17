# BOOK-001 — Check-in / Check-out Calendar
**Type:** Full page
**Route:** Booking/list (default: `/booking/list`)
**Module:** Booking

## Overview
The homepage/dashboard screen of the Booking module, displaying two daily tables: the list of guests **checking out** on the day (red-highlighted band) and the list of guests **checking in** on the day (green-highlighted band), grouped by Business Unit/Zone. It allows quick navigation between dates, filtering by business unit, service type, and the concierge's personal schedule, plus quick actions (assigning a concierge, setting check-in/check-out times, adding remarks, approving guest requests).

## Detailed Description

### Filters / Controls (top of page)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit/Zone | `business_unit_id` | Select (select2) | No | List includes "All" plus the business units/zones the user has access to (retrieved via `_getAuthBasedBuVilla`) |
| 2 | Booking display mode | `show_bookings` | Select | No | `all_bookings` (All) / `concierge_service_only` (Concierge Service Only). Visible only to Superadmin/Admin/BU Manager/Planner |
| 3 | My Schedule | `schedule` | Select | No | `everyone` (Everyone) / `my_schedule` (My Schedule). Visible only to the Concierge role (not Planner) |
| 4 | Show concierge | `show_concierge` | Select | No | `concierge_only` (Concierge Only) / `all_bu_team` (Entire BU Team). Visible only to Superadmin/Admin/BU Manager/Planner |
| 5 | Sort by | `sort_by` | Select | No | `property` (By Villa) / `time` (By Check-in/Check-out Time) |
| 6 | Check-out date navigation | `check-out-left/right`, `check-out-pick-left/right` | Arrow buttons + Datepicker (hidden, date format d/m/Y) | No | Move one day back/forward, or quick-select a check-out date to view |
| 7 | Check-in date navigation | `check-in-left/right`, `check-in-pick-left/right` | Arrow buttons + Datepicker (hidden, date format Y-m-d) | No | Move one day back/forward, or quick-select a check-in date to view |

### Displayed Columns — CHECK-OUT Table (grouped by villa/business unit, with a group header showing the group name)
- Villa (villa name, house icon)
- Booking Grade (VIP)
- Red Box (warning icon if the villa is flagged "is_red_box")
- Guest Name
- Nationality (flag icon)
- Nights
- Booking Channel/OTA (Referer)
- Check-out time (clickable to set a time if `set_time` is not yet set; shown in blue if the time was set following an approved guest request)
- Assigned concierge (staff emoticon, or a "ghost" icon if unassigned; crown icon if the villa owner)
- Remark — editable; red "X" icon if no remark has been entered
- Guest request approval status (icon showing orange in/out arrow if a request is pending approval, blue if approved, gray if completed)

### Displayed Columns — CHECK-IN Table (same structure as the check-out table)
- Villa (light green background if the check-in process has been completed / marked "done")
- Booking Grade, Red Box, Guest Name, Nationality, Nights, Booking Channel (OTA)
- Check-in time (shown in green if completed on time, red if past the expected time; with an arrival mode icon: airport/at villa)
- Assigned concierge, Remark, Guest request approval status

## Functions / Actions
- Select a Business Unit/Zone to filter the entire list (AJAX reload)
- Toggle between "All Bookings" / "Concierge Service Only" display
- Toggle between "Everyone" / "My Schedule" (my_schedule) — for Concierge
- Toggle between "Concierge Only" / "Entire BU Team"
- Sort by villa or by time
- Navigate the date backward/forward or pick a specific date for each table (check-in/check-out) — reloads data via AJAX
- Set/edit check-in and check-out times directly in the table (click the time cell)
- Assign/change the concierge responsible for a villa (click the concierge icon, a selection popup opens — modal `#exampleModal2` for deleting a booking, and other popups for assigning a concierge)
- Add/edit a remark inline on each row
- Approve the guest's requested arrival/departure time (guest_approval)
- "Guest Airport Transfer" popup (`#guest_time_popup`) showing airport transfer details
- Add/edit/delete Business Unit popup (`#exampleModal`) and delete-booking confirmation popup (`#exampleModal2`)

## Navigation
- Opened from: Main menu of the Booking module ("In & Out" / Check-in-Check-out Calendar)
- Navigates to: Clicking the guest name/villa may open BOOK-009 (Booking Details) or BOOK-013 (Check-in Progress) depending on the workflow
- Sub-popups: assign-concierge popup, remark popup, delete-booking confirmation popup, airport transfer info popup (all are modals embedded within the same page, not separate actions)
