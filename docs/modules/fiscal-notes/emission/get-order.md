---
sidebar_position: 1
title: Get Order
---

# Get Order

Fetch order data by ID or public ID. Use this endpoint after receiving an order notification on your webhook.

## Endpoint

```http
GET https://public-api.olaclick.app/v1/orders/{id}
Authorization: Bearer {api_key}
```

**Scope required:** `orders:read`

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string` | Order UUID (e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479`) or public ID (e.g. `BR-1234567890`) |

:::info
The endpoint accepts two formats for the `id` parameter:
- **UUID:** `f47ac10b-58cc-4372-a567-0e02b2c3d479`
- **Public ID:** `BR-1234567890` (country code + 10 digits)
:::

## Response — 200 OK

```json
{
  "data": {
    "id": "BR-1234567890",
    "status": "finalized",
    "service_type": "delivery",
    "source": "rappi",
    "client": {
      "name_first": "Joao",
      "phone_last4": "9999"
    },
    "delivery_address": {
      "city": "Sao Paulo",
      "area": "Centro"
    },
    "totals": {
      "currency": "BRL",
      "subtotal_minor": 5680,
      "delivery_minor": 500,
      "service_fee_minor": 0,
      "discount_minor": 500,
      "tip_minor": 0,
      "total_minor": 5880,
      "total_paid_minor": 5880
    },
    "items": [
      {
        "id": "c1b2a3d4-e5f6-7890-abcd-ef1234567890",
        "product_id": "prod-001",
        "product_name": "Classic Burger",
        "variant_name": "Large",
        "quantity": 2,
        "unit_price_minor": 2590,
        "subtotal_minor": 5180,
        "modifiers": [
          {
            "name": "Extra cheese",
            "price_minor": 250
          }
        ]
      }
    ],
    "created_at": "2025-05-11T14:00:00.000Z",
    "updated_at": "2025-05-11T14:45:00.000Z"
  }
}
```

## Field Reference

### Order

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Public order ID (e.g. `BR-1234567890`) |
| `status` | string | `pending`, `preparing`, `ready`, `delivered`, `finalized`, `cancelled` |
| `service_type` | string | `delivery`, `takeaway`, `onsite`, `table` |
| `source` | string | Order source (e.g. `rappi`, `ifood`, `didi`, `uber_eats`, `pedidosya`, `99food`, `inbound`, `outbound`) |
| `client` | object \| null | Redacted client info (PII protected) |
| `delivery_address` | object \| null | Redacted delivery address (PII protected) |
| `totals` | object \| null | Order monetary totals in minor units |
| `items` | array | Order line items (products) |
| `created_at` | ISO 8601 | When the order was created |
| `updated_at` | ISO 8601 | Last update timestamp |

### Client (PII redacted)

| Field | Type | Description |
|-------|------|-------------|
| `name_first` | string | First name only (e.g. `"Joao"`) |
| `phone_last4` | string | Last 4 digits of phone (e.g. `"9999"`) |

:::warning
Client data is PII-redacted. You only receive the first name and last 4 digits of the phone number. Full client data is not available through this API.
:::

### Delivery Address (PII redacted)

| Field | Type | Description |
|-------|------|-------------|
| `city` | string \| null | City name |
| `area` | string \| null | Area/neighborhood name |

### Totals

| Field | Type | Description |
|-------|------|-------------|
| `currency` | string | ISO 4217 currency code (e.g. `BRL`, `MXN`, `COP`, `ARS`) |
| `subtotal_minor` | integer | Products subtotal in cents |
| `delivery_minor` | integer | Delivery fee in cents |
| `service_fee_minor` | integer | Service fee in cents |
| `discount_minor` | integer | Total discounts in cents |
| `tip_minor` | integer | Tips in cents |
| `total_minor` | integer | Final order total in cents |
| `total_paid_minor` | integer | Amount actually paid in cents |

:::info
All monetary values are in **minor units** (cents). For example, R$ 58.80 = `5880`.
:::

### Item

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Line item ID |
| `product_id` | string \| null | Product ID |
| `product_name` | string | Product name |
| `variant_name` | string \| null | Variant/size name |
| `quantity` | integer | Quantity ordered |
| `unit_price_minor` | integer | Unit price in cents |
| `subtotal_minor` | integer | Line total in cents (unit_price * quantity) |
| `modifiers` | array | Product modifiers/extras |

### Modifier

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Modifier name |
| `price_minor` | integer | Modifier price in cents |

## Error Responses

### 422 Validation Failed — Invalid ID format

```json
{
  "statusCode": 422,
  "error": "validation_failed",
  "message": "Invalid order id format.",
  "errors": [
    {
      "field": "id",
      "message": "Must be a valid UUID or public order id (e.g. BR-1234567890)."
    }
  ]
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "error": "ORDER_NOT_FOUND",
  "message": "The order with the provided ID does not exist"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "error": "ACCESS_DENIED",
  "message": "You do not have access to this order"
}
```

This error is returned when the order exists but does not belong to a company integrated with your connector.

## Example

```bash
curl -X GET https://public-api.olaclick.app/v1/orders/BR-1234567890 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."
```
