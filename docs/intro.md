---
sidebar_position: 1
slug: /
title: Get Started
---

# Get Started

Welcome to the **OlaClick Partners** integration portal.

This documentation describes how to integrate your platform with OlaClick as a registered partner.

## Architecture

| Service | Responsibility |
|---------|---------------|
| **ms-partners** | Partner registration, credentials, OAuth tokens, company access (integrations), KYC state |
| **Fiscal Notes** | Invoice emission logic, webhook delivery |
| **Orders** | Order data access |

## Concepts

| Concept | Description |
|---------|-------------|
| **OlaClick Partner** | A registered third-party provider with credentials and assigned integrations |
| **Integration** | A module the partner has access to (e.g. `fiscal_notes`). Determines scopes. |
| **Company access** | Which OlaClick companies the partner can serve (managed via integrations table) |
| **KYC** | Document validation state per company, managed in ms-partners |

## Base URL

| Environment | URL |
|-------------|-----|
| **Production** | `https://api.olaclick.app/ms-partners` |
| **Staging** | `https://api.olaclick-stg.click/ms-partners` |

:::info
All API requests require authentication via Bearer token. See the [Authentication](/authentication) section for details.
:::
