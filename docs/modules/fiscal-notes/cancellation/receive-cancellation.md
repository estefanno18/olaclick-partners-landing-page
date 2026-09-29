---
sidebar_position: 1
title: Receive Cancellation
---

# Receive Cancellation

When a company cancels a previously issued invoice, OlaClick notifies your connector's webhook URL so you can cancel the fiscal document with the fiscal authority.

## How It Works

1. A company cancels a completed invoice from OlaClick (the invoice moves to `CANCELLING`)
2. OlaClick sends a cancellation event to your webhook URL
3. You respond with `200 OK` confirming receipt
4. You cancel the fiscal document with the fiscal authority
5. You notify OlaClick with the cancellation result (see [Confirm Cancellation](/modules/fiscal-notes/cancellation/confirm-cancellation))

## Your Webhook Endpoint

OlaClick makes a POST request to the same webhook URL registered for this company when the connection was created.

```http
POST {your_webhook_url}
Content-Type: application/json
source: OlaClick
X-OlaClick-Signature: sha256={hmac_signature}
```

> **Related:** [Webhooks](https://developers.olaclick.app/docs/webhooks) — General webhooks documentation in the Public API

## Request Body

The body follows the standard OlaClick webhook event format. It is identical to the emission event ([Receive Orders](/modules/fiscal-notes/emission/receive-orders)) except for the `event_type`:

```json
{
  "event_type": "FISCAL_NOTES_CANCELATION_REQUEST",
  "event_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "merchant_id": "restaurant_042",
  "timestamp": "2026-06-20T15:30:00.000Z",
  "data": {
    "company_id": "550e8400-e29b-41d4-a716-446655440000",
    "order_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "country_code": "BR",
    "electronic_invoice_id": 1
  }
}
```

### Envelope fields

| Field | Type | Description |
|-------|------|-------------|
| `event_type` | string | Always `FISCAL_NOTES_CANCELATION_REQUEST` |
| `event_id` | UUID | Unique ID for this event delivery (use for idempotency) |
| `merchant_id` | string | The merchant identifier configured in the webhook |
| `timestamp` | ISO 8601 | When the event was produced |

### Data fields

| Field | Type | Description |
|-------|------|-------------|
| `data.company_id` | UUID | The OlaClick company |
| `data.order_id` | UUID | The order ID whose invoice is being cancelled — use it to confirm the cancellation |
| `data.country_code` | string | Company country code (e.g. `BR`, `MX`, `CO`) |
| `data.electronic_invoice_id` | number | Internal electronic invoice ID |

:::info
If you need the full order or invoice data to process the cancellation, use the [`GET /v1/orders/:id`](https://developers.olaclick.app/docs/api/orders-controller-get-order) endpoint with `data.order_id`.
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
  "message": "The invoice could not be found at the fiscal authority"
}
```

## Signature Verification

The `X-OlaClick-Signature` header contains an HMAC-SHA256 of the raw request body using your `client_secret`, exactly as in the emission flow:

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

:::tip
Implement idempotency using `event_id` to deduplicate webhook deliveries. The same `event_id` may be delivered more than once.
:::

## Timeout

OlaClick waits a maximum of **10 seconds** for your response. If your webhook does not respond in time, it is treated as a failure and will be retried.

## Complete Flow Example

```javascript
// 1. Receive cancellation webhook notification
app.post('/webhooks/olaclick', async (req, res) => {
  // Verify signature
  if (!verifySignature(req.body, req.headers['x-olaclick-signature'], CLIENT_SECRET)) {
    return res.status(401).json({ status: 'error', error_code: 'INVALID_SIGNATURE' });
  }

  const { event_type, event_id, data } = req.body;

  // Route cancellation events
  if (event_type === 'FISCAL_NOTES_CANCELATION_REQUEST') {
    const { order_id, company_id, country_code } = data;

    // 2. Get access token for this company
    const token = await getAccessToken(company_id);

    // 3. Cancel the fiscal document with the fiscal authority
    const result = await cancelInvoice(order_id, company_id, country_code);

    // 4. Notify OlaClick with the cancellation result (see Confirm Cancellation)
    await confirmCancellation(order_id, token, result);

    return res.json({ status: 'received', provider_reference: order_id });
  }

  // ... handle FISCAL_NOTES_REQUEST and other events
});
```

## Next Step

After cancelling the fiscal document, notify OlaClick with the result.

→ See [Confirm Cancellation](/modules/fiscal-notes/cancellation/confirm-cancellation)
