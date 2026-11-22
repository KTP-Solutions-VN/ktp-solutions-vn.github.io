# PROP-050 — Property Editor

**Type:** Full page
**Route:** property/villa/:tab/:villa_id (dashed by default; `$villa_id` is empty when adding new)
**Module:** PROP = Property Records

## Overview
The central screen for creating/editing all information for a Property (Villa), organized into 11 major tabs: Identification, Business Situation, Location, Property Type, OTA Management, Service and Utilities (re-embeds the content of PROP-049), Document, Language Management, Control (Check-out control points/reminders), Finance, Portal Contract (guest portal contract). Each tab has its own save form, with data aggregated from multiple tables related to the Villa.

## Detailed Description

### Identification Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property Name | `name` | Text | Yes | Duplicate name check via AJAX `checkVillaName` |
| 2 | Short Name | `short_name` | Text | No | |
| 3 | Business Unit | `business_unit_id` | Select2 | Yes | |
| 4 | Company Subsidiary | `company_subsidiary_name` | Select2 | No | |
| 5 | Owner | `owner_id` | Select2 | Yes | |
| 6 | Owner Staff | `owner_staff_id` | Select2 | No | |
| 7 | Manager | `manager_id` | Select2 (multi) | No | |
| 8 | Agency | `agency_id` | Select2 | No | |
| 9 | Property Type | `villa_type_id` | Select2 | Yes | |
| 10 | Price Category | `price_category_id` | Select2 | No | |
| 11 | Price 1 / Price 2 | `price_1`/`price_2` | Number | No | |
| 12 | Reference Currency | `reference_currency` | Select2 | No | |
| 13 | Room ID 1-4 | `room_id_1..4` | Text | No | Linked to PROP-017 (Unmapped Room Codes) |
| 14 | Beds24 Villa ID (primary, secondary, 2nd) | `beds_24_villa_id`/`additional_beds_24_id`/`secondary_beds_24_villa_id_1` | Text | No | Duplicate check via AJAX `checkVillaBeds24Id` |
| 15 | Hostex Villa ID | `hostex_villa_id` | Text | No | |
| 16 | Channel Manager | `channel_manager` | Select | No | |
| 17 | OTA Listing Data | `ota_listing_data` | Textarea | No | |
| 18 | Villa Front/Back Image | `villa_front`/`villa_back` | Image upload | No | |

### Business Situation Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Status | `status` | Select | Yes | Property status (Open/Closed/...) |
| 2 | Ownership Type | `ownership_type` | Select | Yes | Management/Partnership/Sub-lease/Ownership — changing the value displays the corresponding sub-form |
| 3 | Document Title/Type | `document_title`/`document` | Text/Upload | No | Attached contract document |
| 4a | (Management) Signing/Renewal Date | `signing_date`/`renewal_date` | Datepicker | Yes (when Management) | In the `situation_management` element |
| 4b | (Management) Payment Frequency/After/Date/Fees | `payment_frequency`/`payment_after`/`payment_date`/`payment_fees[]`/`after`/`other_data[]` | Select/Number/Checkbox | No | Checkbox group for services handled by Agency/Owner |
| 5a | (Partnership) Signing/Renewal Date, Payment Frequency/Fees | similar to Management | | No | In the `situation_partnership` element |
| 5b | (Ownership) Payment Fees | `payment_fees[]`/`other_data[]` | Checkbox | No | In the `situation_ownership` element |
| 5c | (Sub-lease) First Day Rental/Next Renewal/Rental Amount/Deposit Amount/Payment Frequency/Fees | `first_day_rental`/`next_renewal`/`rental_amount`/`deposit_amount`/`payment_frequency`/`payment_fees[]` | Datepicker/Number/Select/Checkbox | No | In the `situation_sub_lease` element |

### Location Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select2 | Yes | |
| 2 | Region | `region_id` | Select2 | Yes | |
| 3 | District | `district_id` | Select2 | No | |
| 4 | Area | `area_id` | Select2 | Yes | |
| 5 | Residence | `residence_id` | Select2 | No | Linked to PROP-046/047 |
| 6 | Unit | `unit_id` | Select2 | No | |
| 7 | Villa Location Type | `villa_location_type_id` | Select | No | |
| 8 | Address | `address` | Textarea | Yes | |
| 9 | Latitude/Longitude | `lat`/`lng` | Text/Number | No | |
| 10 | Google Map URL | `google_map_url` | Text | No | |

### Property Type Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Number of Guests | `number_of_guests` | Number | Yes | |
| 2 | Number of Beds | `number_of_beds` | Number | Yes | |
| 3 | Number of Bathrooms | `number_of_bathrooms` | Number | Yes | |
| 4 | Luxury Level | `luxury_level` | Select | No | |
| 5 | Villa Accessible | `villa_accessible` | Checkbox/Select | No | |
| 6 | Is Pool | `is_pool` | Checkbox | No | Toggles the display of the Pool form (Length/Width/Depth) |
| 7 | Pool Length/Width/Depth | `pool_length`/`pool_width`/`pool_depth` | Number | No (required if Is Pool = yes) | |
| 8 | Villa Pool ID | `villa_pool_id` | Select | No | |

### OTA Management Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Account Email | `account_email` | Select | Yes | List of configured OTA accounts |
| 2 | Listing ID | `listing_id` | Text (read-only, may be auto-generated) | Yes | |
| 3 | Link | `link` | Text | Yes | Listing link on the OTA channel |
| 4 | OTA ID | `ota_id` | Text | No | |
| 5 | GST | `vat` | Text | No | |

The list of assigned OTA links is displayed as a table, with Add/Edit/Delete buttons (`addOtaModal` modal).

### Service and Utilities Tab
Re-embeds the full set of 10 sub-tabs Concierge/Common Area/Electricity/Cleaning/Water/Internet/Television/Pool/Garden/Pest Control — see full details in **PROP-049 (Utilities Setup)**, using the shared `property/*` element.

### Document Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Title | `title` | Text | Yes | |
| 2 | Type | `type` | Select (Contract/Land Title/Property Title/Other) | Yes | |
| 3 | File | `uses` | File upload | Yes (when adding new) | |
| 4 | Edit Id (hidden) | `edit_id` | Hidden | — | |

The list of uploaded documents is displayed as a table, allowing view/download/delete.

### Language Management Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Supported Languages | `language[]` | Checkbox (list of system languages) | No | Applied to the Property's multilingual listing |

### Control Tab (Check-out Control Points/Reminders)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Copy control points from another Property | — | Select2 Property + Copy button | No | |
| 2 | Check-Out Control Point — Image | `image[n]` | Image upload | Yes (first row) | Max 1MB, 1:1 ratio, multiple rows can be added |
| 3 | Check-Out Control Point — Legend | `text[n]` | Text | Yes (first row) | Control point description |
| 4 | Check-Out Reminders | `reminder_id[]` | Checkbox (list of available Reminders) | No | |
| 5 | Custom Reminder | `reminder[n]` | Text (multiple rows, "+" button) | No | |

### Finance Tab
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Estimated Value | `estimated_value` | Number | No | |
| 2 | Expected Return | `expected_return` | Number/% | No | |
| 3 | For Sale | `for_sale` | Checkbox/Select | No | |
| 4 | Selling Price | `selling_price` | Number | No (required if For Sale) | |
| 5 | Starting Rental Date | `starting_rental_date` | Datepicker | No | |

### Portal Contract Tab (Guest Hub Contract)
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Guest Contract General Version | `guest_contract_general_version_id` | Select2 | Yes | Selects the contract template version applied to the Property |
| 2 | Contract Language | `contract_language` | Select2 (multi) | No | |
| 3 | Contract Electricity Mode | `contract_electricity_mode` | Select | No | |

Saved via `_saveGuestContractAssignment`/`_savePortalContract`; related to PROP-051/052 (Contract Readiness / Print Guest Contracts).

## Functions / Actions
- Switching tabs (URL param `$tab`, retains `$villa_id`).
- Each tab has its own "Save" button — submits that tab's form, saves to the corresponding data table, shows a flash message, usually redirects back to the same tab.
- Duplicate check for Property name / Beds24 ID via AJAX (`checkVillaName`, `checkVillaBeds24Id`) before saving the Identification tab.
- Add/Edit/Delete OTA link (OTA Management tab, AJAX modal).
- Add/Delete Control Point rows, custom Reminders (Control tab, JS dynamic row).
- Upload/Delete document (Document tab).
- Delete Property (Delete button, calls the `delete` action).

## Navigation
- Opened from: PROP-033 (Property Register — add new/edit), PROP-032 (Portfolio Health), PROP-042 (Instant Book Settings — Edit icon opens the OTA Management tab).
- Navigates to: PROP-049 (Service and Utilities — same embedded content), PROP-017 (Unmapped Room Codes, linked Room ID data), PROP-046/047 (Residence, linked Location data), PROP-051/052 (Contract Readiness / Print Guest Contracts, linked Portal Contract tab data).
- Child popup: Add/Edit OTA Link modal (no dedicated code, a supporting operation within the OTA Management tab).
