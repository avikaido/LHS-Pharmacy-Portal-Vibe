import { randomUUID } from 'crypto';
import pool from '../../db.js';

export class DomainEvent {
  constructor({ eventType, payload, aggregate }) {
    this.eventId = randomUUID();
    this.eventType = eventType;
    this.occurredAt = new Date().toISOString();
    this.aggregate = aggregate || {};
    this.payload = payload || {};
    this.schemaVersion = 1;
    this.idempotencyKey = `${eventType}:${aggregate?.requestId || aggregate?.id || this.eventId}`;
  }
}

export class EventBus {
  async publish(event) { throw new Error('Not implemented'); }
  async publishBatch(events) { throw new Error('Not implemented'); }
}

export class OutboxEventBus extends EventBus {
  async publish(event) {
    await pool.query(
      `INSERT INTO integration_outbox (event_type, payload, destination, idempotency_key, status)
       VALUES ($1, $2, $3, $4, 'pending')
       ON CONFLICT (idempotency_key) DO NOTHING`,
      [event.eventType, event, 'zoho_flow', event.idempotencyKey]
    );
  }

  async publishBatch(events) {
    for (const e of events) {
      // eslint-disable-next-line no-await-in-loop
      await this.publish(e);
    }
  }
}

export const eventBus = new OutboxEventBus();

