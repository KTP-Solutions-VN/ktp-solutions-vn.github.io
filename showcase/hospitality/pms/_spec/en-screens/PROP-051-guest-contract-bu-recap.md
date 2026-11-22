# PROP-051 — Contract Readiness

**Type:** Full page
**Route:** property/guest-contract-bu-recap
**Module:** PROP = Property Records

## Overview
Page summarizing the guest portal contract (Guest Contract) assignment status for all Properties in a Business Unit: ready for signature (Ready), no contract assigned (No Contract), missing required information (Missing Info). Supports quick filtering, search, pagination, contract preview, and Excel export. This content is also embedded as the "Portal Contract" tab in PROP-048 (Bulk Service Import).

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `bu` | Select (query string) | Yes | Changing value → reloads |
| 2 | Quick Filter | `filter` | Chip link (All/Ready/No Contract/Missing Info...) | No | |
| 3 | Search | `q` | Text (Property name/ID) | No | |
| 4 | Page | `page` | Page number (pagination, 25 rows/page) | No | |

### KPI Overview
| # | Metric | Field Code | Notes |
|---|---|---|---|
| 1 | Total Properties | `kpis.total` | |
| 2 | Ready for Signature | `kpis.ready` | |
| 3 | No Contract Assigned | `kpis.no_contract` | |
| 4 | Missing Required Information | `kpis.missing_info` | |

### Displayed Columns (recap table)
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `villa_id`/Property name | |
| 2 | Assigned Contract | `general_version_id` | Assigned contract template version |
| 3 | Languages | `contract_language` | |
| 4 | Missing Information | — | List of missing fields (if any) |
| 5 | Action | — | "Preview" button (if a contract already exists), "Assign"/"Open" button |

## Functions / Actions
- Changing Business Unit/Filter/Search → reloads the list per the filter conditions.
- "Refresh" button → reloads data with the current filter conditions.
- "Export Excel" button → exports an Excel file per the filter conditions (`?export=1`).
- "Preview" button (`gcb-preview-button` chip) → opens a modal/tab previewing the contract content (linked to PROP-052 — Guest Contract Assignment PDF).
- "Assign"/"Open" button → navigates to `property/villa/portal contract/:villa_id` (the Portal Contract tab of PROP-050) to assign/view the contract, opened in a new tab.
- Previous/Next pagination.

## Navigation
- Opened from: owner reports menu, or from PROP-048 (Bulk Service Import — Contract Readiness tab, "Export Excel" button).
- Navigates to: PROP-050 (Portal Contract tab, opened in a new tab), PROP-052 (Print Guest Contracts — preview).
- Child popup: Contract preview modal (no dedicated code, shares content with PROP-052).
