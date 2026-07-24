const API = 'https://www.khanbank.com/api/back/rates';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function today() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export function buildUrl(date = today()) {
  if (!DATE_RE.test(date)) {
    throw new Error(`Invalid date "${date}", expected YYYY-MM-DD`);
  }
  return `${API}?date=${date}`;
}

export function pick(list, code) {
  const row = list.find((item) => item?.currency === code);
  const buy = row?.buyRate;
  const sell = row?.sellRate;
  if (!Number.isFinite(buy) || !Number.isFinite(sell)) {
    throw new Error(`Khan Bank response is missing ${code}`);
  }
  return { buy, sell };
}

export async function getRates(date) {
  const url = buildUrl(date);
  const requested = new URL(url).searchParams.get('date');

  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  } catch (err) {
    throw new Error(`Khan Bank request failed: ${err.message}`);
  }

  if (!res.ok) {
    throw new Error(`Khan Bank HTTP ${res.status}`);
  }

  let body;
  try {
    body = await res.text();
  } catch (err) {
    throw new Error(`Khan Bank request failed: ${err.message}`);
  }

  // A throttled response arrives as HTTP 200 with an empty body,
  // so res.ok is not sufficient to conclude success.
  let list;
  try {
    list = JSON.parse(body);
  } catch {
    throw new Error('Khan Bank returned an invalid response');
  }

  if (!Array.isArray(list) || list.length === 0) {
    throw new Error(`Khan Bank has no rates for ${requested}`);
  }

  return {
    date: requested,
    usd: pick(list, 'USD'),
    cny: pick(list, 'CNY'),
  };
}