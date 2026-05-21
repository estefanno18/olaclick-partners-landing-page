---
sidebar_position: 2
title: Onboarding
---

# Onboarding

This guide describes the steps a partner must follow to obtain their `client_id` and `client_secret` credentials to start integrating with OlaClick.

## Steps

### 1. Fill out the integration request form

Contact the OlaClick integrations team and provide the following information:

| Field | Description | Required |
|-------|-------------|:--------:|
| Integration name | Name of your integration (e.g. "Nubefact Fiscal Notes") | ✅ |
| Contact name | Full name of the technical contact person | ✅ |
| Contact email | Email for technical communication | ✅ |
| Contact phone | Phone number for urgent matters | ✅ |
| Description | Brief description of what your integration does | ✅ |
| Countries | List of countries where the integration will operate (e.g. BR, MX, CO, AR) | ✅ |

### 2. OlaClick reviews and creates the application

Once the form is received, the OlaClick team will:

1. Review the information provided
2. Create the application in the system
3. Generate the `client_id` and `client_secret` credentials
4. Assign the appropriate scopes for your integration

### 3. Receive your credentials

OlaClick will send you:

| Credential | Description |
|------------|-------------|
| `client_id` | Your application's public identifier |
| `client_secret` | Your secret key for authentication |

:::danger
Store your `client_secret` securely. It will only be shared once. If lost, a new one must be generated (which invalidates the previous one).
:::

### 4. Start integrating

With your credentials, you can:

1. [Authenticate](/authentication) — Get an access token
2. [Create the KYC Iframe](/fiscal-notes/kyc-iframe) — Implement the document validation iframe
3. [Activate the integration](/fiscal-notes/activate-integration) — Notify OlaClick when KYC is complete
4. [Receive order notifications](/fiscal-notes/receive-orders) — Implement the webhook to receive order IDs
5. [Fetch order data](/orders/get-order) — Get the full order details
6. [Notify invoices](/fiscal-notes/notify-invoice) — Send issued invoices back to OlaClick
7. Complete the [Homologation](/homologation) process

## Scopes

Your application will be assigned scopes that determine which endpoints you can access. Scopes follow the format `{service}.{resource}.{action}`.

### Fiscal Notes

| Scope | Description |
|-------|-------------|
| `fiscal_notes.integration.activate` | Activate or reject an integration after KYC verification |
| `fiscal_notes.invoices.create` | Send issued invoices back to OlaClick |

### Orders

| Scope | Description |
|-------|-------------|
| `orders.order.read` | Fetch order data by ID |

:::info
While the Partners Portal application is being developed, credential delivery will be handled manually by the OlaClick integrations team. In the future, partners will be able to self-register and manage their credentials through the portal.
:::
