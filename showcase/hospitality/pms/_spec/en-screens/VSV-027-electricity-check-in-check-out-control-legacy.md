# VSV-027 — Electricity Check-in/Check-out Control (Legacy — Control)

**Type:** Full page

**Route:** `VillaServicesController::control()` — defaults to `/villa-services/control`; date-navigation data loaded via AJAX `getElecricutyControlAjax`

**Module:** Villa Services — Electricity

## Overview
The legacy version of electricity check-in/check-out control, combined into a single page: lists villas checking out today that are still missing meter readings/payment (highlighted in red) and villas checking in today that are still missing an opening meter reading (highlighted in blue), with back/forward navigation between days via arrow/calendar controls. This functionality has been superseded by two more detailed screens, VSV-011 (`electricityCheckInControl`) and VSV-012 (`electricityCheckOutControl`), but the route/action still exists in the system.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select (select2) | No | |
| 2 | Check-out Date | Date picker within the "CHECK-OUT-<date>" band | Date | No | Navigate back/forward by arrow or calendar selection |
| 3 | Check-in Date | Date picker within the "CHECK-IN-<date>" band | Date | No | Same as above, independent of the check-out date |

### Today's Check-out Table
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa checking out today still missing a meter reading/invoice/collected payment |
| 2 | Check-out by | Person who performed it (currently not populated — always empty) |
| 3 | Check-in information | "OK" if an opening reading exists, "Missing" if not |

### Today's Check-in Table
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa checking in today still missing an opening reading |
| 2 | Check-in by | Person who performed it (currently not populated — always empty) |

## Functions / Actions
- Changing Business Unit → reloads both tables via AJAX.
- Date navigation (left/right arrows or calendar selection) for each table independently.
- No add/edit/delete action buttons directly on this page.

## Navigation
- Entered from: Main menu (legacy path, possibly no longer directly linked from the current UI since VSV-011/VSV-012 replaced it).
- Navigates to: no child page.
