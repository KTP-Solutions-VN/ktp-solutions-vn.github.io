# OWN-017 — Owner Email Alerts

**Type:** Full page

**Route:** `/Owner/emailAccessTemplate/{tab}/{selected_lang}` (controller `Owner`, action `emailAccessTemplate($tab, $selected_lang)`)

**Module:** Owner Relations (Admin)

## Overview

A screen for managing the content of 5 automated email templates related to owners: account creation (sign up) email, direct booking request notification email sent to the Business Unit, direct booking request notification email sent to the Owner, booking approval email, and booking rejection email. This is a first-level menu item under Settings ("Email Notifications"). Each tab manages content on a per-language basis.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Tab | `tab` (hidden) | Tab (Account Detail Email / Booking Request BU / Booking Request Owner / Booking Status Approved / Booking Status Rejected) | — | The URL updates based on the currently selected tab |
| 2 | Language | `language_id` | Select | Yes | Selecting a language reloads the corresponding title and template content (internal ajax, no page reload) |
| 3 | Email Title | `title` | Text | Yes | |
| 4 | Email Content | `content` | Rich text (TinyMCE) | Yes | |

## Functions / Actions

- **Switch Tab**: changes the email template type currently being edited (5 types, each with its own Save form — same field structure as above).
- **Change Language**: reloads the title/content based on the existing language for the currently selected email template type (no submission required).
- **Save** (per tab): saves the corresponding `EmailTemplate` record for the given `template_for` (`sign_up`, `direct_booking_bu_email`, `direct_booking_owner_email`, `direct_booking_approved_owner_email`, `direct_booking_rejected_owner_email`) and `language_id`.

## Navigation

- Opened from: Settings sidebar menu "Owner Email Alerts" (`active_menu` 98).
- Does not navigate to any other sub-screen — all actions are performed on the same page via tabs.
