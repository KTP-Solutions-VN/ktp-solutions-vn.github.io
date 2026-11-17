# PROP-052 — Guest Contract PDF Export (Guest Contract Assignment PDF)

**Type:** Full page (output is a directly downloaded PDF file, not an interactive HTML page)
**Route:** property/guest-contract-assignment-pdf?villa_id=...&general_version_id=...&language_code=...&electricity_mode=...
**Module:** PROP = Properties

## Overview
Action that generates and returns a complete Guest Contract PDF file for a Property, based on the assigned contract template version (`general_version_id`), the selected language, and the selected electricity billing mode (`electricity_mode`). The `.ctp` view is only an HTML/CSS template (A4 size) used as input for the Dompdf library to render the PDF; it is not an interactive screen.

## Detailed Description
| # | Field / Content Block | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Villa Id | `villa_id` | Query param | Yes | |
| 2 | General Version Id | `general_version_id` | Query param | Yes | Contract template version |
| 3 | Language Code | `language_code` | Query param | Yes | Contract content language |
| 4 | Electricity Mode | `electricity_mode` | Query param | Yes | Electricity charging mode applied in the contract |
| 5 | Header — Logo/Property Code/Location | `pdfHeaderData` | Image + text (pre-rendered) | — | Sourced from Business Unit logo, Property name, District/Region |
| 6 | Contract Content (Sections) | `sections`/`replacements` | HTML block (pre-rendered) | — | Content per the contract template, with placeholders replaced by Property data |
| 7 | Footer — Logo/Property Code/Location | `pdfHeaderData` (footer_*) | Image + text (pre-rendered) | — | |

## Functions / Actions
- No action buttons on the PDF file itself; triggered from the "Preview"/"Download" button on PROP-051 or the Portal Contract tab of PROP-050.
- If the contract data is incomplete/invalid → error flash message and redirect to the previous page (`referer`) instead of exporting the PDF.
- The PDF file name is auto-generated in the format `Guest-Contract-{PropertyName}-{ElectricityMode}.pdf`.

## Navigation
- Opened from: PROP-051 (Guest Contract BU Recap — Preview/Download button), PROP-050 (Portal Contract tab).
- Navigates to: None (ends with a PDF download or an error redirect to the previous page).
- Child popup: None.
