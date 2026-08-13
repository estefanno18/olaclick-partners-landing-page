---
sidebar_position: 3
title: Notify Invoice
---

# Notify Invoice

After you emit an invoice, notify OlaClick with the invoice data.

## Endpoint

> **Endpoint:** `POST /v1/fiscal-notes/invoices/{invoice_id}`

```http
POST https://public-api.olaclick.app/v1/fiscal-notes/invoices/{invoice_id}
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Scope required:** `fiscal-notes:write`

The `invoice_id` is the same one you received in the [order webhook](/modules/fiscal-notes/emission/receive-orders).

See the [Authentication section in the API Reference](https://developers.olaclick.app/docs/api) to learn how to obtain an access token.

## Request Body — Invoice Issued

```json
{
  "status": "issued",
  "provider_invoice_id": "nf_789012",
  "invoice_number": "NF-e 000.123.456",
  "invoice_url": "https://connector.com/invoices/nf_789012/pdf",
  "issued_at": "2025-05-11T15:05:00.000Z",
  "invoice_data": {
    "access_key": "35250511234567890001901550010000001231234567890",
    "xml_url": "https://connector.com/invoices/nf_789012/xml",
    "total_taxes": 0
  }
}
```

## Request Body — Error

If you cannot emit the invoice, notify with `status: "error"`:

```json
{
  "status": "error",
  "error_code": "INVALID_CUSTOMER_DOCUMENT",
  "error_message": "The customer CPF is invalid"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | `issued` or `error` |
| `provider_invoice_id` | string | No | Your internal invoice ID |
| `invoice_number` | string | No | Invoice number |
| `invoice_url` | string | No | URL to download the PDF |
| `issued_at` | ISO 8601 | No | Emission date (required if `issued`) |
| `invoice_data` | object | No | Additional data (access key, XML URL, taxes) |
| `error_code` | string | No | Error code (required if `error`) |
| `error_message` | string | No | Error description |

## Responses

### 200 OK — Invoice registered

```json
{
  "statusCode": 200,
  "message": "Invoice registered successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "status": "issued",
    "registered_at": "2025-05-11T15:05:30.000Z"
  }
}
```

### 404 Not Found — Invoice ID not found

```json
{
  "statusCode": 404,
  "error": "INVOICE_NOT_FOUND",
  "message": "The invoice_id does not exist or does not belong to this connector"
}
```

### 409 Conflict — Already notified

```json
{
  "statusCode": 409,
  "error": "INVOICE_ALREADY_NOTIFIED",
  "message": "An invoice has already been registered for this invoice_id"
}
```

## Cancel an Invoice

> **Endpoint:** `POST /v1/fiscal-notes/invoices/{invoice_id}/cancel`

If an invoice needs to be cancelled after being issued:

```http
POST https://public-api.olaclick.app/v1/fiscal-notes/invoices/{invoice_id}/cancel
Authorization: Bearer {access_token}
Content-Type: application/json
```

```json
{
  "reason": "Order cancelled by customer",
  "cancelled_at": "2025-05-11T16:00:00.000Z"
}
```

**Response:** `200 OK`

```json
{
  "statusCode": 200,
  "message": "Invoice cancelled successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "status": "cancelled"
  }
}
```
