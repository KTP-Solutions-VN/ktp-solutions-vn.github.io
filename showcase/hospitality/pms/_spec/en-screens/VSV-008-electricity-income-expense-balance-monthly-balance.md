# VSV-008 — Electricity Income/Expense Balance (Monthly Balance)

**Type:** Full page

**Route:** `VillaServicesController::monthlyBalance()` — defaults to `/villa-services/monthly-balance` (POST to the same action for search)

**Module:** Villa Services — Electricity

## Overview
A page for reconciling the electricity amount collected from guests (at check-out) against the amount payable to the provider/monthly bill, over a date range, either per villa or across the full villa list.

## Detailed Description

### Search Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Start Date | `start_date` | Text (datepicker) | Yes | Defaults to the current date |
| 2 | End Date | `end_date` | Text (datepicker) | Yes | Defaults to the current date |
| 3 | Business Unit | `business_unit` | Select | Yes | Based on BU/zone authorization |
| 4 | Villa | `villa` | Select (select2) | Yes | Selecting a villa → shows a daily breakdown (tab "villa"); leaving it blank → shows a summary by villa (tab "date") |

### Data Table — Summary by Villa mode (no specific villa selected)
| # | Column | Notes |
|---|---|---|
| 1 | Property | Villa name |
| 2 | Received | Total electricity amount collected from guests within the filtered date range |
| 3 | Paid | Total electricity amount paid to the provider (bill) within the filtered date range |
| 4 | Profit | Received − Paid |
| 5 | Warning | Alert for the number of instances with missing payment information ("n payment missing") |

### Data Table — Detail mode for a specific villa
| # | Column | Notes |
|---|---|---|
| 1 | Date | Date incurred (check-out or bill issue date) |
| 2 | Action | "Check out" (collected from guest) or "Bill" (provider bill) |
| 3 | Received | Amount received (if Action = Check out) |
| 4 | Paid | Amount paid (if Action = Bill) |
| 5 | Net | Running balance after that row |

## Functions / Actions
- **Search**: submits a search by date range + BU + villa (POST).
- No add/edit/delete buttons — this is a read-only reporting/reconciliation screen.

## Navigation
- Entered from: Main menu (Electricity/Monthly Balance item).
- Navigates to: no child page.
