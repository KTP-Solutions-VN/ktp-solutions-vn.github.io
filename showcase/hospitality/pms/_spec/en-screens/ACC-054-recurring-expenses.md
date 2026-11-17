# ACC-054 — Recurring Expenses (Recurring)

**Type:** Full page

**Route:** `AccountController::recurring()` — default `/account/recurring`

**Module:** Accounting & HR

## Overview
Allows the user to select a Business Unit, a service type (Villa Service, e.g. Pool/Garden), and a provider, then displays the list of Properties currently using that service with the selected provider, so recurring expenses for the current month can be marked as "reconciled" for each Property.

## Detailed Description

Filter (GET form):

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit` | Select2 (0 = All + list of BUs per user permissions) | No | Changing the value triggers AJAX `getProvidersList` to reload the Provider list |
| 2 | Service Type | `service_type` | Select2 (list of Villa Services, e.g. Pool/Garden) | No | Defaults to the first service alphabetically; changing the value also re-triggers `getProvidersList` |
| 3 | Providers | `providers` | Select2 (list of `ServiceProvider` matching the selected Business Unit + Service Type) | Yes (`required`) | Loaded via AJAX based on BU/Service Type |
| — | Search | Button | Submits the GET form, reloads the page with the query string | | |

Property list (`#zero_config` table, shown after Search):

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property Name | `villa_name` | |
| 2 | Quality | `quality` | Fixed value "1" |
| 3 | Amount | `amount` | Taken from `service_settings.price` of `VillaService` |
| 4 | Action | — | "Reconcile" link if the current month has not been reconciled (`VillaExpense.month != current month`), otherwise shows "Reconciled" |

## Functions / Actions
- **Search:** submits GET, re-filters the Property list by BU + Service Type + Provider, only returning Properties where `VillaService.service_settings.provider` matches the selected Provider (and excludes based on `is_pool`/`is_garden`/`managed_by` conditions depending on service type).
- **Reconcile (on each row):** calls AJAX `saveRecouncile` (POST `villa_id`, `service_type`, `amount`, `provider_id`) to save/update a `VillaExpense` record (`expense_type = recurring`, `month` = current month); on success, the row's label changes to "Reconciled" in place, without reloading the page.

## Navigation
- Entered from: Sidebar > "Recurring" item under the Account/Expenses group.
- Navigates to: no navigation to other pages — all actions are handled via in-place AJAX.
