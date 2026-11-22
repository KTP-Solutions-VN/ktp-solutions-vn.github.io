# BOOK-103 — Pricing Adjustments

**Type:** Full page

**Route:** Booking/action (default: `/booking/action`)

**Friendly route:** no dedicated route found in config/Routes.php

**Module:** Reservations

## Overview

List of pricing-adjustment analyses/actions created based on occupancy rate, organized by business unit and date range. This is the entry screen for creating new actions (BOOK-104) and tracking the results of each action (BOOK-105).

## Detailed Description

**List:**

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Business Unit | business_unit.short_name | |
| 2 | Start | start_date | Format d-M-y |
| 3 | End | end_date | Format d-M-y |
| 4 | Created by | created_by | Creator's name |
| 5 | On | created_at | Creation date, format d-M-y |
| 6 | Action | — | "Follow up" icon opens BOOK-105 |

Sorted by `VillaAction.id` descending (most recent first).

## Functions / Actions

- "+ Action" button (top-right corner) opens BOOK-104 (New Pricing Adjustment).
- "Follow up" icon on each row opens BOOK-105 (Adjustment Follow-up) with the id base64-encoded.

## Navigation

- Accessed from the main menu ("Pricing Adjustments" icon, active_menu = 1000).
- Navigates to BOOK-104 when "+ Action" is clicked.
- Navigates to BOOK-105 when the Follow Up icon on a row is clicked.
