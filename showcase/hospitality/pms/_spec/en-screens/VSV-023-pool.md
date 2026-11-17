# VSV-023 — Pool

**Type:** Full page

**Route:** `VillaServicesController::pool()` — defaults to `/villa-services/pool`; quotation upload/approval via pretty routes `/villa-services/pool/upload-quotation`, `/villa-services/pool/update-quotation-status/:id/:status`, `/villa-services/pool/delete-quotation/:id` (all AJAX, no dedicated view)

**Module:** Villa Services — Pool

## Overview
A list of pool cleaning/inspection visits, allowing users to track status (cleaned/has issue), verify whether the operator's GPS location matches the villa, view report details, download PDF records, and process the repair quotation workflow when a pool issue requires remediation (external vendor submits a quotation, internal staff approve/reject).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Units | `business_unit_id` | Select (select2) | No | |
| 2 | Pool Company | `pools_company_id` | Select (select2) | No | Only shown for Internal users; filters by pool service vendor |

### List
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Date | `created_at` | |
| 2 | Villa | `villa.name` | |
| 3 | Company | `company_name` | Only shown for Internal users |
| 4 | Staff | `selected_pool_workers` | |
| 5 | Start / End | `start_time`/`end_time` | |
| 6 | GPS | `gps` (OK/NOK) | Matches the start location against the villa's coordinates (deviation > 200m → NOK) |
| 7 | Status | `status`, `quotation_status` | Pending/Cleaned/Problem, or quotation status: Quotation Sent/Approved/Rejected |
| 8 | Action | — | View, Download PDF record, Delete, Unlock/Lock for owner, Upload/Download/Approve/Reject quotation (when an issue requires repair) |

## Functions / Actions
- **View GPS** (OK/NOK badge): view the distance between the start/end location and the villa.
- **Status button**: opens the "Cleaning record" modal showing visit details.
- **View** (eye icon): view full record details.
- **Download** (when a `document` exists): downloads the PDF record.
- **Delete**: deletes the pool cleaning record.
- **Unlock/Lock for owner** (Internal): enables/disables owner viewing access to the report.
- **Upload Quotation** (External, when the issue needs "further_action" and no quotation has been submitted yet or it was rejected): uploads a repair quotation — AJAX `uploadQuotation`, pretty route `/villa-services/pool/upload-quotation`.
- **Delete Quotation** (External, when the quotation has been submitted/rejected): deletes the quotation — pretty route `/villa-services/pool/delete-quotation/:id`.
- **Approve/Reject quotation** (Internal, when a quotation has been submitted): pretty route `/villa-services/pool/update-quotation-status/:id/:status` (`repair_approved`/`quotation_rejected`).

## Navigation
- Entered from: Main menu (Pool item).
- Navigates to: no dedicated-route child page (actions performed via in-place modals/AJAX).
