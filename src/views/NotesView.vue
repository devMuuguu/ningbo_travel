<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Явахаас өмнө</div>
      <h2 class="page-title">Захиалгын Тэмдэглэл & Санамж</h2>
      <p class="text-sm text-slate-400 mb-6">
        Аялалд гарахаас өмнө болон замд явахдаа анхаарах чухал зүйлсийн жагсаалт.
      </p>
    </div>

    <div class="space-y-4">
      <!-- Note Item 1: Trains -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-blue-400 font-bold text-base">
          <Train class="w-5 h-5" />
          <span>1. Галт тэрэгний захиалга (G3 & D2287)</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          <b>G3</b> (Beijing South 06:52 → Shanghai站 11:33, хаалга 10A/10B, $425.56, захиалга <code>1688900494199231</code>) ба <b>D2287</b> (Shanghai South 06:52 → Ningbo 09:16, $89.92).
        </p>
        <p class="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
          ⚠️ Хоёулаа яг <b>06:52-д</b> хөдөлдөг тул суух өдрөө эрт байрандаа очиж, тийзийг паспортаар авахаа мартуузай.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <CopyButton text="1688900494199231" label="G3 Захиалгын дугаар" />
          <CopyButton text="北京南站" label="Beijing South (ZH)" />
        </div>
      </div>

      <!-- Note Item 2: Shanghai Stations -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-base">
          <AlertTriangle class="w-5 h-5" />
          <span>2. Хоёр Shanghai буудлыг андуурч болохгүй!</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Beijing-ээс ирэхдээ <b>Shanghai站 (上海站)</b>-д ирнэ. Харин Ningbo руу явахдаа <b>Shanghai South (上海南站)</b>-аас гарна. Хоёр буудал хоорондоо ~13 км зайтай, метрогоор ~30–40 мин явна.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <CopyButton text="上海站" label="Shanghai Main (ZH)" />
          <CopyButton text="上海南站" label="Shanghai South (ZH)" />
        </div>
      </div>

      <!-- Note Item 3: Return Flight CA1854 -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-red-400 font-bold text-base">
          <Plane class="w-5 h-5" />
          <span>3. Буцах нислэг (NGB → PEK) Air China CA1854</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Air China <b>CA1854</b> (08.03, Ningbo Lishe <b>T2</b> 09:25 → Beijing Capital <b>T3</b> 11:55, Economy, $696.40). Trip.com захиалга <code>1688900627286791</code>, PNR <code>MDVL8P</code>. Онлайн check-in хөдлөхөөс 24 цагийн өмнө нээгддэг.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <CopyButton text="MDVL8P" label="PNR Код: MDVL8P" />
          <CopyButton text="1688900627286791" label="Trip.com №" />
          <CopyButton text="宁波栎社国际机场" label="Ningbo Airport (ZH)" />
        </div>
      </div>

      <!-- Note Item 4: Baggage Rules -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-base">
          <Luggage class="w-5 h-5" />
          <span>4. Ачааны эрх (CA1854 нислэг)</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Гар тээш 1 ширхэг 5 кг (55×40×20 см), бүртгүүлэх тээш 1 хүнд 20 кг (нэг ширхэг 100×60×40 см-ээс хэтрэхгүй). УБ-гийн олон улсын нислэгийн эрхтэй адилгүй байж болзошгүй тул жингээ сайн тааруулаарай.
        </p>
      </div>

      <!-- Note Item 5: PEK Transit -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-slate-200 font-bold text-base">
          <RefreshCw class="w-5 h-5 text-blue-400" />
          <span>5. PEK буудал дээрх холболт</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          CA1854 нь PEK <b>T3</b>-д буудаг. УБ руу буцах олон улсын нислэг мөн T3-аас бол терминал шилжихгүй. Эсрэг тохиолдолд T3 ↔ T2 үнэгүй shuttle автобустай (~15–20 мин). Тусад нь тийзтэй тул ачаагаа авч, дахин бүртгүүлэхэд ~3 цагийг бүрэн тооцож амжина.
        </p>
      </div>

      <!-- Note Item 6: Match Tickets -->
      <div class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3">
        <div class="flex items-center gap-2 text-amber-300 font-bold text-base">
          <Trophy class="w-5 h-5 text-amber-400" />
          <span>6. VNL Тоглолтын тийз</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          VNL эрэгтэй финал (08.02, Beilun Gymnasium 北仑体育馆). Volleyball World болон албан ёсны борлуулагчийн баримт дээрх сектор, суудал, цагийг баталгаажуулан гар утастайгаа бэлэн байлгаарай.
        </p>
        <div class="flex flex-wrap gap-2 pt-1">
          <CopyButton text="北仑体育馆" label="Beilun Gym (ZH)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Train, AlertTriangle, Plane, Luggage, RefreshCw, Trophy } from 'lucide-vue-next';
import CopyButton from '../components/CopyButton.vue';
</script>
