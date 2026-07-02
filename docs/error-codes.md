---
sidebar_position: 9
title: Error Codes
---

# Error Codes

Complete reference of error codes that the OlaClick API can return.

## Authentication Errors

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| 401 | `invalid_client` | The credentials (`client_id`/`client_secret`) are not valid, or the `company_id` is not connected to your connector |
| 401 | `TOKEN_EXPIRED` | The access token has expired. Request a new one via `POST /oauth/token` |
| 401 | `TOKEN_INVALID` | The provided token is malformed or has been revoked |
| 403 | `INSUFFICIENT_SCOPE` | The access token does not have the required scope for this endpoint |

## Validation Errors

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| 400 | `VALIDATION_ERROR` | Generic validation error. Check the `message` field for details |
| 400 | `INVALID_UUID` | The provided ID is not a valid UUID |
| 400 | `INVALID_STATUS` | The provided `status` is not an allowed value |
| 400 | `MISSING_REQUIRED_FIELD` | A required field is missing from the body |

## Business Errors

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| 403 | `ACCESS_DENIED` | You do not have access to this resource |
| 404 | `COMPANY_DOES_NOT_EXIST` | The company with the provided `company_id` does not exist in OlaClick |
| 404 | `ORDER_NOT_FOUND` | The order with the provided ID does not exist |
| 404 | `INVOICE_NOT_FOUND` | The invoice with the provided ID does not exist |
| 409 | `COMPANY_ALREADY_INTEGRATED` | The company already has an active integration with this provider |
| 409 | `INVOICE_ALREADY_NOTIFIED` | An invoice has already been registered for this invoice_id |
| 422 | `COMPANY_NOT_ELIGIBLE` | The company is not eligible for integration (invalid plan, unsupported country, or suspended) |

## Server Errors

| HTTP Code | Error Code | Description |
|-----------|-----------|-------------|
| 429 | `RATE_LIMIT_EXCEEDED` | Request limit exceeded. Wait before retrying |
| 500 | `INTERNAL_ERROR` | Internal server error. Contact support if it persists |
| 503 | `SERVICE_UNAVAILABLE` | The service is temporarily unavailable |

## Error Format

All errors follow the same format:

```json
{
  "statusCode": 404,
  "error": "ORDER_NOT_FOUND",
  "message": "The order with the provided ID does not exist",
  "timestamp": "2025-05-11T14:30:00.000Z"
}
```

## Rate Limiting

The API has a limit of **100 requests per minute** per connector. If you exceed this limit, you will receive a `429` error:

```json
{
  "statusCode": 429,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "You have exceeded the request limit. Try again in 60 seconds",
  "retry_after": 60
}
```

:::tip
Implement an exponential backoff mechanism to handle 429 and 5xx errors automatically.
:::
