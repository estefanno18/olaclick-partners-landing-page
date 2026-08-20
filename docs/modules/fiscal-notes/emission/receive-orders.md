---
sidebar_position: 2
title: Receive Orders
---

# Receive Orders

Once a connection is active, OlaClick sends order notifications to the connector's webhook URL for invoice emission.

## How It Works

1. A company's order is completed in OlaClick
2. OlaClick sends the order ID and metadata to your webhook URL
3. You respond with `200 OK` confirming receipt
4. You fetch the full order data using the [Orders API](/modules/fiscal-notes/emission/get-order)
5. You process the order and emit the invoice
6. You notify OlaClick when the invoice is issued (see [Notify Invoice](/modules/fiscal-notes/emission/notify-invoice))

## Your Webhook Endpoint

OlaClick makes a POST request to the webhook URL registered for this company when the connection was created.

```http
POST {your_webhook_url}
Content-Type: application/json
source: OlaClick
X-OlaClick-Signature: sha256={hmac_signature}
```

> **Related:** [Webhooks](https://developers.olaclick.app/docs/webhooks) — General webhooks documentation in the Public API

## Request Body

The body follows the standard OlaClick webhook event format:

```json
{
  "event_type": "fiscal_notes.request",
  "event_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "merchant_id": "restaurant_042",
  "timestamp": "2026-06-20T15:30:00.000Z",
  "data": {
    "order_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "company_id": "550e8400-e29b-41d4-a716-446655440000",
    "country_code": "BR"
  }
}
```

### Envelope fields

| Field | Type | Description |
|-------|------|-------------|
| `event_type` | string | Always `fiscal_notes.request` |
| `event_id` | UUID | Unique ID for this event delivery (use for idempotency) |
| `merchant_id` | string | The merchant identifier configured in the webhook |
| `timestamp` | ISO 8601 | When the event was produced |

### Data fields

| Field | Type | Description |
|-------|------|-------------|
| `data.invoice_id` | UUID | Unique ID for this invoice request (use when [notifying the result](/modules/fiscal-notes/emission/notify-invoice)) |
| `data.order_id` | UUID | The order ID — use this to fetch the full order via [`GET /v1/orders/:id`](https://developers.olaclick.app/docs/api/orders-controller-get-order) |
| `data.company_id` | UUID | The OlaClick company |
| `data.country_code` | string | Company country code (e.g. `BR`, `MX`, `CO`) |

:::info
The webhook only sends the order reference inside `data`. To get the full order data (products, totals, etc.), use the [`GET /v1/orders/:id`](https://developers.olaclick.app/docs/api/orders-controller-get-order) endpoint with `data.order_id`.
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

The `X-OlaClick-Signature` header contains an HMAC-SHA256 of the raw request body using your `client_secret`:

```
X-OlaClick-Signature: sha256=<hex(HMAC-SHA256(client_secret, raw_request_body))>
```

```javascript
const crypto = require('crypto');

function verifySignature(rawBody, signature, clientSecret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', clientSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

> **Important:** Always use the raw request body string, not a re-serialized version of the parsed JSON.

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
Implement idempotency using `event_id` (for deduplication) and `data.invoice_id` (to avoid duplicate invoices).
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

  const { event_id, data } = req.body;
  const { invoice_id, order_id, company_id, country_code } = data;

  // 2. Get access token for this company
  const token = await getAccessToken(company_id);

  // 3. Fetch full order data
  const order = await fetch(`https://public-api.olaclick.app/v1/orders/${order_id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());

  // 4. Process and emit invoice
  await processInvoice(invoice_id, order, company_id, country_code);

  res.json({ status: 'received', provider_reference: invoice_id });
});
```
