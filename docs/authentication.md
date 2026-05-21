---
sidebar_position: 3
title: Authentication
---

# Authentication

All OlaClick API endpoints require authentication via a Bearer token. The authentication mechanism follows the **OAuth 2.0 Client Credentials Grant** standard ([RFC 6749 §4.4](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)).

## Get Token

### Request

```http
POST https://api.olaclick.app/ms-partners/oauth/token
Content-Type: application/x-www-form-urlencoded
```

### Body (form-urlencoded)

```
grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `grant_type` | `string` | ✅ | Always `client_credentials` |
| `client_id` | `string` | ✅ | Your application's unique identifier |
| `client_secret` | `string` | ✅ | Secret key for authentication |

### Response — 200 OK

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | `string` | JWT token to authenticate requests |
| `token_type` | `string` | Always `Bearer` |
| `expires_in` | `number` | Seconds until the token expires |

### Response — 401 Unauthorized

```json
{
  "error": "invalid_client",
  "error_description": "The provided credentials are not valid"
}
```

## Using the Token

Include the token in the `Authorization` header of all requests:

```http
GET https://api.olaclick.app/ms-partners/orders/{order_id}
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Example with cURL

```bash
# Get token
curl -X POST https://api.olaclick.app/ms-partners/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret"

# Use token in a request
curl -X GET https://api.olaclick.app/ms-partners/orders/f47ac10b-58cc-4372-a567-0e02b2c3d479 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."
```

## Token Renewal

:::warning
The token has a limited duration (`expires_in` indicates the validity in seconds). You must request a new token before it expires. There is no `refresh_token` — simply call the `/oauth/token` endpoint again.
:::

**Recommendation:** Cache the token and renew it when ~60 seconds remain before expiration, or when you receive a `401` on any endpoint.

```javascript
// Token management example
let token = null;
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();
  if (token && now < tokenExpiresAt - 60000) {
    return token;
  }

  const response = await fetch('https://api.olaclick.app/ms-partners/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET'
  });

  const data = await response.json();
  token = data.access_token;
  tokenExpiresAt = now + (data.expires_in * 1000);
  return token;
}
```

## Credentials

To obtain your provider credentials, contact the OlaClick integrations team. You will receive:

| Field | Description |
|-------|-------------|
| `client_id` | Your application's unique identifier |
| `client_secret` | Secret key for authentication |

:::danger
Never expose your `client_secret` in client-side code or public repositories. Store it in environment variables or a secrets manager.
:::
