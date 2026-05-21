---
sidebar_position: 4
title: Receive Orders
---

# Receive Orders

Once an integration is active, OlaClick sends order notifications to the provider's webhook URL for invoice emission.

## How It Works

1. A client's order is completed in OlaClick
2. OlaClick sends the order ID and metadata to your webhook URL
3. You respond with `200 OK` confirming receipt
4. You fetch the full order data using the [Orders API](/orders/get-order)
5. You process the order and emit the invoice
6. You notify OlaClick when the invoice is issued (see [Notify Invoice](/fiscal-notes/notify-invoice))

## Your Webhook Endpoint

OlaClick will make a POST request to the webhook URL you provided during integration creation.

```http
POST {your_webhook_url}
Content-Type: application/json
X-OlaClick-Signature: sha256={hmac_signature}
X-OlaClick-Request-Id: {uuid}
X-OlaClick-Timestamp: {iso8601}
```

## Request Body

The body contains the order reference and metadata needed to fetch the full order:

```json
{
  "event": "order.invoice_requested",
  "invoice_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "order_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "company_id": "550e8400-e29b-41d4-a716-446655440000",
  "country_code": "BR",
  "currency": "BRL",
  "timezone": "America/Sao_Paulo"
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `order.invoice_requested` |
| `invoice_id` | UUID | Unique ID for this invoice request (use for idempotency) |
| `order_id` | UUID | The order ID — use this to fetch the full order via the [Orders API](/orders/get-order) |
| `company_id` | UUID | The OlaClick company |
| `country_code` | string | ISO 3166-1 alpha-2 |
| `currency` | string | ISO 4217 (BRL, MXN, COP, ARS) |
| `timezone` | string | IANA timezone of the company |

:::info
The webhook only sends the order reference. To get the full order data (products, payments, totals, etc.), use the [`GET /ms-partners/orders/:order_id`](/orders/get-order) endpoint.
:::

## Expected Response

Respond with `200 OK` to confirm receipt:

```json
{
  "status": "received",
  "provider_reference": "ref_abc123"
}
```

If you cannot process the request, respond with an appropriate error:

```json
{
  "status": "error",
  "error_code": "INVALID_DOCUMENT",
  "message": "The customer document is not valid for this country"
}
```

## Signature Verification

The `X-OlaClick-Signature` header contains an HMAC-SHA256 of the request body using your `client_secret`:

```
X-OlaClick-Signature: sha256=<hex(HMAC-SHA256(client_secret, request_body))>
```

```javascript
const crypto = require('crypto');

function verifySignature(body, signature, clientSecret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', clientSecret)
    .update(JSON.stringify(body))
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

## Retries

If OlaClick does not receive a 2xx response, it retries with exponential backoff:

| Attempt | Wait |
|---------|------|
| 1 | 30 seconds |
| 2 | 5 minutes |
| 3 | 30 minutes |
| 4 | 2 hours |

After 4 failed attempts, the invoice is marked as `failed`.

:::tip
Implement idempotency using the `invoice_id`. If you receive the same `invoice_id` more than once, do not issue a duplicate invoice.
:::

## Timeout

OlaClick waits a maximum of **10 seconds** for your response. If your webhook does not respond in time, it is treated as a failure and will be retried.

## Complete Flow Example

```javascript
// 1. Receive webhook notification
app.post('/webhooks/olaclick', async (req, res) => {
  // Verify signature
  if (!verifySignature(req.body, req.headers['x-olaclick-signature'], CLIENT_SECRET)) {
    return res.status(401).json({ status: 'error', error_code: 'INVALID_SIGNATURE' });
  }

  const { invoice_id, order_id, company_id, country_code } = req.body;

  // 2. Fetch full order data
  const order = await fetch(`https://api.olaclick.app/ms-partners/orders/${order_id}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  }).then(r => r.json());

  // 3. Process and emit invoice
  await processInvoice(invoice_id, order, company_id, country_code);

  res.json({ status: 'received', provider_reference: invoice_id });
});
```
