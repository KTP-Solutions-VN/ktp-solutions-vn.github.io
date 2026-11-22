# PROP-035 — Property Profile

**Type:** Full page
**Route:** property/view-details/:villa_id (default CakePHP DashedRoute: `/property/view-details/:villa_id`)
**Module:** PROP = Property Records

## Overview
A read-only detail page for a property (villa), consolidating information from several related tables (Villa, VillaLocation, VillaImage, VillaDetail, VillaPool, VillaOtaManagement, VillaService, etc.) into blocks: Images, Location (with a Google Maps embed), Assigned Concierge, Internet, Pool Cleaning, Property Type, and the list of OTA/distribution channels. If `villa_id` is not found, the user is redirected to the previous page with an error flash message.

## Detailed Description
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | — | Text | — | "Property ID Card: {name} - {short_name}" |
| 2 | Front Image | — | Image | — | From `VillaImage` (`image_type=Front`), defaults to `/img/no-image.gif` if absent |
| 3 | Gate Image | — | Image | — | From `VillaImage` (`image_type=Back`) |
| 4 | Country | — | Text | — | From `VillaLocation.country_id` → `Country` |
| 5 | Region | — | Text | — | From `VillaLocation.region_id` → `Region` |
| 6 | District | — | Text | — | From `VillaLocation.district_id` → `District` |
| 7 | Area | — | Text | — | From `VillaLocation.area_id` → `Area` |
| 8 | Residence | — | Text | — | From `VillaLocation.residence_id`; defaults to "Independent" |
| 9 | Address | — | Text | — | From `VillaLocation.address` |
| 10 | Location Type | — | Text | — | From `VillaLocation.villa_location_type_id` → `VillaLocationType` |
| 11 | Google Map URL | — | Link | — | Opens in a new tab |
| 12 | Map | `#mapCanvas` | Google Maps embed | — | Marker is draggable (`draggable: true`); however, since this is a view-only page, the coordinate-update JS has no saving effect (no form submit) |
| 13 | Assigned Concierge | — | Text | — | From `Concierge` (usage_name or first_name + family_name), condition `status=Active` |
| 14 | Key Set Image | — | Image | — | Image from service settings (Concierge service, `used_by=Guest/Concierge`) |
| 15 | Internet Login | — | Text | — | From `VillaService` (service_name=Internet), unserialized from `service_settings` |
| 16 | Internet Password | — | Text | — | Same as above |
| 17 | Pool company | — | Text | — | From `VillaService` (Pool service), present only if `provider_type=pool company`, name looked up via `ServiceProvider` |
| 18 | Frequency (pool cleaning cycle) | — | Text | — | From `service_settings['cleaning_period']` |
| 19 | Cleaning days | — | Text | — | List of cleaning days, comma-joined |
| 20 | Number of bedrooms | — | Text | — | From `VillaDetail.number_of_beds` |
| 21 | Number of bathrooms | — | Text | — | From `VillaDetail.number_of_bathrooms` |
| 22 | Number of guests | — | Text | — | From `VillaDetail.number_of_guests` |
| 23 | Luxury Level | — | Text | — | From `VillaDetail.luxury_level`, label looked up via `CommonController::_getLuxurylevel()` |
| 24 | Pool (has a pool) | — | Text | — | Yes/No, from `VillaDetail.is_pool` |
| 25 | Pool Length/Width/Depth | — | Text | — | From `VillaPool`, in meters |
| 26 | Pool System | — | Text | — | From `VillaPool.pool_system` |
| 27 | Listing (OTA list) | — | Repeating table: channel name + link (read-only, with copy button) | — | From `VillaOtaManagement.links` (unserialized), channel name looked up via `Chanel`; the block is shown only when data exists |

Note: the fields `villa_usage`, `villa_activities`, `villa_transport`, `villa_accessible`, `owner`, `price_category`, `business_situation_array`, `business_unit_array`, `reference_currency`, `villa_contract_services` are passed to the view by the controller but are NOT rendered in `view_details.ctp` (the current view only displays the blocks listed above).

## Functions / Actions
- Copy icon (`.copy_text`) next to each OTA link → copies the link to the clipboard (plain JS).
- Google Maps display of the villa location (view-only; the marker is draggable but there is no Save button to persist the change).
- No Edit/Save button on this page (view details only).

## Navigation
- Opened from: PROP-033 (Property Register) — "View Details" icon on each row.
- Navigates to: no active navigation to other pages within the page content (there is a hidden JS-driven breadcrumb link back to PROP-033, not displayed as it is commented out).
- Child popup: none.
