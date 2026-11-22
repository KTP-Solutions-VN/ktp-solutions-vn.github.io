# BOOK-059 — Edit Confirmation Layout

**Type:** Popup/Page (opened from BOOK-057)
**Route:** Booking/editConfirmationTemplate/:id (id is base64_encoded)
**Friendly route:** `/booking/confirmation-template/edit/:id`
**Module:** Reservations

## Overview
Form for editing an existing booking confirmation template. Fields are identical to the "Add New" screen (BOOK-058), pre-populated with default values from the existing record.

## Detailed Description
See the field table in BOOK-058 (fields: language_id, template_name, logo/cropped_image, company_name, address_1/2/3, phone, email, website, tax_id, company_short_name, signatory_name, currency_id, reply_email, business_unit).

## Functions / Actions
- **Save/Update** button — updates the template, writes an activity log entry, and returns to BOOK-057

## Navigation
- Opened from: BOOK-057 > Edit icon
- Navigates to: BOOK-057 after saving
