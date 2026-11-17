# PROP-029 — Property Reports

**Type:** Full page
**Route:** property/property-reports/:tab/:villa_id
**Module:** PROP = Properties

## Overview
A tabbed container page for Property-related reports. Currently only one tab is active — "Contracts" (contract report) — filterable by Business Unit. The tab's detailed content is rendered via the `property/contract_report` element.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Tab (hidden) | `tab` | Hidden | Yes | Default value `contract` |
| 2 | Business Unit | `business_unit`/`id` | Select2 | Yes (class `required`) | Changing the value → updates the `?bu=...` query string |
| 3 | "Contracts" Tab | — | Tab link | — | Shown only when the user is not an `external_user` |

The contract report table content resides in the `element/property/contract_report.ctp` element (outside the scope of the assigned `.ctp` file), with data sourced from `getPropertyContractReport($conditions)`.

## Functions / Actions
- Changing Business Unit → updates the URL with the `bu` query parameter and reloads the page.
- Switching tabs (currently only the "Contracts" tab is available).

## Navigation
- Opened from: the Reports menu (outside the scope of the current spec).
- Navigates to: no navigation to other pages (only changes Business Unit in place).
- Child popup: none.
