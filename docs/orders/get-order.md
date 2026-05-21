---
sidebar_position: 1
title: Get Order
---

# Get Order

Fetch the full order data by ID. Use this endpoint after receiving an order notification on your webhook.

## Endpoint

```http
GET https://api.olaclick.app/ms-partners/orders/{order_id}
Authorization: Bearer {access_token}
```

**Scope required:** `orders.order.read`

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `order_id` | `string (UUID)` | The order ID received in the webhook notification |

## Response — 200 OK

```json
{
  "statusCode": 200,
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "public_id": "ORD-1234",
    "source": "rappi",
    "status": "completed",
    "service_type": "delivery",
    "provider_reference_id": "rappi-order-98765",
    "client": {
      "name": "João Silva",
      "email": "joao@email.com",
      "phone_number": "+5511999999999"
    },
    "address": {
      "address": "Rua Example, 123, Centro, São Paulo",
      "complement": "Apt 4"
    },
    "combos": [
      {
        "product_name": "Classic Burger",
        "product_category_name": "Burgers",
        "variant_price": 2590,
        "quantity": 2,
        "combo_price": 5180,
        "sku": "HAM-001",
        "modifiers": [
          { "name": "Extra cheese", "price": 250, "quantity": 2 }
        ]
      }
    ],
    "payments": [
      {
        "payment_method": { "code": "RAPPI_PAY" },
        "received_amount": 6880
      }
    ],
    "totals": {
      "combos_price": 6380,
      "delivery_price": 500,
      "total_discounts": 0,
      "total": 6880
    },
    "payment_status": "paid",
    "created_at": "2025-05-11T14:00:00.000Z",
    "completed_at": "2025-05-11T14:45:00.000Z"
  }
}
```

### Order Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique order identifier |
| `public_id` | string | Human-readable order ID |
| `source` | string | Delivery provider (rappi, ifood, didi, 99food, pedidosya, uber) |
| `status` | string | Order status (always `completed` for invoicing) |
| `service_type` | string | `delivery` or `pickup` |
| `provider_reference_id` | string | Order ID in the delivery provider's system |
| `client` | object | Customer information |
| `address` | object | Delivery address |
| `combos` | array | Products ordered |
| `payments` | array | Payment methods used |
| `totals` | object | Order totals |
| `payment_status` | string | `paid` or `pending` |
| `created_at` | ISO 8601 | When the order was created |
| `completed_at` | ISO 8601 | When the order was completed |

### Combo (Product) Fields

| Field | Type | Description |
|-------|------|-------------|
| `product_name` | string | Product name |
| `product_category_name` | string | Product category |
| `variant_price` | integer | Unit price in cents |
| `quantity` | integer | Quantity ordered |
| `combo_price` | integer | Total price (variant_price × quantity) in cents |
| `sku` | string | Product SKU |
| `modifiers` | array | Product modifiers/extras |

### Payment Fields

| Field | Type | Description |
|-------|------|-------------|
| `payment_method.code` | string | Payment method code (e.g. `RAPPI_PAY`, `IFOOD_CASH`) |
| `received_amount` | integer | Amount received in cents |

### Totals Fields

| Field | Type | Description |
|-------|------|-------------|
| `combos_price` | integer | Sum of all products in cents |
| `delivery_price` | integer | Delivery fee in cents |
| `total_discounts` | integer | Total discounts applied in cents |
| `total` | integer | Final total in cents |

:::info
All monetary values are in **cents** (integers). For example, $25.90 = `2590`.
:::

## Response — 404 Not Found

```json
{
  "statusCode": 404,
  "error": "ORDER_NOT_FOUND",
  "message": "The order with the provided ID does not exist"
}
```

## Response — 403 Forbidden

```json
{
  "statusCode": 403,
  "error": "ACCESS_DENIED",
  "message": "You do not have access to this order"
}
```

This error is returned when the order exists but does not belong to a company integrated with your application.

## Example with cURL

```bash
curl -X GET https://api.olaclick.app/ms-partners/orders/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."
```
