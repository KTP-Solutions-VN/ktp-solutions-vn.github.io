# PROP-048 — Bulk Service Import

**Type:** Full page
**Route:** property/services/:tab (dashed by default, also supports query `?tab=`, `?electricity_tab=`)
**Module:** PROP = Property Records

## Overview
Page for bulk-managing Internet, Pool, and Electricity (Provider/Guest) service configurations for all Properties in a Business Unit via Excel (.xlsx) file import. Also includes a "Portal Contract Recap" tab showing a summary table of portal contract assignment status for each Property (similar to the function in PROP-051 Guest Contract BU Recap).

## Detailed Description

### Common Filter
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit`/`id` | Select2 | Yes (class `required`) | Changing value → reloads, saved to cookie |

### "Internet" / "Pool" / "Electricity" Tab (Provider, Guest)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Excel File | `internet_data`/`pool_data`/... | File (.xlsx) | Yes (class `required`) | Imported using standard columns: Internet = `id, code, property, provider, login, password, charge`; Pool = `id, code, property, pool, company, mon..sun` |
| 2 | Tab (hidden) | `tab` | Hidden | — | Retains the current tab on submit |

After upload, the system displays 3 result tables: **Updated Properties** (successfully updated), **Unavailable Properties** (data mismatch), depending on the selected tab (Internet/Pool). Displayed columns: Property, Provider/Pool, Login/Company, Password/Frequency, Charge/Days.

The "Electricity" tab has 2 sub-tabs: **Provider** (electricity provider information) and **Guest** (guest-facing display configuration); each sub-tab also has a similar data table with Property/Provider/Login/Password/Charge.

### "Portal Contract" Tab (Recap)
| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `property` | |
| 2 | Assigned Contract | `assigned_contract` | |
| 3 | Languages | `languages` | |
| 4 | Missing Information | `missing_information` | |
| 5 | Action | — | |

Includes quick filter chips, a search box by Property name/ID, and 4 KPI metrics: Total Properties, Ready for Signature, No Contract Assigned, Missing Required Information.

## Functions / Actions
- Changing Business Unit → reloads all tab data for the new BU.
- Switching between Internet/Pool/Electricity/Portal Contract tabs (URL param `tab`, `electricity_tab`).
- "Upload" button (Internet/Pool tabs) → submits the Excel file, reads it via `PHPExcel_IOFactory`, validates the column format, bulk-updates service data for matching Properties.
- Portal Contract tab: "Refresh" button (reload), "Export Excel" button (navigates to `guestContractBuRecap?export=1`), quick filter chips, search box.

## Navigation
- Opened from: property services menu (outside the scope of the current code).
- Navigates to: PROP-051 (Contract Readiness) when clicking "Export Excel" on the Portal Contract tab.
- Child popup: None (upload results are displayed as a table directly on the page, not a modal).
