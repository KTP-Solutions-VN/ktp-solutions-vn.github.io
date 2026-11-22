# PROP-002 — Channel Rate Multiplier
**Type:** Full page
**Route:** property/beds24-coefficient
**Module:** PROP = Property Records

## Overview
Screen for looking up the pricing coefficient applied to each property when syncing with an OTA channel via Beds24, filterable by Business Unit and Channel. Displays two tables: properties that already have a coefficient, and properties connected to that channel but without one yet.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit (filter) | `business_unit` | Select2 (list of BUs based on permissions, includes "All") | Yes | Submits the form via GET; sets the `property_business_unit_id` cookie |
| 2 | Channel (filter) | `chanel_id` | Select2 (list of Channels) | Yes | Defaults to the first channel |
| 3 | Property (Table 1 column) | `villa.name` | Text | — | |
| 4 | Coefficient (Table 1 column) | `coefficient` (decoded from JSON field `data`) | Number | — | |
| 5 | Last Update By (Table 1 column) | `updated_by` | Text (user name) | — | |
| 6 | On (Table 1 column) | `updated_on` | Date (`d M y`) | — | |
| 7 | Property (Table 2 – "properties without coefficient") | `name` | Text | — | Villas connected to a channel matching `chanel_id` but without a `VillaCoefficient` record of type=coefficient |

## Functions / Actions
- Changing Business Unit or Channel → automatically submits `#filter_form` (GET), reloading the page with the new query.
- Table 1 (`#zero_config`): static DataTable, no sorting.
- Table 2 (`#zero_config1`): DataTable, remembers page length via the `datatable-length` cookie.
- No direct add/edit/delete actions on this page (lookup only); setting the coefficient is performed elsewhere (the `saveCoefficient` action, outside the scope of PROP-001..016).

## Navigation
- Opened from: Property Records menu, Listing Quality / channel sync section.
- Navigates to: no navigation links within the page content (the breadcrumb links back to `property/quality`, outside this scope).
- Child popup: none.
