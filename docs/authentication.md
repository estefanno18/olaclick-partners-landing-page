---
sidebar_position: 3
title: Authentication
---

# Authentication

All OlaClick API endpoints require authentication via an **access token** obtained through the OAuth 2.0 client credentials flow.

## Base URL

| Environment | URL |
|-------------|-----|
| **Production** | `https://public-api.olaclick.app` |
| **Staging** | `https://api.olaclick-stg.click` |

## How Authentication Works

1. When you register as a connector, OlaClick provides you with a `client_id` and `client_secret`
2. When a company activates your integration, OlaClick notifies you via webhook with the `company_id`
3. To make API calls for that company, you request an access token using your credentials + the `company_id`
4. You use the access token as Bearer token in all API requests for that company

:::info
You must obtain a **separate access token per company**. Each token is scoped to a single company.
:::

## Obtaining an Access Token

Request an access token by calling the token endpoint with the `client_credentials` grant type:

```http
POST https://public-api.olaclick.app/oauth/token
Content-Type: application/x-www-form-urlencoded
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `grant_type` | string | Yes | Always `client_credentials` |
| `client_id` | string | Yes | Your connector's client ID |
| `client_secret` | string | Yes | Your connector's client secret |
| `company_id` | string | Yes | The UUID of the company you want to act on behalf of |
| `scope` | string | No | Space-separated list of scopes (defaults to all allowed) |

### Example Request

```bash
curl -X POST https://public-api.olaclick.app/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=your_client_id" \
  -d "client_secret=your_client_secret" \
  -d "company_id=550e8400-e29b-41d4-a716-446655440000" \
  -d "scope=orders:read fiscal_notes:write"
```

### Response — 200 OK

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "orders:read fiscal_notes:write"
}
```

### Client Authentication Methods

You can provide `client_id` and `client_secret` in two ways:

**Option 1: Request body** (shown above)

**Option 2: HTTP Basic Auth**

```bash
curl -X POST https://public-api.olaclick.app/oauth/token \
  -u "your_client_id:your_client_secret" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "company_id=550e8400-e29b-41d4-a716-446655440000"
```

## Using the Access Token

Include the access token in the `Authorization` header as a Bearer token:

```http
GET https://public-api.olaclick.app/v1/orders/{order_id}
Authorization: Bearer {access_token}
```

### Example

```bash
curl -X GET https://public-api.olaclick.app/v1/orders/BR-1234567890 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..."
```

## Token Properties

| Property | Description |
|----------|-------------|
| Format | JWT (RS256 signed) |
| Expiration | Defined by `expires_in` (in seconds) |
| Scopes | Subset of your allowed scopes, bound to the company |
| Company | Bound to a single `company_id` |

## Scopes

Scopes determine what actions you can perform. Format: `resource:action`

| Scope | Description |
|-------|-------------|
| `orders:read` | Read order data |
| `fiscal_notes:write` | Create/notify invoice results |
| `menu:read` | Read menu data |
| `menu:write` | Write menu data |
| `clients:read` | Read client data |

:::info
The scopes available depend on the module your integration is registered for. See [Get Started](/) for available modules.
:::

## Token Refresh

When a token expires, simply request a new one using the same `POST /oauth/token` call. There is no refresh token in the client credentials flow — just issue a new access token.

:::tip
Cache your access tokens and reuse them until they expire. Request a new token only when you receive a `401` or when `expires_in` has elapsed.
:::

## Revoking a Token

If you need to revoke an access token (e.g. a security incident):

```http
POST https://public-api.olaclick.app/oauth/revoke
Content-Type: application/x-www-form-urlencoded
```

```bash
curl -X POST https://public-api.olaclick.app/oauth/revoke \
  -u "your_client_id:your_client_secret" \
  -d "token=eyJhbGciOiJSUzI1NiIs..."
```

## Error Responses

### 401 — Invalid credentials

```json
{
  "error": "invalid_client",
  "error_description": "Client authentication failed."
}
```

This occurs when `client_id` or `client_secret` are wrong, or when the `company_id` does not have an active connection with your connector.

### 401 — Expired token

```json
{
  "statusCode": 401,
  "error": "TOKEN_EXPIRED",
  "message": "The access token has expired. Request a new one."
}
```

### 403 — Insufficient scopes

```json
{
  "statusCode": 403,
  "error": "INSUFFICIENT_SCOPE",
  "message": "The access token does not have the required scope: orders:read"
}
```

## Rate Limiting

The token endpoint has its own rate limit. If you exceed it:

```json
{
  "error": "rate_limit_exceeded",
  "error_description": "Too many token requests. Try again later."
}
```

API endpoints have a limit of **100 requests per minute** per access token.

## Security Best Practices

:::danger
- Store `client_secret` securely — never expose it in client-side code or logs
- Cache access tokens — don't request a new token for every API call
- Each token is bound to one company — never reuse tokens across companies
- Rotate secrets periodically through the OlaClick integrations team
:::

## Discovery Endpoint

The OAuth server metadata is available at:

```
GET https://public-api.olaclick.app/.well-known/oauth-authorization-server
```

This returns supported grants, endpoints, and scopes per RFC 8414.
