# BOOK-058 — Add Booking Confirmation Template

**Type:** Popup/Page (opened from BOOK-057)
**Route:** Booking/addConfirmationTemplate
**Friendly route:** `/booking/confirmation-template/add`
**Module:** Booking

## Overview
Form for creating a new PDF booking confirmation template: company/brand information (logo, address, contact details), applicable language, and the business units that use the template.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Language | `language_id` | Select2 | Yes | Each language has only 1 template (an existing one will be overwritten) |
| 2 | Template Name | `template_name` | Text | Yes | |
| 3 | Logo | `logo`/`cropped_image` | File upload (with image cropping) | Yes | Maximum 1MB, 1:1 aspect ratio |
| 4 | Company Name | `company_name` | Text | Yes | |
| 5 | Address Line 1 | `address_1` | Text | Yes | |
| 6 | Address Line 2 | `address_2` | Text | No | |
| 7 | Address Line 3 | `address_3` | Text | No | |
| 8 | Phone | `phone` | Number | Yes | |
| 9 | Email | `email` | Email | Yes | |
| 10 | Website | `website` | Text | Yes | |
| 11 | Tax ID | `tax_id` | Text | Yes | |
| 12 | Company Short Name | `company_short_name` | Text | Yes | |
| 13 | Signatory Name | `signatory_name` | Text | Yes | |
| 14 | Currency | `currency_id` | Select2 | Yes | |
| 15 | Reply-to Email | `reply_email` | Email | Yes | |
| 16 | Applicable Business Units | `business_unit` | Multi-select checkbox | Yes | |

## Functions / Actions
- **Save** button — saves the template and returns to BOOK-057

## Navigation
- Opened from: BOOK-057 > "Add New" button
- Navigates to: BOOK-057 after saving
