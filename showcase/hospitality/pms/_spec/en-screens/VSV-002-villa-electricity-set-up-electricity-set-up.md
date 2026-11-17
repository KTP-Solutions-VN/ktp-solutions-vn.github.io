# VSV-002 — Villa Electricity Set-up (Electricity Set-up)

**Type:** Full page

**Route:** `VillaServicesController::propertySetup($tab = null)` — defaults to `/villa-services/property-setup/<tab>`; the tab is also read from the query string (`?tab=pricing|management&business_unit_id=...&villa_id=...`)

**Module:** Villa Services — Electricity

## Overview
A screen for configuring electricity settings per villa: whether electricity is managed or not, pricing rules (per kWh / free quota / fixed daily price), pricing configuration by OTA channel, and villa information (type, area, owner). There are 2 main tabs: **Management** (enable/disable electricity management for a villa) and **Pricing** (set up electricity pricing by villa/booking channel).

## Detailed Description

Common filters: Business Unit (`business_unit_id`, select, including an "All" option), Property/Villa (`villa_id`, select).

**Management tab** — villa list table:

| # | Column Name | Field Code | Notes |
|---|---|---|---|
| 1 | Property | `Villa.name` | |
| 2 | Status | `Villa.status` | |
| 3 | Villa Type | `villa_type_id` → name (`VillaType`) | |
| 4 | Owner | `Owner.family_name` | |
| 5 | Area | `VillaLocation.area_id` → name (`Area`) | |
| 6 | Action | — | Toggle electricity management on/off for the villa (calls back the same action with `?request=1&villa_id=`, setting `service_settings.electricity_management = no`) |

**Pricing tab** — table by villa × booking channel (`BookingPlatform`), each cell showing the pricing setup type:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Payment Setting Type | `payment_setting_type` | Select: Collect-Fixed / Collect-Quota / Collect-kWh / Platform-Separate / Platform-Rental / Combined-Separate / Combined-Rental | Yes | Determines the input fields shown below |
| 2 | Amount (Collect-Fixed/Platform-*) | `data[...][amount]` | Number | Yes (depending on type) | Denominated in the BU's currency |
| 3 | Free Quota kWh (Collect-Quota) | `data[...][free_quota]` | Number | Yes (depending on type) | |
| 4 | Cost above kWh quota | `data[...][cost_above_kwh_quota]` | Number | Yes (depending on type) | |
| 5 | Cost per kWh (Collect-kWh) | `data[...][cost_per_kwh]` | Number | Yes (depending on type) | |
| 6 | Included quota amount/kWh (Combined-*) | `data[...][included_quota_amount]`, `included_quota_kwh]` | Number | Yes (depending on type) | |
| 7 | "Pricing set" filter | `pricing_set` | Select: All/Full/Partial/No (non-live version) or Yes/No (live version) | — | Filters villas that have/haven't fully configured pricing for all channels |
| 8 | "Price type" filter | `price_type[]` | Multi-select checkbox (`free_quota`, `price`, `fixed_daily`) | — | |

## Functions / Actions
- **Toggle Electricity management per villa** (Management tab): saved to `VillaService.service_settings` (PHP serialized).
- **Save Pricing:** submits pricing tables for multiple villas/channels at once (`request_data['request_data'][villa_id][platform_id]`); writes/locks the current `VillaElectricityRate` record, automatically closing (`end_date`) the previous pricing record before creating a new one (maintaining pricing history over time).
- Filter by Business Unit / Property / Pricing set / Price type (GET submit).

## Navigation
- Entered from: VSV-001 ("Electricity Set-up" tile).
- Navigates to: no child screens; after saving, the current page reloads (`$this->redirect($this->referer())`).
