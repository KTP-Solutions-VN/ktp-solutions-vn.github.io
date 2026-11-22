# BU-011 — Payment Methods per Unit

**Type:** Full page

**Route:** `BusinessUnitController::businessUnitPaymentMethod()` — default `/business-unit/business-unit-payment-method`

**Module:** Operating Units

## Overview
A list of all Business Units, allowing a popup to be opened to quickly toggle each payment method applicable to each unit. This is a condensed/alternative version of payment method assignment compared to the "Payment methods" tab on BU-010.

## Detailed Description

List (DataTable):

| # | Column Name | Field code | Notes |
|---|---|---|---|
| 1 | No. | — | |
| 2 | Business Unit Name | `name` | |
| 3 | Created Date | `created_at` | |
| 4 | Actions | — | Button to open the payment method assignment popup |

## Functions / Actions
- **Payment methods** (currency icon button): opens popup BU-011-P1 to toggle the payment methods applicable to the corresponding Business Unit.
- "Payment methods" button at the top of the page: navigates to BU-010 (Payment Setup).

## Navigation
- Accessed from: Settings menu; or from BU-010.
- Navigates to: BU-010, BU-011-P1 (payment method toggle popup).
