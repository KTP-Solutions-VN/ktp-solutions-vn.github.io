# BOOK-055 — Villa Listing by OTA Channel (OTA Listing)

**Type:** Full page (opened from BOOK-054)
**Route:** Booking/otaListing (default: `/booking/ota-listing`)
**Module:** Booking

## Overview
Checks which villas have NOT been linked to a specific OTA channel, based on the villa's OTA link configuration (`VillaOtaManagement`). Used to identify villas that are still missing synchronization configuration with a sales channel.

## Detailed Description

### Filters
| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | `business_unit_id` | Select2 | No | |
| 2 | OTA Channel | `ota` | Select (selection required) | Yes | List of Channels (Chanel) |

### Results
| # | Column | Notes |
|---|---|---|
| 1 | Property | List of villas not linked to the selected OTA channel |

## Functions / Actions
- Select the BU and OTA channel, then click **Check** to view the list of villas not yet linked

## Navigation
- Opened from: BOOK-054 (OTA) > "Listing" button
- Navigates to: none (the OTA linking action is performed on the villa configuration screen, outside the Booking module)
