<template>
  <div class="space-y-6">
    <!-- Countdown timer -->
    <CountdownTimer />

    <!-- Route High Level Summary -->
    <div class="card-panel relative overflow-hidden">
      <div class="absolute top-0 right-0 p-8 opacity-10 text-amber-400 pointer-events-none">
        <Compass class="w-48 h-48" />
      </div>

      <div class="relative z-10">
        <div class="eyebrow">Ерөнхий чиглэл & Хуваарь</div>
        <h2 class="page-title">Улаанбаатар – Ningbo Аяллын Төлөвлөгөө</h2>

        <p class="text-slate-300 mb-6 text-sm sm:text-base leading-relaxed">
          2026 оны FIVB Волейболын Үндэсний Лигийн (VNL) эрэгтэй финалын тоглолтыг үзэхээр Ningbo (Beilun Gymnasium) руу хийх аяллын тийз, галт тэрэг, зочид буудал болон өдөр тутмын хөтөлбөр.
        </p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div class="bg-[#131b29] border border-[#2f3f58] rounded-xl p-3.5">
            <span class="text-xs text-[#93a2bd] uppercase font-mono block">Зорчигчид</span>
            <span class="text-xl font-bold text-[#eef2f8] font-['Oswald']">4 ХҮН (Ахмадууд)</span>
          </div>
          <div class="bg-[#131b29] border border-[#2f3f58] rounded-xl p-3.5">
            <span class="text-xs text-[#93a2bd] uppercase font-mono block">Хугацаа</span>
            <span class="text-xl font-bold text-[#e0a52e] font-['Oswald']">07.29 – 08.03 (6 өдөр)</span>
          </div>
          <div class="bg-[#131b29] border border-[#2f3f58] rounded-xl p-3.5">
            <span class="text-xs text-[#93a2bd] uppercase font-mono block">Гол Тээвэр</span>
            <span class="text-xl font-bold text-[#3b86ef] font-['Oswald']">3 Нислэг + 2 Галт тэрэг</span>
          </div>
          <div class="bg-[#131b29] border border-[#2f3f58] rounded-xl p-3.5">
            <span class="text-xs text-[#93a2bd] uppercase font-mono block">VNL Финал</span>
            <span class="text-xl font-bold text-[#37c07a] font-['Oswald']">08.02 · Ningbo</span>
          </div>
        </div>

        <!-- Major Route Stops -->
        <div class="space-y-3">
          <div class="text-xs font-mono uppercase text-[#93a2bd] tracking-wider mb-1">Маршрутын дараалал:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                <Plane class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-slate-100">1. УБ (UBN) → Beijing (PEK)</div>
                <div class="text-xs text-slate-400">07.29 · 18:35 - 20:35 · Нислэг захиалсан</div>
              </div>
            </div>

            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Train class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-slate-100">2. Beijing South → Shanghai (G3)</div>
                <div class="text-xs text-slate-400">07.30 · 06:52 - 11:33 · Суудал захиалсан ($425.56)</div>
              </div>
            </div>

            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Train class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-slate-100">3. Shanghai South → Ningbo (D2287)</div>
                <div class="text-xs text-slate-400">08.01 · 06:52 - 09:16 · Суудал захиалсан ($89.92)</div>
              </div>
            </div>

            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Trophy class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-amber-300">4. VNL Эрэгтэй Финал (Beilun)</div>
                <div class="text-xs text-slate-400">08.02 · Beilun Gymnasium · Ningbo</div>
              </div>
            </div>

            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                <Plane class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-slate-100">5. Ningbo (NGB) → PEK (CA1854)</div>
                <div class="text-xs text-slate-400">08.03 · 09:25 - 11:55 · Air China CA1854 ($696.40)</div>
              </div>
            </div>

            <div class="bg-[#131b29]/80 border border-[#2f3f58] rounded-lg p-3 flex items-start gap-3">
              <div class="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <CheckCircle2 class="w-4 h-4" />
              </div>
              <div>
                <div class="font-semibold text-sm text-slate-100">6. Beijing (PEK) → Улаанбаатар</div>
                <div class="text-xs text-slate-400">08.03 · ~15:00 - 17:15 · Гэртээ буцах нислэг</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Shortcut Actions -->
        <div class="mt-8 pt-6 border-t border-[#2f3f58] flex flex-wrap gap-3">
          <router-link to="/tickets" class="btn-primary">
            <Ticket class="w-4 h-4" />
            <span>Захиалсан тийзүүдийг харах</span>
          </router-link>
          <router-link to="/maps" class="btn-secondary">
            <MapPin class="w-4 h-4" />
            <span>Байршлуудын газар зураг</span>
          </router-link>
          <router-link to="/gallery" class="btn-secondary">
            <Image class="w-4 h-4" />
            <span>Тасалбарын зургууд</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Compass, Plane, Train, Trophy, CheckCircle2, Ticket, MapPin, Image } from 'lucide-vue-next';
import CountdownTimer from '../components/CountdownTimer.vue';
</script>
