---
sidebar_position: 2
title: Confirm Cancellation
---

# Confirm Cancellation

After you cancel (or fail to cancel) a fiscal document, notify OlaClick with the result so the order's electronic invoice record is updated and leaves the transient `CANCELLING` state.

This uses the same confirmation endpoint as invoice emission — send `status` as `CANCELLED` when the cancellation succeeded, or `CANCELLED_ERROR` when it failed, together with a `message` describing the outcome.

This endpoint requires a **Company Token** (obtained by including the `company_id` in the token request).

> **API Reference:** [`PATCH /v1/fiscal-notes/confirmation`](https://developers.olaclick.app/docs/api/fiscal-notes-controller-confirm) — Full endpoint documentation
