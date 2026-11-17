# BOOK-077 — Guest Arrival Management

**Type:** Full page
**Route:** Booking/guestArrival
**Pretty route:** `/booking/guest-arrival`
**Module:** Booking

## Overview
Central hub for tracking arriving guests (replacing the old "Pre Arrival Information" screen), displaying the booking list across 5 tabs (Arrivals by Date, New Online Check-in, Alerts, Missing Check-out, Archive) with filters by business unit, date, online check-in status, and search. Table data is loaded via AJAX (not traditional server rendering).

## Detailed Description

### Displayed Tabs (with counts)
| # | Tab | Field Code | Notes |
|---|---|---|---|
| 1 | Arrivals by Date | `arrivals` | Bookings with a check-in date >= the selected date |
| 2 | New Online Check-in | `online` | Bookings that have submitted information via the guest portal but have not yet been reviewed by staff (`portal_submitted_at` is set, `portal_reviewed_at` is not) |
| 3 | Alerts | `alerts` | Bookings arriving soon (within 48h), with unapproved early check-in/late check-out requests, or overdue online check-in, that have not been "dismissed" by a user |
| 4 | Missing Check-out | `missing_checkout` | Already checked in but no expected departure time recorded |
| 5 | Archive | `archive` | Bookings that have completed check-out |

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select | No | Defaults to "All authorized BUs"; saved to a cookie when changed |
| 2 | From Date | `date` | Date picker | No | Defaults to today; past dates cannot be selected |
| 3 | Online Check-in Status | `status` | Select | No | All / Not started / In progress / Complete |
| 4 | Requests Only | `requests_only` | Toggle | No | Shows only bookings with pending early/late check-in/check-out requests |
| 5 | Search | `search` | Text | No | Searches by booking code, Beds24 code, confirmation code, OTA channel (referer), villa name, guest first/last name, flight number |

### Displayed Columns (per booking row)
| # | Column | Notes |
|---|---|---|
| 1 | Villa & Guest | Villa name, photo, guest name |
| 2 | Arrival & Departure | Check-in/check-out date and time; number of accompanying guests (companion) and passport upload status |
| 3 | Group & Documents | Azura Mobi chat group status, guest's signed contract |
| 4 | Online Check-in | Guest's online check-in form completion status (not_started/in_progress/complete) |
| 5 | Request Decision | Early check-in/late check-out request: approved/rejected, agreed time |
| 6 | (hidden) | Quick action buttons |

## Functions / Actions
- Switch tabs (Arrivals/Online/Alerts/Missing check-out/Archive) — calls `guestArrivalList` (AJAX)
- Load the badge count for each tab — calls `guestArrivalCounts` (AJAX)
- "Load 25 more bookings" button — paginated loading
- View "5-day occupancy" (villa's 5-day availability calendar) in a modal — calls `guestArrivalOccupancy` (AJAX)
- Update the arrival/departure time agreed with the guest ("Update guest time" modal) — calls `decideGuestArrivalTime` (AJAX)
- Confirm the guest count when the actual number differs from the booking (confirmation modal) — calls `confirmGuestArrivalGuestCount` (AJAX)
- Approve a guest's online check-in request — calls `reviewGuestArrivalCheckin` (AJAX)
- Dismiss an alert — calls `dismissGuestArrivalAlert` (AJAX)
- Download guest passports (`downloadGuestArrivalPassports`), contract (`downloadGuestArrivalContract`), concierge page (`downloadGuestArrivalConciergePage`) — file download links, not separate screens

## Navigation
- Opened from: Booking module menu > Guest Arrival
- Navigates to: no separate sub-pages; all detailed actions are handled via modals/drawers within the same page

**Additional note:** The `guestArrivalList`, `guestArrivalCounts`, `guestArrivalOccupancy`, `decideGuestArrivalTime`, `reviewGuestArrivalCheckin`, `confirmGuestArrivalGuestCount`, and `dismissGuestArrivalAlert` actions all return plain JSON (no dedicated .ctp view) and are merely supporting APIs for the `guest_arrival.ctp` screen — they are not documented as separate files, per the documentation scope.
