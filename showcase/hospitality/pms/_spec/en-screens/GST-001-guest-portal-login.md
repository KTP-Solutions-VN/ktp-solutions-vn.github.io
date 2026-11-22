# GST-001 — Guest Hub Login

**Type:** Full page
**Route:** `Guest::index()` — default `/guest/index`; pretty route: `/Welcome`, `/Welcome/:id` (both point to the same action; the `id` parameter is not used by the controller)
**Module:** Guest Hub

## Overview
The login page using the "access code" issued by the system to each guest party (chat group). This is also the default `loginAction`/`logoutRedirect`/`unauthorizedRedirect` for the Guest Hub.

## Detailed Description

| # | Field Label | Field Code | Data Type / Input | Required | Notes |
|---|-----------|------------|---------------------|----------|---------|
| 1 | Access Code | `access_code` | Text input | Yes (enforced via JS `.required`, jQuery Validate) | Matched against `GroupChat.access_code` (condition `GroupChat.status != Inactive`); retrieves accompanying `GuestDetail` information (full name, email, address, phone number, country, language) to create the login session |
| 2 | Login error message | (Flash message) | Display text | No | Shows `invalid_access_code_text` when no matching `GroupChat` is found or the party is `Inactive` |

## Functions / Actions
- **"Access Portal" submit button**: submits `access_code` via POST; if valid, the system:
  - Logs the access event (`_generateAccessLogs`) with the content "`<Guest Name>` logged into the system."
  - Establishes the Auth session (`user_type = guest-user`, `access_code`, `booking_id`, guest information, etc.)
  - Redirects to GST-002 (My Reservations)
- If the access code is invalid/the party is inactive: displays an error Flash message and remains on the page.
- If the user is already logged in and reopens this URL: automatically redirected to GST-003 (Trip Details).

## Navigation
- Successful login → GST-002 (My Reservations)
- Existing active session → GST-003 (Trip Details)
