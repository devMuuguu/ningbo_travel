<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Зардал & Төсөв</div>
      <h2 class="page-title">Тээвэр ба Нийт Зардал</h2>
      <p class="text-sm text-slate-400 mb-6">
        Баталгаажсан тээврийн болон бусад төлөвлөгөөт зардлын задаргаа (4 хүний
        дүнгээр).
      </p>
    </div>

    <!-- Currency Converter Component -->
    <div
      class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-4 sm:p-5 space-y-4"
    >
      <div
        class="flex items-center justify-between border-b border-[#2f3f58] pb-3"
      >
        <div
          class="flex items-center gap-2 font-bold text-slate-100 text-sm sm:text-base"
        >
          <Calculator class="w-4 h-4 text-amber-400" />
          <span>Валют хөрвүүлэгч (USD / MNT / CNY)</span>
        </div>
        <span v-if="loading" class="text-xs font-mono text-slate-500 animate-pulse"
          >Ачаалж байна...</span
        >
        <span v-else-if="error" class="text-xs font-mono text-red-400" :title="error"
          >Алдаа · Үндсэн ханш ашиглаж байна</span
        >
        <span v-else class="text-xs font-mono text-slate-400"
          >Ханш: $1 ≈ ₮{{ Math.round(usdRate) }} ≈ ¥{{ cnyRate }} · {{ lastUpdated }}</span
        >
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="block text-xs text-slate-400 font-mono mb-1"
            >Доллар ($ USD)</label
          >
          <input
            v-model.number="usdAmount"
            type="number"
            @input="convertFromUsd"
            class="w-full bg-[#131b29] border border-[#2f3f58] rounded-lg px-3 py-2 text-sm text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-400 font-mono mb-1"
            >Төгрөг (₮ MNT)</label
          >
          <input
            v-model.number="mntAmount"
            type="number"
            @input="convertFromMnt"
            class="w-full bg-[#131b29] border border-[#2f3f58] rounded-lg px-3 py-2 text-sm text-slate-200 font-mono font-bold focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-400 font-mono mb-1"
            >Юань (¥ CNY)</label
          >
          <input
            v-model.number="cnyAmount"
            type="number"
            @input="convertFromCny"
            class="w-full bg-[#131b29] border border-[#2f3f58] rounded-lg px-3 py-2 text-sm text-slate-200 font-mono font-bold focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>
    </div>

    <!-- Official Transport Receipt Table -->
    <div
      class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden"
    >
      <div
        class="bg-[#26344a] p-4 flex items-center justify-between border-b border-[#2f3f58]"
      >
        <div>
          <span class="text-sm font-bold text-slate-100 block"
            >Тээврийн зардлын баримт (4 зорчигч)</span
          >
          <span class="text-xs text-slate-400 font-mono"
            >2026.07.29 – 08.03</span
          >
        </div>
        <span
          class="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        >
          Trip.com баталгаажсан
        </span>
      </div>

      <div class="divide-y divide-[#2f3f58]">
        <!-- Item 1: UB Flight -->
        <div
          class="p-4 flex items-center justify-between gap-4 bg-[#131b29]/40 opacity-75"
        >
          <div>
            <div class="text-sm font-semibold text-slate-200">
              УБ ↔ Beijing нислэг (4 хүн)
            </div>
            <div class="text-xs text-slate-400">
              захиалсан · тусдаа тооцоотой
            </div>
          </div>
          <div class="text-sm font-mono text-slate-400 font-bold">—</div>
        </div>

        <!-- Item 2: G3 Train -->
        <div class="p-4 flex items-center justify-between gap-4">
          <div>
            <div
              class="text-sm font-semibold text-slate-100 flex items-center gap-2"
            >
              <span>Beijing South → Shanghai · G3</span>
              <span class="pill go text-[10px]">Захиалсан</span>
            </div>
            <div class="text-xs text-slate-400">
              06:52–11:33 · $106.39/хүн × 4
            </div>
          </div>
          <div class="text-sm font-mono text-emerald-400 font-bold">
            $425.56
          </div>
        </div>

        <!-- Item 3: D2287 Train -->
        <div class="p-4 flex items-center justify-between gap-4">
          <div>
            <div
              class="text-sm font-semibold text-slate-100 flex items-center gap-2"
            >
              <span>Shanghai South → Ningbo · D2287</span>
              <span class="pill go text-[10px]">Захиалсан</span>
            </div>
            <div class="text-xs text-slate-400">
              06:52–09:16 · $22.48/хүн (+ fee $12) × 4
            </div>
          </div>
          <div class="text-sm font-mono text-emerald-400 font-bold">$89.92</div>
        </div>

        <!-- Item 4: CA1854 Flight -->
        <div class="p-4 flex items-center justify-between gap-4">
          <div>
            <div
              class="text-sm font-semibold text-slate-100 flex items-center gap-2"
            >
              <span>Ningbo → Beijing · CA1854</span>
              <span class="pill go text-[10px]">Захиалсан</span>
            </div>
            <div class="text-xs text-slate-400">
              09:25–11:55 · $174.10/хүн × 4
            </div>
          </div>
          <div class="text-sm font-mono text-emerald-400 font-bold">
            $696.40
          </div>
        </div>

        <!-- Subtotal Major Transport -->
        <div
          class="p-4 bg-[#26344a]/80 flex items-center justify-between font-bold border-t border-b border-[#2f3f58]"
        >
          <span class="text-sm text-slate-100"
            >Баталгаажсан том тээврийн нийт</span
          >
          <span class="text-base font-mono text-amber-400">$1,211.88</span>
        </div>

        <!-- Extra estimations -->
        <div
          class="p-4 flex items-center justify-between gap-4 bg-[#131b29]/30"
        >
          <div>
            <div class="text-sm font-medium text-slate-300">
              Онгоцны буудал → Beijing South такси/Didi
            </div>
            <div class="text-xs text-slate-400">
              07.30 өглөө эрт ~05:20 · газар дээр нь
            </div>
          </div>
          <div class="text-sm font-mono text-slate-300">~$25–40</div>
        </div>

        <div
          class="p-4 flex items-center justify-between gap-4 bg-[#131b29]/30"
        >
          <div>
            <div class="text-sm font-medium text-slate-300">
              Beijing Буудлын шөнөжилт / Унд хоол
            </div>
            <div class="text-xs text-slate-400">07.29 · зочид буудалгүй</div>
          </div>
          <div class="text-sm font-mono text-slate-300">~$0–20</div>
        </div>

        <div
          class="p-4 flex items-center justify-between gap-4 bg-[#131b29]/30"
        >
          <div>
            <div class="text-sm font-medium text-slate-300">
              Shanghai + Ningbo Зочид буудлууд
            </div>
            <div class="text-xs text-slate-400">
              07.30–08.03 (4 шөнө захиалсан)
            </div>
          </div>
          <div class="text-sm font-mono text-emerald-400 font-bold">
            Баталгаажсан
          </div>
        </div>

        <div
          class="p-4 flex items-center justify-between gap-4 bg-[#131b29]/30"
        >
          <div>
            <div class="text-sm font-medium text-slate-300">
              VNL Финалын тоглолтын тийз ×4
            </div>
            <div class="text-xs text-slate-400">08.02 · Beilun Gymnasium</div>
          </div>
          <div class="text-sm font-mono text-amber-400">Баримтнаас нөхөх</div>
        </div>

        <!-- Grand Total -->
        <div
          class="p-5 bg-linear-to-r from-amber-500/20 via-blue-500/10 to-emerald-500/20 flex items-center justify-between"
        >
          <div>
            <div class="text-base font-bold text-slate-100">
              Нийт Багцаа Зардал (4 хүн)
            </div>
            <div class="text-xs text-slate-300">
              Нэг хүнд ≈ $310 – 320 доллар
            </div>
          </div>
          <div
            class="text-xl sm:text-2xl font-bold font-['Oswald'] text-amber-400"
          >
            ~$1,235 – 1,270
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Calculator } from "lucide-vue-next";
import { useCurrencyRates } from "../util/currencyRate/useCurrencyRates.js";

const { usdRate, cnyRate, loading, error, lastUpdated, refresh } = useCurrencyRates();

const usdAmount = ref(1211.88);
const mntAmount = ref(Math.round(1211.88 * 3589));
const cnyAmount = ref(Number((1211.88 * 0.15).toFixed(2)));

function convertFromUsd() {
  if (!usdAmount.value) {
    mntAmount.value = 0;
    cnyAmount.value = 0;
    return;
  }
  mntAmount.value = Math.round(usdAmount.value * usdRate.value);
  cnyAmount.value = Number((usdAmount.value * cnyRate.value).toFixed(2));
}

function convertFromMnt() {
  if (!mntAmount.value) {
    usdAmount.value = 0;
    cnyAmount.value = 0;
    return;
  }
  usdAmount.value = Number((mntAmount.value / usdRate.value).toFixed(2));
  cnyAmount.value = Number((usdAmount.value * cnyRate.value).toFixed(2));
}

function convertFromCny() {
  if (!cnyAmount.value) {
    usdAmount.value = 0;
    mntAmount.value = 0;
    return;
  }
  usdAmount.value = Number((cnyAmount.value / cnyRate.value).toFixed(2));
  mntAmount.value = Math.round(usdAmount.value * usdRate.value);
}
</script>
