# ACC-030 — Channel Payout Matching

**Type:** Full page

**Route:**
- Main page: `AccountController::ota($ota_id = null)` — default `/account/ota` or `/account/ota/<key>` (the `$ota_id` parameter is passed from the sidebar but **is not used by the action** — it only sets the title/`active_menu`, not used to filter data)
- AJAX to fetch table data: `AccountController::getOtaData()` — default `/account/get-ota-data` (GET/POST, returns JSON, `autoRender = false`)
- AJAX to update payment reconciliation status: `AccountController::updatePaymentRecon()` — default `/account/update-payment-recon` (POST, returns JSON)

**Module:** Finance & Admin

## Overview
An OTA payment reconciliation screen (currently applies only to `Booking.com`): aggregates all bookings requiring payment/commission reconciliation, classified by payment status (Locked/Pending/In transit/Charged/Received/No payment), allowing staff to mark payment as received, commission as paid, or a virtual card as charged — marking "payment received" automatically generates a credit entry in the corresponding account's Statement (Account Statement).

## Detailed Description

### Data retrieval conditions (in `getOtaData`)
Retrieves `Booking` records where: `referer = 'Booking.com'`, `Villa.business_unit_id IN (user's currently selected BUs)`, `check_out_date >= (today - 1 month)`, `status != 'Cancelled'`, `Villa.status = 'Open'`, `is_paid_commission = 'no'`. Also contains Guest, Villa (BusinessUnit, Agency, Owner, VillaOtaManagement.Log filtered by `meta_key = 8`, `module = 'villa_ota_management'`).

### Summary block ("Total" / "By month" tabs)
| # | Metric | Field Code | Notes |
|---|---|---|---|
| 1 | Amount expected | `totals.expected` | Total gross amount (converted to SGD if currency differs, via the `Rate` table for the booking month, default rate 1.35 if no Rate record exists) |
| 2 | Commission due | `totals.commission_due` | Total commission for bookings that are "Received" but `is_paid_commission = no` |
| 3 | Pending to charge | `totals.pending` | Number of bookings in "Charge Now" status |
| 4 | By month (horizontally scrolling cards) | `totals.monthly` | Grouped by the month of `fund_availability` (or `check_out_date`/`created_at` if not yet set), each card showing that month's expected amount + commission |

### Status tabs (counts shown next to each tab name)
All / Locked / Pending / In transit / Charged / Received / No payment — counted by `recon_status` computed from `getReconciliationStatus()` (rules below).

### Filtering & sorting
- **Sort by:** — none — / Booking date / Check-in date / Check-out date / Funds availability.
- **Sort direction:** toggle button "Oldest first" ↔ newest first (arrow icon).
- Server-side pagination: `limit = 10`, `page` parameter.

### List table (columns)
| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property / Guest | `villa.name`, `guest.first_name/family_name`, `villa.business_unit.name` | Row 1: villa name (bold); row 2: guest name; row 3: business unit name |
| 2 | Dates | `booking_date`, `check_in_date`, `check_out_date` | 3 sub-lines: Book / In / Out (format `dd Mon yy`) |
| 3 | Refund | computed from `api_message` (regex "cancel free of charge until N days before arrival") | Badge "Non" (red) if none, or "N Days" (green) |
| 4 | Payment | `payment_method` (Bank Transfer/Manual VC/Auto VC/Third party) + `bank_account` | Badge colored by method; derived from the latest `VillaOtaManagement` log with `from <= today` |
| 5 | Amount | `amount` (gross, converted) + `commission` | Sub-line shows "Com S$x" or "No Com" |
| 6 | Funds availability | `fund_availability` | Expected date funds are received, computed via `getReconciliationStatus` |
| 7 | Status | `recon_status` | Locked / Pending / In Transit / Charged / Received / To Verify / Charge Now / No payment — corresponding colored badge |
| 8 | Action | depends on status | See Functions section below |

### Reconciliation status calculation rules (`getReconciliationStatus`, private function)
- **Bank Transfer:** the payment send date (`payment_send_date`) is computed from the day of the week of `check_out_date` (Mon +3, Tue +2, Wed +1, Thu +7, Fri +6, Sat +5, Sun +4 days); the receive date (`payment_received_date`/`fund_availability`) = send date + 5 days. Status: `Received` if `is_received_payment = yes`; `Pending` if the send date has not yet arrived; `In Transit` if between send and receive dates; `To Verify` if overdue and not yet received.
- **Manual VC / Auto VC:** the charge-eligible date (`vc_charge_date`) = booking date + 1 (if no refund policy) or check-in date minus the refund-window days. Status: `Received` if already received; `Charged` if `is_charge_virtual_card = yes`; `Locked` if the charge date has not arrived; otherwise `Charged` (Auto VC automatically) or `Charge Now` (Manual VC requires manual action).
- **Third party:** fixed status `No payment`.

## Functions / Actions
Action buttons are shown per row based on conditions (JS `renderTable`, calling `AccountController::updatePaymentRecon`):

| Condition | Button | `action` sent | Server-side processing |
|---|---|---|---|
| `payment_method = 'Third party'` and `is_paid_commission = 'no'` | **Mark as seen** | `mark-seen` | Sets `Booking.is_paid_commission = 'yes'` |
| `payment_method = 'Manual VC'`, `is_charge_virtual_card = 'no'`, `recon_status != 'Locked'` | **Mark charged** | `charge` | Sets `Booking.is_charge_virtual_card = 'yes'` |
| `is_received_payment = 'no'` (and not covered by the two cases above) | **Mark received** | `receive` | Sets `Booking.is_received_payment = 'yes'`; if `account_id` + `amount` are available (derived from `payment_method`/log), automatically generates a new entry in `AccountStatement` (auto-incrementing Ref `<account.name>-00001`, `category_id = 3`, `payment_type = credit`, `description = 'booking reconcile'`, currency-converted via `Rate` if the account does not use SGD) |
| `is_received_payment = 'yes'` and `is_paid_commission = 'no'` | **Pay commission** | `pay-commission` | Sets `Booking.is_paid_commission = 'yes'` |
| Remaining cases (already Received & commission paid, or Locked/No payment not eligible) | — (dash) | — | No action |

Before each AJAX call, a confirmation popup is shown with the corresponding message ("Do you really want to mark this booking as received/charged...?").

- **Switching tabs (All/Locked/Pending/In transit/Charged/Received/No payment):** re-calls `getOtaData` with the `tab` parameter, without reloading the page.
- **Changing Sort by / sort direction:** re-calls `getOtaData` with `sort` + `direction`.
- **Changing pages (pagination):** re-calls `getOtaData` with `page`.

## Navigation
- Entered from: Sidebar > Finance & Admin > **Payouts > Channels** > OTA platform name (currently only "Booking.com", taken from `BookingPlatform` with `name = 'Booking.com'`) — `filterSidebar($user, 'acc-ota')` must permit this item to display.
- Navigates to: no sub-page/dedicated popup — all actions are handled via AJAX in place, without page navigation. The entry auto-generated by "Mark received" is only written to the `AccountStatement` table and does not open the corresponding ACC-007 (Account Ledger) screen.
