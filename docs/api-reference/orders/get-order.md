---
sidebar_position: 1
title: Get Order
---

# Get Order

Fetch the full order data by ID. Use this endpoint after receiving an order notification on your webhook.

## Endpoint

```http
GET https://api.olaclick.app/ms-olaclickhub/connectors/v1/orders/{order_id}
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
    "daily_id": 42,
    "source": "rappi",
    "status": "completed",
    "previous_status": "delivering",
    "service_type": "delivery",
    "provider_reference_id": "rappi-order-98765",
    "comment": "Ring the bell please",
    "delivery_comment": "Leave at the door",
    "delivered_by": "provider",
    "delivery_status": "delivered",
    "delivery_status_updated_at": "2025-05-11T14:40:00.000Z",
    "delivery_error": null,
    "scheduled_delivery_date": null,
    "order_title": null,
    "consumers_quantity": 1,
    "cancelation_reason": null,
    "company_id": "550e8400-e29b-41d4-a716-446655440000",
    "country_code": "BR",
    "timezone": "America/Sao_Paulo",
    "currency": "BRL",
    "client_id": "a1b2c3d4-e5f6-7890-abcd-000000000001",
    "client": {
      "id": "a1b2c3d4-e5f6-7890-abcd-000000000001",
      "name": "João Silva",
      "email": "joao@email.com",
      "phone_number": "+5511999999999",
      "country_calling_code": "+55",
      "source": "rappi",
      "turbo_sales_unsubscribed": false
    },
    "address_id": "b2c3d4e5-f6a7-8901-bcde-000000000002",
    "address": {
      "id": "b2c3d4e5-f6a7-8901-bcde-000000000002",
      "address": "Rua Example, 123, Centro, São Paulo",
      "complement": "Apt 4",
      "reference": "Next to the pharmacy",
      "area_id": null,
      "area_name": null,
      "latitude": -23.5505,
      "longitude": -46.6333,
      "type": "delivery"
    },
    "combos": [
      {
        "id": "c1b2a3d4-e5f6-7890-abcd-ef1234567890",
        "product_id": "prod-001",
        "product_name": "Classic Burger",
        "product_category_name": "Burgers",
        "variant_id": "var-001",
        "variant_name": "Large",
        "variant_price": 2590,
        "variant_original_price": 2590,
        "variant_cost": 1200,
        "variant_packaging_price": 100,
        "combo_price": 5180,
        "combo_original_price": 5180,
        "combo_cost": 2400,
        "modifiers_price": 500,
        "quantity": 2,
        "sku": "HAM-001",
        "comment": "No onions",
        "canceled_at": null,
        "in_kitchen_at": "2025-05-11T14:05:00.000Z",
        "kitchen_id": "k-001",
        "kitchen": {
          "id": "k-001",
          "name": "Main Kitchen",
          "default": true
        },
        "modifiers": [
          {
            "modifier_id": "mod-001",
            "name": "Extra cheese",
            "category_name": "Extras",
            "price": 250,
            "original_price": 250,
            "quantity": 2,
            "cost": 100
          }
        ],
        "created_at": "2025-05-11T14:00:00.000Z",
        "updated_at": "2025-05-11T14:05:00.000Z"
      }
    ],
    "discounts": [
      {
        "id": "d1e2f3a4-b5c6-7890-abcd-ef1234567890",
        "value": 500,
        "type": "fixed",
        "modality": "coupon",
        "description": "Welcome discount"
      }
    ],
    "payments": [
      {
        "id": "p1a2b3c4-d5e6-7890-abcd-ef1234567890",
        "payment_method_id": "pm-uuid",
        "payment_method": {
          "id": "pm-uuid",
          "code": "RAPPI_PAY"
        },
        "received_amount": 6880,
        "tip_amount": 0,
        "fee_amount": null,
        "bill_amount": 6880,
        "olapay_transaction_id": null,
        "canceled_at": null,
        "created_at": "2025-05-11T14:00:00.000Z",
        "updated_at": "2025-05-11T14:00:00.000Z"
      }
    ],
    "meta_data": {
      "assigned_payment": {
        "payment_method_id": "pm-uuid",
        "payment_method_code": "RAPPI_PAY",
        "payment_method_description": "Rappi Pay",
        "received_amount": 6880,
        "fee_amount": 0,
        "tip_type": "none",
        "tip_value": 0,
        "bill_amount": 6880
      }
    },
    "payment_status": "paid",
    "combos_price": 5680,
    "combos_original_price": 5680,
    "combos_cost": 2400,
    "delivery_price": 500,
    "delivery_cost": 0,
    "packaging_price": 200,
    "service_fee": 0,
    "service_fee_price": 0,
    "service_fee_description": null,
    "service_fee_type": "none",
    "total_discounts": 500,
    "total_tips": 0,
    "total_paid": 5880,
    "total_payment_fee": 0,
    "total_usd": 0,
    "total": 5880,
    "electronic_invoice": null,
    "rider": null,
    "rider_was_recently_created": null,
    "previous_rider_id": null,
    "table": null,
    "table_id": null,
    "owner_id": null,
    "order_uuid": null,
    "client_ticket_printed_at": null,
    "utm_campaign": null,
    "utm_source": null,
    "pending_at": "2025-05-11T14:00:00.000Z",
    "preparing_at": "2025-05-11T14:02:00.000Z",
    "prepared_at": "2025-05-11T14:30:00.000Z",
    "closed_at": "2025-05-11T14:45:00.000Z",
    "created_at": "2025-05-11T14:00:00.000Z",
    "updated_at": "2025-05-11T14:45:00.000Z"
  }
}
```

## Field Reference

### Order

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique order identifier |
| `public_id` | string | Human-readable order ID |
| `daily_id` | number | Sequential daily order number |
| `source` | string | Delivery provider (`rappi`, `ifood`, `didi`, `99food`, `pedidosya`, `uber`) |
| `status` | string | Current order status |
| `previous_status` | string | Previous order status |
| `service_type` | string | `delivery` or `pickup` |
| `provider_reference_id` | string \| null | Order ID in the delivery provider's system |
| `comment` | string \| null | General order comment |
| `delivery_comment` | string \| null | Delivery instructions |
| `delivered_by` | string \| null | Who delivers: `provider`, `restaurant`, or null |
| `delivery_status` | string | Delivery status |
| `delivery_status_updated_at` | ISO 8601 | Last delivery status update |
| `delivery_error` | null | Delivery error (if any) |
| `scheduled_delivery_date` | string \| null | ISO 8601 if scheduled, null if immediate |
| `order_title` | string \| null | Order title |
| `consumers_quantity` | number | Number of consumers |
| `cancelation_reason` | string \| null | Reason for cancellation (if cancelled) |
| `company_id` | UUID | OlaClick company ID |
| `country_code` | string | ISO 3166-1 alpha-2 |
| `timezone` | string | IANA timezone |
| `currency` | string | ISO 4217 (BRL, MXN, COP, ARS) |
| `client_id` | UUID | Client ID |
| `address_id` | UUID | Address ID |
| `payment_status` | string | `paid` or `pending` |
| `combos_price` | integer | Sum of all combo prices (cents) |
| `combos_original_price` | integer | Original combo prices before discounts (cents) |
| `combos_cost` | integer | Cost of all combos (cents) |
| `delivery_price` | integer | Delivery fee charged to client (cents) |
| `delivery_cost` | integer | Delivery cost to the restaurant (cents) |
| `packaging_price` | integer | Packaging fee (cents) |
| `service_fee` | integer | Service fee amount (cents) |
| `service_fee_price` | integer | Service fee price (cents) |
| `service_fee_description` | string \| null | Service fee description |
| `service_fee_type` | string | Service fee type |
| `total_discounts` | integer | Total discounts applied (cents) |
| `total_tips` | integer | Total tips (cents) |
| `total_paid` | integer | Total amount paid (cents) |
| `total_payment_fee` | integer | Total payment fees (cents) |
| `total_usd` | integer | Total in USD (cents) |
| `total` | integer | Final total (cents) |
| `electronic_invoice` | null | Electronic invoice data |
| `rider` | null | Rider information |
| `rider_was_recently_created` | null | Rider creation flag |
| `previous_rider_id` | null | Previous rider ID |
| `table` | null | Table information (dine-in) |
| `table_id` | null | Table ID |
| `owner_id` | null | Owner ID |
| `order_uuid` | null | Legacy order UUID |
| `client_ticket_printed_at` | null | Ticket print timestamp |
| `utm_campaign` | null | UTM campaign |
| `utm_source` | null | UTM source |
| `pending_at` | ISO 8601 | When order entered pending state |
| `preparing_at` | ISO 8601 | When preparation started |
| `prepared_at` | ISO 8601 \| null | When preparation finished |
| `closed_at` | ISO 8601 | When the order was completed |
| `created_at` | ISO 8601 | When the order was created |
| `updated_at` | ISO 8601 | Last update timestamp |

### Client

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Client ID |
| `name` | string | Customer name |
| `email` | string \| null | Customer email |
| `phone_number` | string | Customer phone |
| `country_calling_code` | string | Country calling code (e.g. `+55`) |
| `source` | string | Client source |
| `turbo_sales_unsubscribed` | boolean | Turbo sales opt-out flag |

### Address

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Address ID |
| `address` | string | Full address |
| `complement` | string \| null | Apartment, floor, etc. |
| `reference` | string \| null | Address reference |
| `area_id` | string \| null | Area ID |
| `area_name` | string \| null | Area name |
| `latitude` | number \| null | Latitude |
| `longitude` | number \| null | Longitude |
| `type` | string | `delivery` or `fiscal` |

### Combo (Product)

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Combo line item ID |
| `product_id` | string | Product ID |
| `product_name` | string | Product name |
| `product_category_name` | string | Product category |
| `variant_id` | string | Variant ID |
| `variant_name` | string \| null | Variant/size name |
| `variant_price` | integer | Unit price (cents) |
| `variant_original_price` | integer | Original unit price (cents) |
| `variant_cost` | integer | Unit cost (cents) |
| `variant_packaging_price` | integer | Packaging price per unit (cents) |
| `combo_price` | integer | Total line price (cents) |
| `combo_original_price` | integer | Original total line price (cents) |
| `combo_cost` | integer | Total line cost (cents) |
| `modifiers_price` | integer | Total modifiers price (cents) |
| `quantity` | integer | Quantity ordered |
| `sku` | string \| null | Product SKU |
| `comment` | string \| null | Item-level comment |
| `canceled_at` | ISO 8601 \| null | Cancellation timestamp |
| `in_kitchen_at` | ISO 8601 | When sent to kitchen |
| `kitchen_id` | string | Kitchen ID |
| `kitchen` | object | Kitchen details |
| `modifiers` | array | Product modifiers/extras |
| `created_at` | ISO 8601 | Creation timestamp |
| `updated_at` | ISO 8601 | Last update timestamp |

### Kitchen

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Kitchen ID |
| `name` | string | Kitchen name |
| `default` | boolean | Whether it's the default kitchen |

### Modifier

| Field | Type | Description |
|-------|------|-------------|
| `modifier_id` | string \| null | Modifier ID |
| `name` | string | Modifier name |
| `category_name` | string \| null | Modifier category |
| `price` | integer | Modifier price (cents) |
| `original_price` | integer | Original modifier price (cents) |
| `quantity` | integer | Quantity |
| `cost` | integer | Modifier cost (cents) |

### Discount

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Discount ID |
| `value` | integer | Discount amount (cents) |
| `type` | string | `fixed` or `percentage` |
| `modality` | string | `coupon`, `promotion`, etc. |
| `description` | string | Discount description |

### MetaData

| Field | Type | Description |
|-------|------|-------------|
| `assigned_payment` | object | Payment intent assigned to the order |

### AssignedPayment (meta_data.assigned_payment)

| Field | Type | Description |
|-------|------|-------------|
| `payment_method_id` | UUID | Payment method ID |
| `payment_method_code` | string | Payment method code |
| `payment_method_description` | string \| undefined | Payment method description |
| `received_amount` | integer | Amount received (cents) |
| `fee_amount` | integer \| undefined | Fee amount (cents) |
| `tip_type` | string \| undefined | Tip type |
| `tip_value` | integer \| undefined | Tip value (cents) |
| `bill_amount` | integer \| undefined | Bill amount (cents) |

### Payment

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Payment ID |
| `payment_method_id` | string | Payment method ID |
| `payment_method` | object | Payment method details |
| `received_amount` | integer | Amount received (cents) |
| `tip_amount` | integer | Tip amount (cents) |
| `fee_amount` | integer \| null | Fee amount (cents) |
| `bill_amount` | integer | Total billed amount (cents) |
| `olapay_transaction_id` | string \| null | OlaPay transaction ID |
| `canceled_at` | ISO 8601 \| null | Cancellation timestamp |
| `created_at` | ISO 8601 | Creation timestamp |
| `updated_at` | ISO 8601 | Last update timestamp |

### PaymentMethod

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Payment method ID |
| `code` | string | Payment method code (e.g. `RAPPI_PAY`, `IFOOD_CASH`) |

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

This error is returned when the order exists but does not belong to a company integrated with your partner.

## Example with cURL

```bash
curl -X GET https://api.olaclick.app/ms-olaclickhub/connectors/v1/orders/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."
```
