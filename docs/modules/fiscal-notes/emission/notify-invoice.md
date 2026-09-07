---
sidebar_position: 3
title: Notify Invoice
---

# Notify Invoice

After you emit (or fail to emit) an invoice, notify OlaClick with the result so the order's electronic invoice record is updated.

## Endpoint

> **Endpoint:** `PATCH /v1/companies/{company_id}/electronic-invoices/confirmation`

```http
PATCH https://public-api.olaclick.app/v1/companies/{company_id}/electronic-invoices/confirmation
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Scope required:** `fiscal-notes:write`

The `company_id` is the same one you received in `data.company_id` from the [order webhook](/modules/fiscal-notes/emission/receive-orders).

See the [Authentication section in the API Reference](https://developers.olaclick.app/docs/api) to learn how to obtain an access token.

## Request Body — Invoice Issued

When the invoice was successfully emitted, send `status: "COMPLETED"`:

```json
{
  "order_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "COMPLETED",
  "message": "Invoice issued successfully",
  "invoice_number": "FE5398",
  "print_data": {
    "qr_code_text": "https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=25ca4186...",
    "cufe": "25ca418613d57642a99e77399321a846...",
    "validation_date": "2025-11-29",
    "validation_time": "10:53:43-05:00",
    "issue_date": "2026-01-03",
    "issue_time": "16:58:25-05:00",
    "resolution_text": "Resolución DIAN Nº 18764104014926 del 30/12/2025...",
    "electronic_signature": "WG8U3sSLlArTYPygzMZwmMcVm96rhFE06LURPd/Xl2..."
  },
  "xml_json": {
    "Invoice": {
      "cbc:ID": "FE5398",
      "cbc:IssueDate": "2026-01-03"
    }
  }
}
```

## Request Body — Error / Cancelled

If you cannot emit the invoice, send `status: "CANCELLED"`:

```json
{
  "order_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "CANCELLED",
  "message": "The customer CPF is invalid"
}
```

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `order_id` | UUID | Yes | The order ID from the webhook `data.order_id` |
| `status` | string | Yes | `COMPLETED` or `CANCELLED` |
| `message` | string | No | Human-readable description of the result |
| `invoice_number` | string | No | Invoice number (max 255 chars) |
| `print_data` | object | No | Normalized data for printing (QR, CUFE, dates, signatures) |
| `xml_json` | object | No | Parsed XML structure of the electronic invoice |

:::warning
Only `COMPLETED` and `CANCELLED` are accepted. Sending `PENDING` or any other value returns `422 Unprocessable Entity`.
:::

## Responses

### 200 OK — Confirmation processed

```json
{
  "message": "Electronic invoice confirmation successfully processed"
}
```

### 404 Not Found — Order or invoice not found

```json
{
  "message": "Electronic invoice not found for the given order and company"
}
```

### 422 Unprocessable Entity — Validation error

```json
{
  "message": "The selected status is invalid.",
  "errors": {
    "status": ["The selected status is invalid."]
  }
}
```
