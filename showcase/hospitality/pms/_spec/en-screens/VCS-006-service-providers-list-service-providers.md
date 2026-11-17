# VCS-006 — Service Providers List (Service Providers)

**Type:** Full page
**Route:** villa-common-setting/service-providers/:tab (default CakePHP DashedRoute: `/villa-common-setting/service-providers`, `tab` parameter defaults to `service-providers`)
**Module:** VCS = Villa Common Settings

## Overview
Screen for managing the "Service Provider" catalog, associated with Villa Services and Business Units. The page has 2 tabs: "Service Providers" (list of providers) and "Services" (list of villa service types, visible only to Superadmins). Add/Edit/Delete are performed via popup.

## Detailed Description
### "Service Providers" Tab (default)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Filter Business Unit | `business_unit` | Select2 | No | Filters the list by the selected BU; changing the value reloads the table via AJAX and stores the business unit in a cookie |
| Table column | No | — | Number | — | Sequence number |
| Table column | Service (Service Type) | — | Text | — | Concatenated names of the `provider_service` records the provider is associated with |
| Table column | Name (Provider name) | `name` | Text | — | |
| Table column | Business Units | — | Text | — | List of assigned BU names |
| Table column | Created On | `created_at` | Datetime | — | |
| Table column | By | — | Text | — | Creator (`created_user.usage_name`) |
| Table column | Actions | — | Edit/Delete buttons | — | Opens the VCS-006-P1 popup |

### "Services" Tab (visible only when the user is a Superadmin)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | "+ Add new" button | — | Button | — | Opens the VCS-006-P2 popup |
| Table column | No | — | Number | — | Sequence number |
| Table column | Name (Service Type name) | `name` | Text | — | From the `ProviderService` table |
| Table column | Created On | `created_at` | Datetime | — | |

Both tables use client-side DataTable (`#zero_config1` for Service Providers, `#zero_config` for Services); no dedicated search field.

## Functions / Actions
- Switch between "Service Providers" / "Services" tabs (Bootstrap nav-tabs, state maintained via the `tab` URL parameter).
- Select "Business Unit" (Service Providers tab) → filters the list by BU, saving it in a cookie via `_setBusinessUnitCookie`.
- "+ Add new" button (Service Providers tab, `.add_provider`) → opens the VCS-006-P1 popup in Add mode.
- Edit icon (`.edit_provider`) → opens the VCS-006-P1 popup in Edit mode, populating all data (name, service types, business units, contact info, custom labels, etc.).
- Delete icon (`.delete_provider`) → opens the VCS-006-P1 popup in Delete Confirmation mode (input section hidden).
- "+ Add new" button (Services tab, `.add_service`) → opens the VCS-006-P2 popup.
- Submitting the provider popup form sends a `POST` to the `serviceProviders` action with `action=add|edit|delete`; the controller saves/deletes records in the `ServiceProvider` table (synchronizing multiple rows per selected `villa_services_id` — comparing old/new ids to add/edit/delete), writes an Activity Log entry, shows a Flash message, and redirects via `referer()`.
- Submitting the service popup form sends a `POST` with `action=add_service` (a value distinct from `add/edit/delete`) → the controller saves a record to the `ProviderService` table.

## Navigation
- Opened from: "Users" menu > "Service Providers".
- Navigates to: no navigation to another page (CRUD operations performed in place via popup + reload).
- Child popups: VCS-006-P1 (Add/Edit/Delete Service Provider), VCS-006-P2 (Add Villa Service Type).
