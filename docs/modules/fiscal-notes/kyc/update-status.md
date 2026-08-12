---
sidebar_position: 1
title: Update Connection Status
---

# Update Connection Status

The **connection** is the object that manages the KYC lifecycle between a company and your connector. When a company activates the addon, OlaClick creates the connection with status `pending`.

:::warning[Important]
While the connection is not `active`, **you cannot generate access tokens for that company**. This means you won't be able to query any company data (orders, clients, menu, etc.) until the KYC process is complete and you update the connection to `active`.
:::

This endpoint requires your **connector token** (not a company-scoped token). Authenticate using your `client_id` and `client_secret` without a `company_id` to obtain a connector-level token.

Once you validate (or reject) the company's documents, call this endpoint to transition the connection status.

## Endpoint

> **Endpoint:** `PATCH /v1/connections/{connection_id}`

```http
PATCH https://public-api.olaclick.app/v1/connections/{connection_id}
Authorization: Bearer {connector_token}
Content-Type: application/json
```

**Scope required:** `conections:write`

**Authentication:** This endpoint uses your connector-level token (obtained without `company_id`). See the [API Reference](https://developers.olaclick.app/docs/api) for details.

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `connection_id` | `string (UUID)` | The connection ID received in the [binding event](/#2-receive-binding-events-from-companies) |

## Body

```json
{
  "status": "active",
  "reason": "KYC validated successfully"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `string` | Yes | Connection status. Possible values: `active`, `rejected`, `pending_review` |
| `reason` | `string` | No | Description or reason for the status. Required when `status` is `rejected`. |

## Responses

### 200 OK — Connection activated

```json
{
  "statusCode": 200,
  "message": "Connection activated successfully",
  "data": {
    "connection_id": "660e8400-e29b-41d4-a716-446655440001",
    "company_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "activated_at": "2025-05-11T14:30:00.000Z"
  }
}
```

### 400 Bad Request — Validation failed

```json
{
  "statusCode": 400,
  "error": "VALIDATION_ERROR",
  "message": "connection_id must be a valid UUID"
}
```

### 401 Unauthorized — Invalid token

```json
{
  "statusCode": 401,
  "error": "INVALID_CREDENTIALS",
  "message": "Invalid or expired token"
}
```

### 404 Not Found — Connection does not exist

```json
{
  "statusCode": 404,
  "error": "CONNECTION_NOT_FOUND",
  "message": "The connection with the provided ID does not exist"
}
```

### 409 Conflict — Already active

```json
{
  "statusCode": 409,
  "error": "CONNECTION_ALREADY_ACTIVE",
  "message": "The connection is already active"
}
```

### 422 Unprocessable Entity — Company not eligible

```json
{
  "statusCode": 422,
  "error": "COMPANY_NOT_ELIGIBLE",
  "message": "The company is not eligible for this integration",
  "details": {
    "reason": "INVALID_PLAN"
  }
}
```

This error is returned when the company exists but does not meet the requirements for integration. Possible reasons:

| Reason (`details.reason`) | Description |
|---------------------------|-------------|
| `INVALID_PLAN` | The company does not have an active plan that includes electronic invoicing |
| `COUNTRY_MISMATCH` | The company does not belong to a country supported by this connector |
| `SUSPENDED` | The company is suspended and cannot activate new integrations |

## Validations

- `connection_id` must be a valid UUID v4
- `status` must be one of: `active`, `rejected`, `pending_review`
- The connection must exist and belong to your connector
- The connection must not already be `active` (unless transitioning to `rejected`)
- The company must have an active plan that includes electronic invoicing
- The company must belong to a country supported by the connector

## Example with cURL

```bash
curl -X PATCH https://public-api.olaclick.app/v1/connections/660e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer {connector_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "active",
    "reason": "KYC validated successfully"
  }'
```

## Error Simulation (Staging)

In the staging environment, you can force the API to return a specific error to test error handling in your integration. To do this, include the `error_code` field in the request body with the error code you want to simulate.

### Request with simulated error

```json
{
  "status": "active",
  "error_code": "COMPANY_NOT_ELIGIBLE"
}
```

### Available codes for simulation

| `error_code` | Simulated response |
|--------------|-------------------|
| `CONNECTION_NOT_FOUND` | 404 — Connection does not exist |
| `CONNECTION_ALREADY_ACTIVE` | 409 — Already has an active connection |
| `COMPANY_NOT_ELIGIBLE` | 422 — Company not eligible (invalid plan) |
| `INVALID_CREDENTIALS` | 401 — Invalid token |
| `VALIDATION_ERROR` | 400 — Validation error |
| `RATE_LIMIT_EXCEEDED` | 429 — Rate limit exceeded |
| `INTERNAL_ERROR` | 500 — Internal server error |

:::info
The `error_code` field only works in the staging environment. It will be ignored in production.
:::
