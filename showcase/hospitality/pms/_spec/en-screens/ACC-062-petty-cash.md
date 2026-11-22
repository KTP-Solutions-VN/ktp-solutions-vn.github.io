# ACC-062 — Cash Advances

**Type:** Full page

**Route:** `AccountController::pettyCash($tab, $sub_tab)` — default `/account/petty-cash/<tab>/<sub_tab>`

**Module:** Finance & Admin

## Overview
Manages the entire lifecycle of "Claim Expense" (employee expense reimbursement requests): verifying/rejecting new claims, aggregating approved claims awaiting payment, and looking up the history of paid/rejected claims — viewable either from an "All" perspective (Latest Claim) or filtered per employee (By User Claim).

## Detailed Description

Common filter: **Business Unit** (`business_unit`, Select2, 0 = All per user permissions); the **By User Claim** tab additionally has **User** (`user_id`, list of internal employees within the selected BU who have created a claim).

2 main tabs:
- **Latest Claim** (`tab=latest-claim`, default): aggregates claims from ALL employees under the viewer's management (excluding the viewer themselves).
- **By User Claim** (`tab=by-user-claim`): aggregates claims from a SINGLE employee selected in the User filter.

Each main tab has 4 sub-tabs (`sub_tab`):

| Sub-tab | Code | Content |
|---|---|---|
| New Claims | `new-claim` | Claims with `status=pending`, awaiting verification/rejection |
| To Pay | `to-pay` | Claims with `status=verified`, grouped by Company, awaiting payment approval (Approve) |
| Paid | `paid` | Claims with `status=approved, payment_status=complete`, already paid |
| Rejected | `rejected` | Claims that have been rejected (`status=rejected`) |

Main data columns in the claims table (depending on sub-tab): User, Property, Company, Supplier, Amount, Date, Status, Details (description/attached receipt image), Payee, Actions (batch-selection checkbox). The Paid tab has additional columns: Claims (count), Payee.

## Functions / Actions
- **New Claims — Verify:** enter a Comment, changes `status` to `verified` (`verify_claim_status=not-ok`), logs an access record.
- **New Claims — Reject:** enter a Comment, changes `status` to `rejected`.
- **To Pay — select multiple (checkbox) then Approve:** for the checked claims, the system groups them by creator, generates a random `payment_batch_id` for each group, changes `status=approved`, and sets `approved_by`/`approved_date`.
- **Download PDF / Download Excel (on a selected group of claims):** calls `downloadClaimPdf`/`downloadClaimExcel` to export a payment voucher.
- Checkbox selections are automatically saved via the `selected_claim_expenses` cookie to preserve state when navigating between pages.
- Switching Tab/Sub-tab or changing Business Unit/User updates the URL and corresponding query string (`/account/petty-cash/<tab>/<sub_tab>?business_unit=...&user_id=...`).

## Navigation
- Entered from: Sidebar > "Cash Advances" item under the Finance & Admin / Spending group.
- Navigates to: ACC-063 (Expense Settlements) is the next step after a claim is approved (`approved`, awaiting actual payment); there is no direct link between the two pages, they are related only through the `ClaimExpense` data.
