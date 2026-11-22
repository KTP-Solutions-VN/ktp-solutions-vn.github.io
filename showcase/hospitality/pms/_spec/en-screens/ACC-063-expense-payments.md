# ACC-063 — Expense Settlements

**Type:** Full page

**Route:** `AccountController::expensePayment($tab)` — default `/account/expense-payment/<tab>`

**Module:** Finance & Admin

## Overview
The actual payment step for Claim Expenses (from other employees, not the viewer) that have been approved (`status=approved`) in ACC-062 — select the disbursement account, confirm payment to create the corresponding statement entry.

## Detailed Description

2 tabs:

| Tab | Code | Content |
|---|---|---|
| To Pay | `to-pay` (default) | Claims with `status=approved, payment_status=pending`, grouped by Company + `payment_batch_id` |
| Paid | `paid` | Claims with `status=approved, payment_status=complete`, already paid, with the statement reference number |

Main data columns (per claim group): Company, Payee, Approved By/Date, Total Claims, Total Claim Amount, Actions. The Paid tab additionally has: Paid By, Payment Date, Account, Payment Proof.

**Make Payment** popup (opened from the payment button on a claim group in the To Pay tab):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account | `account_id` | Select2 (list of `Account`) | Yes (`required`) | The account used to record the disbursement entry |

## Functions / Actions
- **Make Payment (To Pay tab):** select `account_id`, submit POST to the `expensePayment` action itself; the server: auto-generates a new statement `ref` for the selected account, converts `claim_amount` from SGD into the Account's currency, creates a Debit entry in `AccountStatement` (category "Staff Expenses"), then updates all selected claims (`payment_status=complete`, `paid_by`, `payment_date`, `account_id`, `account_statement_reference`), logs an access record, shows a flash message, `redirect($this->referer())`.
- **Download PDF / Download Excel:** exports a payment voucher for the selected claim group (shares `downloadClaimPdf`/`downloadClaimExcel` with ACC-062).
- **Upload Payment Proof (Paid tab):** AJAX `uploadPaymentProof` attaches payment documentation to a claim group.
- Switching tabs updates the URL `/account/expense-payment/<tab>`.

## Navigation
- Entered from: Sidebar > "Expense Settlements" item under the Finance & Admin / Spending group; data continues from ACC-062 (Cash Advances) after a claim is Approved.
- Navigates to: creates a new entry in ACC-007 (Account Ledger) for the Account selected during payment (no direct link, related only through `AccountStatement` data).
