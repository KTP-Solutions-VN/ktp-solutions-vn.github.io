# BOOK-060 — View Booking Confirmation Template

**Type:** Popup/Page (opened from BOOK-057)
**Route:** Booking/viewConfirmationTemplate/:id (id is base64_encoded)
**Friendly route:** `/booking/confirmation-template/view/:id`
**Module:** Booking

## Overview
Read-only detail view of a booking confirmation template: language, template name, logo, company information, currency, and the business units it applies to.

## Detailed Description

| # | Field Label | Field Code | Notes |
|---|---|---|---|
| 1 | Language | `language_id` | Read-only |
| 2 | Template Name | `template_name` | Read-only |
| 3 | Logo | `logo` | Image |
| 4 | Company Name | `company_name` | |
| 5 | Address 1/2/3 | `address_1/2/3` | |
| 6 | Phone | `phone` | |
| 7 | Email | `email` | |
| 8 | Website | `website` | |
| 9 | Tax ID | `tax_id` | |
| 10 | Company Short Name | `company_short_name` | |
| 11 | Signatory Name | `signatory_name` | |
| 12 | Currency | `currency_id` | |
| 13 | Reply Email | `reply_email` | |
| 14 | Business Unit | `business_unit` | List of applicable business units |

## Functions / Actions
- None (view only)

## Navigation
- Opened from: BOOK-057 > View icon
- Navigates to: back to BOOK-057
