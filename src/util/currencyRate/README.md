# Khan Bank rates in Node.js

Fetches Khan Bank's USD and CNY exchange rates against Mongolian tugrug (MNT).

Copy `rates.js` into your project. It has no dependencies and needs **Node.js 18+**
(for built-in `fetch`). `rates.test.js` and this README do not need to be copied.

`rates.js` is an ES module. A project created with plain `npm init` does not set
`"type": "module"` in its `package.json`, so importing `rates.js` as-is will fail
with `SyntaxError: Cannot use import statement outside a module` on Node 18 and
20. Either add `"type": "module"` to your `package.json`, or rename the file to
`rates.mjs`.

## Usage

```js
import { getRates } from './rates.js';

const rates = await getRates();             // today
const older = await getRates('2026-07-19'); // a specific date
```

Returns:

```js
{
  date: "2026-07-24",
  usd: { buy: 3584,  sell: 3594  },
  cny: { buy: 525.3, sell: 535.4 }
}
```

## Reading the numbers

Every rate is **tugrug per one unit of foreign currency**. There is no separate
MNT field because MNT is the denominator of both numbers.

```js
const mnt = 100 * rates.usd.buy;  // $100 -> ₮358,400
```

`buy` is what the bank pays you for foreign currency; `sell` is what it charges
you. Both are the non-cash rates, which apply to transfers and card
transactions — cash rates differ and are not returned.

The `date` field echoes the date you asked for. The API returns the most recent
published rates for weekend, holiday, and future dates, so on a Sunday you get
Friday's numbers labelled with Sunday's date.

## Errors

Every failure throws. The function never returns `null` or partial data, so a
failure cannot be mistaken for a valid rate.

```js
try {
  const rates = await getRates();
} catch (err) {
  console.error(err.message);
}
```

| Message | Cause |
| --- | --- |
| `Invalid date "..."` | The date argument was not `YYYY-MM-DD` |
| `Khan Bank request failed: ...` | Network failure, or no response within 10s |
| `Khan Bank HTTP 503` | The bank returned a non-200 status |
| `Khan Bank returned an invalid response` | Empty or unparseable body — usually throttling from rapid repeated requests |
| `Khan Bank has no rates for ...` | The date predates the bank's records, or the response was not a non-empty array |
| `Khan Bank response is missing USD` | The currency was absent or its rates were unusable |

There is no caching and no retry. If you poll, cache the result yourself —
rapid repeated requests get throttled.

## Testing

```bash
node --test rates.test.js   # unit tests, no network
```

This command needs the same ESM setup described above (`"type": "module"` or
the `.mjs` rename) on Node 18 and 20. It works as-written only on Node 22.7+,
where ESM syntax is auto-detected.

The tests cover `buildUrl` and `pick`. `getRates` has no automated coverage —
verify it against the live API yourself when you wire it in.
