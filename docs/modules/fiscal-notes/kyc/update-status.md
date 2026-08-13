---
sidebar_position: 1
title: Update Connection Status
---

# Update Connection Status

The **connection** is the object that manages the KYC lifecycle between a company and your connector. When a company activates the addon, OlaClick creates the connection with status `pending`.

:::warning[Important]
While the connection is not `active`, **you cannot generate access tokens for that company**. This means you won't be able to query any company data (orders, clients, menu, etc.) until the KYC process is complete and you update the connection to `active`.
:::

This endpoint requires your **connector token** (not a company-scoped token). Authenticate using your `client_id` and `client_secret` without a `company_id` to obtain a connector-level token.

Once you validate (or reject) the company's documents, call this endpoint to transition the connection status.

> **API Reference:** [Update Connection Status](https://developers.olaclick-stg.click/docs/api/public-conections-controller-update-status)
