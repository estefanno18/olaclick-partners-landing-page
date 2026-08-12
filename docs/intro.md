---
sidebar_position: 2
title: Glossary
---

# Glossary

Key concepts used throughout this documentation.

## Concepts

| Concept | Description |
|---------|-------------|
| **Company** | An OlaClick client (business/restaurant). The entity that activates connectors. |
| **Connector** | A third-party provider that integrates with OlaClick to offer services (e.g. electronic invoicing) |
| **Connection** | The link between a company and a connector. Manages the integration lifecycle and KYC status (`pending`, `active`, `rejected`) |
| **Module** | A set of capabilities that a connector implements (e.g. `fiscal_notes`). See [available modules](/#available-modules) |
| **Scope** | A permission that grants access to a specific action (format: `resource:action`). See [available modules](/#available-modules) |
| **Binding Event** | The webhook event OlaClick sends to a connector when a company activates the integration |
| **Webhook** | An HTTP endpoint where OlaClick delivers real-time event notifications |

## API Reference

The full API reference is available at [developers.olaclick.app](https://developers.olaclick.app/docs/api).
