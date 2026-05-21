---
sidebar_position: 3
title: Update KYC Status
---

# Update KYC Status

Once the partner has completed the KYC validation for a company, it must notify OlaClick to update the KYC state. OlaClick creates the KYC record as `pending` when the company accesses the iframe. Your role is to update it to `active` (approved) or `rejected`.

## Endpoint

```http
POST https://api.olaclick.app/ms-partners/fiscal-notes/kyc/update
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Scope required:** `fiscal_notes.integration.activate`

## Body

```json
{
  "company_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "active",
  "description": "KYC validated successfully"
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company_id` | `string (UUID)` | ✅ | Company ID in OlaClick. Must be a valid UUID. |
| `status` | `string` | ✅ | Integration status. Possible values: `active`, `rejected`, `pending_review` |
| `description` | `string` | ❌ | Description or reason for the status. Required when `status` is `rejected`. |

## Responses

### 201 Created — Integration activated

```json
{
  "statusCode": 201,
  "message": "Integration activated successfully",
  "data": {
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
  "message": "company_id must be a valid UUID"
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

### 404 Not Found — Company does not exist

```json
{
  "statusCode": 404,
  "error": "COMPANY_DOES_NOT_EXIST",
  "message": "The company with the provided ID does not exist in OlaClick"
}
```

### 409 Conflict — Already integrated

```json
{
  "statusCode": 409,
  "error": "COMPANY_ALREADY_INTEGRATED",
  "message": "The company already has an active integration with this provider"
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
| `COUNTRY_MISMATCH` | The company does not belong to a country supported by this provider |
| `SUSPENDED` | The company is suspended and cannot activate new integrations |

## Validations

- `company_id` must be a valid UUID v4
- `status` must be one of: `active`, `rejected`, `pending_review`
- The company must exist in OlaClick
- The company must not have a previous active integration with the same provider
- The company must have an active plan that includes electronic invoicing
- The company must belong to a country supported by the provider

## Example with cURL

```bash
curl -X POST https://api.olaclick.app/ms-partners/fiscal-notes/kyc/update \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "550e8400-e29b-41d4-a716-446655440000",
    "status": "active",
    "description": "KYC validated successfully"
  }'
```

## Error Simulation (Staging)

In the staging environment, you can force the API to return a specific error to test error handling in your integration. To do this, include the `error_code` field in the request body with the error code you want to simulate.

### Request with simulated error

```json
{
  "company_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "active",
  "error_code": "COMPANY_NOT_ELIGIBLE"
}
```

### Available codes for simulation

| `error_code` | Simulated response |
|--------------|-------------------|
| `COMPANY_DOES_NOT_EXIST` | 404 — Company does not exist |
| `COMPANY_ALREADY_INTEGRATED` | 409 — Already has an active integration |
| `COMPANY_NOT_ELIGIBLE` | 422 — Company not eligible (invalid plan) |
| `INVALID_CREDENTIALS` | 401 — Invalid token |
| `VALIDATION_ERROR` | 400 — Validation error |
| `RATE_LIMIT_EXCEEDED` | 429 — Rate limit exceeded |
| `INTERNAL_ERROR` | 500 — Internal server error |

:::info
The `error_code` field only works in the staging environment. It will be ignored in production.
:::
