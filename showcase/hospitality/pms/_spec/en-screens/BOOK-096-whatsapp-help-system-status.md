# BOOK-096 — WhatsApp Help / System Status

**Type:** Full page

**Route:** Booking/whatsAppHelp (default: `/booking/whats-app-help`)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Booking

## Overview

A diagnostic/status-check page for the connection status of backend services supporting the chatbot/WhatsApp functionality: WhatsApp Business API token, Gemini AI, Firebase, and a lookup of WhatsApp API response logs by date, intended for the technical/operations team to troubleshoot issues.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | WhatsApp Token Status | data_array.access_token_response | Display (Ok = green, error = red) | — | |
| 2 | Gemini AI Status | data_array.gemeni_response | Display (Ok = green, error = red) | — | Makes a test call to the `gemini-2.0-flash:generateContent` API |
| 3 | Firebase Status | data_array.firebase_response | Display (Ok = green, error = red) | — | |
| 4 | WhatsApp API Log Lookup Date | date | Date input | Yes | Used for the WhatsApp API response log search form |

## Functions / Actions

- Search button in the log form: loads the list of WhatsApp API responses for the selected date.

## Navigation

- Accessed from: WhatsApp menu / help link on BOOK-095 (WhatsApp Manager, new version).
- No further navigation (standalone lookup/diagnostic page).
