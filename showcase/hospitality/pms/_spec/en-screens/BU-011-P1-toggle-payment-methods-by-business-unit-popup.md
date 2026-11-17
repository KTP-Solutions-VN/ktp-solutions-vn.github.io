# BU-011-P1 — Toggle Payment Methods by Business Unit Popup

**Type:** Popup (opened from BU-011)

**Route:** Static Bootstrap modal (`#exampleModal`) in `business_unit_payment_method.ctp`; toggling is done via AJAX to `getBusinessPaymentMethod` (loads status) and `setBusinessPaymentMethod` (saves on click).

**Module:** Business Unit

## Overview
A popup listing all existing payment methods, each row having an on/off toggle switch to assign/unassign that method for the currently selected business unit — saved immediately on click, with no separate Save button.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Business Unit (hidden) | `business_unit_id` | Hidden | Yes | |
| 2 | Payment Method List | `pm` (per row) | Toggle icon (on/off) | — | Each payment method is an independent row; click to toggle |

## Functions / Actions
- **Toggle each method:** calls the `setBusinessPaymentMethod` AJAX endpoint, adds/removes a `BusinessUnitPaymentMethod` record, and updates the icon immediately (no page reload).

## Navigation
- Opened from: BU-011 (Business Unit list) — currency icon button on each row.
- No navigation to another page; closing the popup returns to BU-011.
