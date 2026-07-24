import test from 'node:test';
import assert from 'node:assert/strict';
import { buildUrl, pick } from './rates.js';

test('buildUrl uses the given date', () => {
  assert.equal(
    buildUrl('2026-07-19'),
    'https://www.khanbank.com/api/back/rates?date=2026-07-19'
  );
});

test('buildUrl defaults to today in YYYY-MM-DD form', () => {
  const url = buildUrl();
  assert.match(url, /^https:\/\/www\.khanbank\.com\/api\/back\/rates\?date=\d{4}-\d{2}-\d{2}$/);
});

test('buildUrl pads single-digit months and days', () => {
  // Frozen clock: 2026-03-05 local time.
  const RealDate = Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      if (args.length === 0) return new RealDate(2026, 2, 5, 12, 0, 0);
      return new RealDate(...args);
    }
  };
  try {
    assert.equal(
      buildUrl(),
      'https://www.khanbank.com/api/back/rates?date=2026-03-05'
    );
  } finally {
    globalThis.Date = RealDate;
  }
});

test('buildUrl rejects a malformed date', () => {
  assert.throws(() => buildUrl('19-07-2026'), /Invalid date/);
  assert.throws(() => buildUrl('2026-7-9'), /Invalid date/);
  assert.throws(() => buildUrl('not-a-date'), /Invalid date/);
});

const SAMPLE = [
  { currency: 'USD', buyRate: 3584, sellRate: 3594, cashBuyRate: 3584, cashSellRate: 3612, midRate: 3589.11 },
  { currency: 'CNY', buyRate: 525.3, sellRate: 535.4, cashBuyRate: 525.3, cashSellRate: 538, midRate: 530.13 },
];

test('pick returns non-cash buy and sell', () => {
  assert.deepEqual(pick(SAMPLE, 'USD'), { buy: 3584, sell: 3594 });
  assert.deepEqual(pick(SAMPLE, 'CNY'), { buy: 525.3, sell: 535.4 });
});

test('pick ignores cash and mid rates', () => {
  assert.deepEqual(Object.keys(pick(SAMPLE, 'USD')).sort(), ['buy', 'sell']);
});

test('pick throws when the currency is absent', () => {
  assert.throws(
    () => pick(SAMPLE, 'JPY'),
    /Khan Bank response is missing JPY/
  );
});

test('pick throws when a rate is not a finite number', () => {
  assert.throws(
    () => pick([{ currency: 'USD', buyRate: null, sellRate: 3594 }], 'USD'),
    /Khan Bank response is missing USD/
  );
  assert.throws(
    () => pick([{ currency: 'USD', buyRate: '3584', sellRate: 3594 }], 'USD'),
    /Khan Bank response is missing USD/
  );
});
