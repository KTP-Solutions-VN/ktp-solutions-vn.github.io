# BU-022 — Booking Platforms

**Type:** Full page (3 tabs)

**Route:** `BusinessUnitController::channels($tab)` — default `/business-unit/channels/{tab}` (tab: `platforms`, `accounts`, `content-elements`)

**Module:** Operating Units

## Overview
The new-version distribution channel management page, replacing the main menu entry point for BU-005 (the old "Sales Channels" page using `chanels()`/`chanel.ctp`, which is still functional via direct URL but no longer linked from the current sidebar). Consists of 3 tabs: "Booking Platform" (`platforms`), "Channel Account" (`accounts`), and "Content Element" (`content-elements`, Superadmin only).

## Detailed Description

### Tab 1 — Booking Platform (`platforms`)
List of `BookingPlatform` records:

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Platform | `name` | |
| 3 | Logo | `logo` | |
| 4 | Listing Content (Superadmin only) | — | Link to `OtaContent::listing`, summarizing the number of configured content items |
| 5 | Created By | `created_by` → staff name | |
| 6 | Created Date | `created_at` | |
| 7 | Actions | — | Edit, Delete, (Superadmin) Edit Listing Content |

### Tab 2 — Channel Account (`accounts`)
List of `Chanel` records (specific accounts/channels belonging to a platform):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Account | `name` | |
| 3 | Platform | `booking_platform_id` → name | |
| 4 | Ownership | `ownership` | `Azura Stays` / `Partner` |
| 5 | Created Date | `created_at` | |
| 6 | Actions | — | Link Villas by Channel (BU-006), Edit, Delete |

### Tab 3 — Content Element (`content-elements`, Superadmin only)
Configuration table for OTA content components (drag-and-drop reordering):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | No. (drag handle) | — | |
| 2 | Element | `name` | |
| 3 | Group | `group_key` | |
| 4 | Scope | `scope_key` | |
| 5 | Length | `max_length` | "No limit" if empty |
| 6 | Translatable | `translatable` | Yes/No |
| 7 | Applies To | `ota_content_element_platforms` | List of platforms |
| 8 | Actions | — | Edit, Delete (archive) |

## Functions / Actions
- **Add new (Platform tab):** opens popup BU-022-P1 in Add mode.
- **Edit platform:** opens popup BU-022-P1 in Edit mode.
- **Delete platform:** opens popup BU-022-P2 to confirm deletion (blocks deletion if any channel account is still using that platform).
- **Add new (Channel Account tab):** opens popup BU-022-P3 in Add mode.
- **Edit channel account:** opens popup BU-022-P3 in Edit mode.
- **Delete channel account:** opens popup BU-022-P4 to confirm deletion.
- **Link (link icon):** navigates to BU-006 (Channel Listing Links), opens in a new tab.
- **Add new (Content Element tab):** opens popup BU-022-P5 in Add mode.
- **Edit content element:** opens popup BU-022-P5 in Edit mode.
- **Delete (archive) content element:** opens popup BU-022-P6 to confirm deletion, warning if the element is linked to a platform or in use within Texts.
- **Drag-and-drop (Content Element tab):** changes the display order, saved immediately via AJAX.

## Navigation
- Accessed from: main menu > Booking Platforms (the current sidebar points to `channels`, default tab `platforms`); or from `OtaContent::listing`.
- Navigates to: BU-006 (Channel Listing Links), BU-022-P1…P6 (popups), `OtaContent::listing` (Superadmin).
