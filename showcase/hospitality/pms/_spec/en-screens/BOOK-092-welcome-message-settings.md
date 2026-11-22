# BOOK-092 — Greeting Templates

**Type:** Full page

**Route:** Booking/messageSettings (default: `/booking/message-settings`)

**Pretty route:** No dedicated route found in config/Routes.php (uses the default route)

**Module:** Reservations

## Overview

Manages welcome message templates sent to guests when a chat is opened, which can be configured either generally by Country/Region or assigned individually per Villa.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | country | Select | Yes | Only lists countries with a valid Region that has villas currently open and an active BU |
| 2 | Region | region_id | Select | Yes | Loaded based on the selected country (via `getRegions` AJAX action) |
| 3 | Regional message list table | (`#welcome-table` panel) | AJAX table | — | Lists welcome messages configured by language for the region |
| 4 | Villa-specific message assignment table | (`#villa-message-table` panel) | AJAX table | — | Hidden by default, shown when "Assign Message to Villa" is clicked |

## Functions / Actions

- "Add Message" button: opens a form to add a welcome message by Region + language (saved via the `saveWelcomeMessages` AJAX action).
- "Assign Message to Villa" button: opens a form to assign an existing message template to a specific villa (saved via the `saveWelcomeVillaMessage` AJAX action).
- Selecting a country/region reloads the corresponding message list.
- Delete a message (via `deleteWelcomeMessage`).

## Navigation

- Accessed from: conversations & knowledge menu.
- Welcome messages are used when activating a chat at BOOK-089-P1 (Open Guest Thread).
