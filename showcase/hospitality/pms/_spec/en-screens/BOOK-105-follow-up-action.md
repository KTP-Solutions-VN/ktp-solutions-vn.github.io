# BOOK-105 — Adjustment Follow-up

**Type:** Full page (opened from BOOK-103)

**Route:** Booking/followUpAction/:id (id base64-encoded)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

View an existing action record (Villa Action) created from BOOK-104: the original filter parameters (read-only), a comparison of the original occupancy figures against current figures (current_*), and the list of villas with the action notes entered.

## Detailed Description

**Original Filter Information (read-only):**

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit | business_unit | Text (readonly) | — | Based on the saved `business_unit_id` |
| 2 | Date Range | date_range | Text (readonly) | — | `start_date`–`end_date`, format d-m-Y |
| 3 | Villa Type | property_type | Text (readonly) | — | Based on the saved `villa_type` |

**Comparison Table (at creation time / current):**

| # | Metric | Field Code | Notes |
|---|---|---|---|
| 1 | Number of Days | number_of_days | |
| 2 | Number of Villas | number_of_properties | |
| 3 | Occupancy Rate | occupancy_percent / current_occupancy_percent | Displayed as "X% / Y%" |
| 4 | Villas Below Low Threshold | property_low_occupancy / current_property_low_occupancy | |
| 5 | Villas Above High Threshold | property_high_occupancy / current_property_high_occupancy | |
| 6 | Daily Occupancy Rate Chart | chart_data | Google Charts line chart |

Includes the list of villas and the action notes (`data`) saved at record creation.

## Functions / Actions

- View-only/tracking; no direct edit buttons on this screen (the data is a snapshot taken at creation time, compared against current figures to evaluate the action's effectiveness).

## Navigation

- Opened from BOOK-103 ("Follow up" icon on each list row).
- No further navigation; uses breadcrumb/back to return to BOOK-103.
