# OWP-006 — Property Snapshot

**Type:** Full page

**Route:** `ExternalUserController::viewDetails($villa_id)` — no dedicated friendly route, accessed from OWP-005 (default `/external-user/view-details/{villa_id}`)

**Module:** Owner Hub

## Overview

An "ID Card" page displaying the full details of a property — view only, no edit form. Includes the following information blocks: Identification, OTA, Business Contract Status, Location, and Property Type.

## Detailed Description

Field table (read-only), grouped by information block:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| **Identification** ||||| |
| 1 | Property name | name | Text (display) | — | |
| 2 | Short name | short_name | Text (display) | — | |
| 3 | Owner | owner | Text (display) | — | |
| 4 | Service type | type_of_services | Text (display) | — | |
| 5 | Price category | price_category | Text (display) | — | |
| 6 | Status | status | Text/badge | — | Open/Paused/Closed |
| 7 | Reference currency | reference_currency | Text (display) | — | |
| 8 | Front image | front_image | Image | — | |
| 9 | Gate image | gate_image | Image | — | |
| **OTA** ||||| |
| 10 | OTA link list | ota links | List of links | — | OTA channel name + link (opens in new tab) |
| **Business Situation** ||||| |
| 11 | Contract signing date | contact_signing_date | Date (display) | — | |
| 12 | Next contract renewal date | next_contact_renewal_date | Date (display) | — | |
| 13 | Rental commission % | percentage_rental_commission | Number (display) | — | |
| **Location** ||||| |
| 14 | Address | address | Text (display) | — | |
| 15 | Country | country | Text (display) | — | |
| 16 | Region | region | Text (display) | — | |
| 17 | District | district | Text (display) | — | |
| 18 | Area | area | Text (display) | — | |
| 19 | Location type | location_type | Text (display) | — | |
| 20 | Residence | residence | Text (display) | — | |
| 21 | Google Map URL | google_map_url | Link | — | |
| **Property Type** ||||| |
| 22 | Number of bedrooms | number_of_bedrooms | Number (display) | — | |
| 23 | Number of bathrooms | number_of_bathrooms | Number (display) | — | |
| 24 | Maximum number of guests | number_of_guests | Number (display) | — | |
| 25 | Luxury level | luxury_level | Text (display) | — | |
| 26 | Usage purpose | property_usage | Tag list | — | |
| 27 | Accessible amenities | property_accessible | Text (display) | — | |
| 28 | Activities | property_activities | Tag list | — | |
| 29 | Transportation | property_transport | Tag list | — | |
| 30 | Has swimming pool | is_pool | Text (display) | — | |
| 31 | Pool length | pool_length | Number (display) | — | Shown when the property has a pool |
| 32 | Pool width | pool_width | Number (display) | — | Shown when the property has a pool |
| 33 | Pool depth | pool_depth | Number (display) | — | Shown when the property has a pool |
| 34 | Pool filtration system | pool_system | Text (display) | — | Shown when the property has a pool |

## Functions / Actions

- View property details (no edit functionality)
- Open OTA links (opens in a new tab)

## Navigation

- Accessed from OWP-005 My Portfolio (click the property name or the view icon)
- No further navigation from this page (breadcrumb returns to OWP-005)
