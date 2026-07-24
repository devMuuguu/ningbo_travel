<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Газрын зураг</div>
      <h2 class="page-title">Гол Байршлууд & Карт</h2>
      <p class="text-sm text-slate-400 mb-6">
        Аялалын явцад очих нисэх буудлууд, галт тэрэгний буудлууд, зочид
        буудлууд болон VNL тэмцээний заалны байршил.
      </p>
    </div>

    <!-- Map Filter tabs by city -->
    <div
      class="flex items-center gap-2 border-b border-[#2f3f58] pb-3 overflow-x-auto scrollbar-none"
    >
      <button
        @click="selectedCity = 'all'"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="
          selectedCity === 'all'
            ? 'bg-amber-500 text-black'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Бүх хот (8 байршил)
      </button>
      <button
        @click="selectedCity = 'beijing'"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="
          selectedCity === 'beijing'
            ? 'bg-amber-500 text-black'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Beijing · 北京
      </button>
      <button
        @click="selectedCity = 'shanghai'"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="
          selectedCity === 'shanghai'
            ? 'bg-amber-500 text-black'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Shanghai · 上海
      </button>
      <button
        @click="selectedCity = 'ningbo'"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
        :class="
          selectedCity === 'ningbo'
            ? 'bg-amber-500 text-black'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Ningbo · 宁波
      </button>
    </div>

    <!-- Important Notice Box -->
    <div
      class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs sm:text-sm text-amber-200 space-y-2"
    >
      <div class="font-bold flex items-center gap-2 text-amber-400">
        <AlertTriangle class="w-4 h-4" />
        <span>Анхаарах Чухал Заавар:</span>
      </div>
      <p>
        1. <b>Shanghai-д 2 өөр буудал бий:</b> Beijing-ээс
        <b>Shanghai 站 (上海站)</b>-д ирж, Ningbo руу
        <b>Shanghai South (上海南站)</b>-аас гарна. Хоорондоо ~13 км зайтай тул
        андуурч болохгүй!
      </p>
      <p>
        2. <b>Ningbo Зочид буудал:</b> Huihe Ruyu Hotel (Beilun District) нь
        Beilun Gymnasium заалнаас ердөө ~1.8 км зайтай тул тоглолт үзэхэд маш
        тохиромжтой.
      </p>
    </div>

    <!-- Beijing Section -->
    <div
      v-if="selectedCity === 'all' || selectedCity === 'beijing'"
      class="space-y-3"
    >
      <h3
        class="text-lg font-bold text-slate-200 border-l-4 border-red-500 pl-3"
      >
        Beijing · 北京
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- PEK -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=Beijing+Capital+International+Airport&hl=en&z=13&output=embed"
            class="w-full h-56 sm:h-48 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Beijing Capital Int'l Airport (PEK)
              </div>
              <div class="text-xs text-slate-400 font-mono">
                北京首都国际机场
              </div>
              <div class="text-xs text-amber-400 mt-1">
                Ирэх T3 · 08.03 · 11:55 (CA1854)
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="北京首都国际机场" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Beijing+Capital+International+Airport"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Beijing South -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=Beijing+South+Railway+Station&hl=en&z=15&output=embed"
            class="w-full h-56 sm:h-48 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Beijing South Railway Station
              </div>
              <div class="text-xs text-slate-400 font-mono">北京南站</div>
              <div class="text-xs text-blue-400 mt-1">
                G3 гарах · 07.30 · 06:52 · Хаалга 10A/10B
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="北京南站" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Beijing+South+Railway+Station"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Shanghai Section -->
    <div
      v-if="selectedCity === 'all' || selectedCity === 'shanghai'"
      class="space-y-3 pt-4"
    >
      <h3
        class="text-lg font-bold text-slate-200 border-l-4 border-blue-500 pl-3"
      >
        Shanghai · 上海
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Home Stay -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=31.22211586149014,121.45399211177829&hl=en&z=16&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Home Stay (Jing'an Temple)
              </div>
              <div class="text-xs text-emerald-400 mt-1">
                Зочид буудал · 07.30–08.01 (захиалсан)
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton
                text="31.22211586149014,121.45399211177829"
                label="GPS Координат"
              />
              <a
                href="https://www.google.com/maps/search/?api=1&query=31.22211586149014,121.45399211177829"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Shanghai Railway Station -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=31.2508246,121.4506144&hl=en&z=14&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Shanghai Railway Station
              </div>
              <div class="text-xs text-slate-400 font-mono">上海站</div>
              <div class="text-xs text-blue-400 mt-1">
                Beijing-ээс ирэх буудал (G3) · 07.30
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="上海站" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=31.2508246,121.4506144"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Shanghai South Railway Station -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=Shanghai+South+Railway+Station&hl=en&z=14&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Shanghai South Railway Station
              </div>
              <div class="text-xs text-slate-400 font-mono">上海南站</div>
              <div class="text-xs text-amber-400 mt-1">
                Ningbo руу гарах буудал (D2287) · 08.01
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="上海南站" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Shanghai+South+Railway+Station"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ningbo Section -->
    <div
      v-if="selectedCity === 'all' || selectedCity === 'ningbo'"
      class="space-y-3 pt-4"
    >
      <h3
        class="text-lg font-bold text-slate-200 border-l-4 border-amber-500 pl-3"
      >
        Ningbo · 宁波
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Ningbo Station -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=29.861388,121.536331&hl=en&z=15&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Ningbo Railway Station
              </div>
              <div class="text-xs text-slate-400 font-mono">宁波站</div>
              <div class="text-xs text-blue-400 mt-1">
                Shanghai-аас ирэх (D2287) · 08.01 · 09:16
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="宁波站" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=29.861388,121.536331"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Huihe Ruyu Hotel -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=29.888324,121.839722&hl=en&z=16&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Huihe Ruyu Hotel (Ningbo)
              </div>
              <div class="text-xs text-slate-400 font-mono">
                No. 196 Changjiang South Rd, Beilun
              </div>
              <div class="text-xs text-emerald-400 mt-1">
                Зочид буудал · 08.01–08.03 (захиалсан)
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton
                text="宁波市北仑区长江南路196号"
                label="Хаяг хуулах"
              />
              <a
                href="https://www.google.com/maps/place/29%C2%B053'18.0%22N+121%C2%B050'23.0%22E"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Beilun Gymnasium -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=29.9047592,121.8408489&hl=en&z=15&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Beilun Gymnasium — VNL Финал
              </div>
              <div class="text-xs text-slate-400 font-mono">
                北仑体育馆 / 北仑体艺中心
              </div>
              <div class="text-xs text-amber-400 mt-1">
                VNL Волейболын Тэмцээн · 08.02
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="北仑体育馆" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=29.9047592,121.8408489"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Ningbo Lishe Airport -->
        <div
          class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col min-w-0"
        >
          <iframe
            loading="lazy"
            src="https://maps.google.com/maps?q=Ningbo+Lishe+International+Airport&hl=en&z=13&output=embed"
            class="w-full h-56 sm:h-44 border-0 bg-[#131b29]"
          ></iframe>
          <div class="p-4 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="font-bold text-slate-100 text-sm">
                Ningbo Lishe Int'l Airport (NGB)
              </div>
              <div class="text-xs text-slate-400 font-mono">
                宁波栎社国际机场
              </div>
              <div class="text-xs text-red-400 mt-1">
                Гарах T2 · 08.03 · 09:25 (CA1854)
              </div>
            </div>
            <div
              class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2f3f58]"
            >
              <CopyButton text="宁波栎社国际机场" label="Хятад нэр" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ningbo+Lishe+International+Airport"
                target="_blank"
                rel="noopener"
                class="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ExternalLink, AlertTriangle } from "lucide-vue-next";
import CopyButton from "../components/CopyButton.vue";

const selectedCity = ref("all");
</script>
