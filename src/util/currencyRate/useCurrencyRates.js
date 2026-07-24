import { ref, computed, onMounted } from 'vue';
import { getRates } from './rates.js';

const CACHE_KEY = 'currencyRates';
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 hours

const DEFAULTS = { usdBuy: 3589, usdSell: 3594, cnyBuy: 525.3, cnySell: 535.4 };

function mid(a, b) { return (a + b) / 2; }

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch { /* storage full or unavailable */ }
}

let sharedRates = null;
let sharedPromise = null;

export function useCurrencyRates() {
  const rates = ref(sharedRates);
  const loading = ref(false);
  const error = ref(null);
  const lastUpdated = ref(null);

  const usdPerCny = computed(() => {
    if (!rates.value) return null;
    return Number((mid(rates.value.usd.buy, rates.value.usd.sell) / mid(rates.value.cny.buy, rates.value.cny.sell)).toFixed(4));
  });

  const usdRate = computed(() => mid(rates.value?.usd.buy ?? DEFAULTS.usdBuy, rates.value?.usd.sell ?? DEFAULTS.usdSell));
  const cnyRate = computed(() => {
    if (rates.value) return Number((mid(rates.value.usd.buy, rates.value.usd.sell) / mid(rates.value.cny.buy, rates.value.cny.sell)).toFixed(4));
    return DEFAULTS.cnyBuy / DEFAULTS.usdBuy;
  });

  async function fetchRates() {
    if (sharedPromise) return sharedPromise;

    loading.value = true;
    error.value = null;

    sharedPromise = getRates()
      .then((data) => {
        sharedRates = data;
        rates.value = data;
        lastUpdated.value = data.date;
        writeCache(data);
        return data;
      })
      .catch((err) => {
        error.value = err.message;
        if (!rates.value) {
          rates.value = {
            date: 'fallback',
            usd: { buy: DEFAULTS.usdBuy, sell: DEFAULTS.usdSell },
            cny: { buy: DEFAULTS.cnyBuy, sell: DEFAULTS.cnySell },
          };
          lastUpdated.value = 'default';
        }
        return rates.value;
      })
      .finally(() => {
        loading.value = false;
        sharedPromise = null;
      });

    return sharedPromise;
  }

  function refresh() {
    sharedRates = null;
    try { localStorage.removeItem(CACHE_KEY); } catch { /* noop */ }
    return fetchRates();
  }

  onMounted(() => {
    const cached = readCache();
    if (cached) {
      sharedRates = cached;
      rates.value = cached;
      lastUpdated.value = cached.date;
      return;
    }
    fetchRates();
  });

  return { rates, loading, error, lastUpdated, usdPerCny, usdRate, cnyRate, refresh };
}
