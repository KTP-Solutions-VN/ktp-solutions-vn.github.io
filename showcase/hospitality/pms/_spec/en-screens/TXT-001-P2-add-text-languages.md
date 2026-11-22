# TXT-001-P2 — Add Description Languages

**Type:** Popup (opened from TXT-001, Languages tab)

**Route:** Static modal within `index.ctp` (`#texts-language-modal`); saves via AJAX `TextsController::saveLanguages()` — `POST /texts/save-languages`

**Module:** Description Bank

## Overview
Allows enabling one or more additional guest languages available for a country with active properties, to support OTA content translation.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Country | `country_id` | Select (countries with active properties only) | Yes | |
| 2 | Available guest languages | `language_ids[]` | Multi-select grid of checkboxes | Yes (minimum 1) | Hides languages already added for that country |

## Functions / Actions
- **Add selected:** saves the new languages into `OtaTextLanguages` for the selected country, refreshes the list on the Languages tab of TXT-001.
- **Cancel:** closes the modal without saving.

## Navigation
- Opened from: the "Add language" button on the Languages tab of TXT-001.
- After saving: closes the modal, refreshes the language list on TXT-001.
