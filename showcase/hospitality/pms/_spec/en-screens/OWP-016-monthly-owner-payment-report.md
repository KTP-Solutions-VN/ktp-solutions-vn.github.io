# OWP-016 — Monthly Owner Payment Report

**Type:** Full page

**Route:** `ExternalUserController::paymentReport($villa_id)` — no dedicated friendly route, opened from OWP-005 ($ icon), of the form `.../payment-report/{villa_id_base64}`

**Module:** Owner Portal

## Overview

List of Monthly Owner Payment Reports sent for a property, showing the expected next payment date and allowing the report file to be downloaded.

## Detailed Description

Filters:

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|---|---|---|---|---|
| 1 | Property | villa_id | Select2 | Yes | |

Notice: "The next payment period is expected on..." (payment_date, calculated from the most recent report)

List — displayed columns:

| # | Column | Field Code | Notes |
|---|---|---|---|
| 1 | Property name | property_name | |
| 2 | Report name | report_name | |
| 3 | Start date | start | |
| 4 | End date | end | |
| 5 | Sent date | sent_on | |
| 6 | Actions | actions | Download the report file (.pdf) |

## Functions / Actions

- Search/filter by property
- Download the payment report file (download icon, links to a static file on the server)

## Navigation

- Accessed from OWP-005 ($ "Payment History" icon)
- No navigation to another screen
