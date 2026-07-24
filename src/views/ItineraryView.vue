<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Өдөр тутмын хөтөлбөр</div>
      <h2 class="page-title">07.29 – 08.03 Аяллын Төлөвлөгөө</h2>
      <p class="text-sm text-slate-400 mb-6">
        Өдөр бүрийн хөдлөх, буух, такси болон тээврийн цагийн нарийвчилсан зааварчилгаа.
      </p>
    </div>

    <!-- Timeline Cards -->
    <div class="space-y-4">
      <div 
        v-for="day in days" 
        :key="day.date" 
        class="bg-[#1b2637] border border-[#2f3f58] rounded-xl p-5 space-y-3 relative overflow-hidden"
        :class="{ 'ring-2 ring-amber-500/50 bg-[#26344a]/40': day.highlight }"
      >
        <!-- Day Badge -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#2f3f58] pb-3">
          <div class="flex items-center gap-3">
            <span class="font-['Oswald'] text-2xl font-bold text-amber-400">{{ day.date }}</span>
            <span class="text-sm font-semibold text-slate-300 font-mono">({{ day.dow }})</span>
            <span v-if="day.highlight" class="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              VNL Тэмцээний Өдөр
            </span>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-[#131b29] px-2.5 py-1 rounded border border-[#2f3f58]">
            {{ day.location }}
          </span>
        </div>

        <h3 class="text-base sm:text-lg font-bold text-slate-100">
          {{ day.title }}
        </h3>

        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {{ day.desc }}
        </p>

        <!-- Timeline steps inside day -->
        <div v-if="day.steps && day.steps.length" class="space-y-2 pt-2 border-t border-[#2f3f58]/60">
          <div v-for="(step, idx) in day.steps" :key="idx" class="flex items-start gap-2.5 text-xs text-slate-300">
            <Clock class="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong class="text-amber-300 font-mono mr-1">{{ step.time }}</strong>
              <span>{{ step.text }}</span>
            </div>
          </div>
        </div>

        <!-- Chips -->
        <div class="flex flex-wrap items-center gap-2 pt-2">
          <span 
            v-for="(chip, cIdx) in day.chips" 
            :key="cIdx" 
            class="px-2.5 py-1 rounded text-xs font-mono"
            :class="chip.hot ? 'bg-red-500/15 text-red-300 border border-red-500/30' : 'bg-[#131b29] text-slate-300 border border-[#2f3f58]'"
          >
            {{ chip.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Clock } from 'lucide-vue-next';

const days = ref([
  {
    date: '07.29',
    dow: 'Лхагва',
    location: 'УБ → Beijing',
    title: 'Улаанбаатараас хөдлөх, Beijing-д орой буух',
    desc: 'Улаанбаатараас 18:35-д хөдөлж, Beijing Capital Airport (PEK)-д ~20:35-д буна. Гааль дайран өнгөрсний дараа буудал дотор шөнийг өнгөрөөх тохиромжтой суудалтай хэсгийг олж эрт амрах.',
    highlight: false,
    steps: [
      { time: '16:30', text: 'Чингис хаан буудалд (UBN) ирж ачаа бүртгүүлэх' },
      { time: '18:35', text: 'Улаанбаатараас Beijing чиглэлийн нислэг хөдөлнө' },
      { time: '20:35', text: 'Beijing PEK T3 дээр бууна' }
    ],
    chips: [
      { text: 'Зочид буудалгүй', hot: false },
      { text: 'Хөнгөн ачаатай', hot: false },
      { text: 'PEK T3-д шөнөжинө', hot: true }
    ]
  },
  {
    date: '07.30',
    dow: 'Пүрэв',
    location: 'Beijing → Shanghai',
    title: 'Beijing South → Shanghai (G3 Хурдан галт тэрэг)',
    desc: 'G3 галт тэрэг 06:52-д хөдөлдөг тул метро ажиллахаас өмнө буюу ~05:20-д такси/Didi-гээр Beijing South (北京南站) руу гараарай (~45 мин). Суух хаалга 10A/10B. Shanghai站 (上海站)-д 11:33-д ирж буудал руугаа явах.',
    highlight: false,
    steps: [
      { time: '05:20', text: 'Такси/Didi-гээр Beijing South (北京南站) руу гарна' },
      { time: '06:15', text: 'G3 галт тэрэгний Хаалга 10A/10B дээр бэлэн байна' },
      { time: '06:52', text: 'G3 Хурдан галт тэрэг хөдөлнө (4ц 41мин)' },
      { time: '11:33', text: 'Shanghai Railway Station (上海站)-д ирнэ' },
      { time: '14:00', text: 'Home Stay (Jing\'an Temple) check-in хийнэ' }
    ],
    chips: [
      { text: 'G3 · 06:52–11:33', hot: false },
      { text: 'Такси ~05:20', hot: true },
      { text: 'Хаалга 10A/10B', hot: false },
      { text: 'Вагон 08 · Суудал 015F/014F/015D/014D', hot: false }
    ]
  },
  {
    date: '07.31',
    dow: 'Баасан',
    location: 'Shanghai',
    title: 'Shanghai хотод бүтэн өдөр аялах',
    desc: 'Хотыг үзэх ганц бүтэн чөлөөт өдөр. The Bund (外滩), Yu Garden (豫园), Nanjing Road (南京路), Xintiandi (新天地) замаар метрогоор хямд бөгөөд тухтай аялна.',
    highlight: false,
    steps: [
      { time: '10:00', text: 'The Bund (外滩) эрэг дагуу алхах' },
      { time: '14:00', text: 'Yu Garden (豫园) & Нанжингийн гудамж' },
      { time: '19:00', text: 'Xintiandi орчмоор оройн хоол ба усан онгоц' }
    ],
    chips: [
      { text: 'Метро өдрийн тийз ≈ $3–4', hot: false },
      { text: 'Чөлөөт аялал', hot: false }
    ]
  },
  {
    date: '08.01',
    dow: 'Бямба',
    location: 'Shanghai → Ningbo',
    title: 'Shanghai South → Ningbo (D2287 Галт тэрэг)',
    desc: 'D2287 нь Shanghai South (上海南站)-аас 06:52-д хөдөлнө — Shanghai站 биш! Буудлаас ~05:40-д гараарай. Ningbo (宁波站)-д 09:16-д ирнэ. Huihe Ruyu Hotel (Beilun District)-д ор авч, Beilun орчмыг үзнэ.',
    highlight: false,
    steps: [
      { time: '05:40', text: 'Shanghai South (上海南站) руу гараарай' },
      { time: '06:52', text: 'D2287 Галт тэрэг хөдөлнө (Хаалга 6A)' },
      { time: '09:16', text: 'Ningbo (宁波站)-д ирнэ (2ц 24мин)' },
      { time: '12:00', text: 'Huihe Ruyu Hotel буудалд орох' }
    ],
    chips: [
      { text: 'D2287 · 06:52–09:16', hot: false },
      { text: 'Хаалга 6A · Вагон 04', hot: true },
      { text: 'Суудал 013F/014F/013D/014D', hot: false }
    ]
  },
  {
    date: '08.02',
    dow: 'Ням',
    location: 'Ningbo (Beilun)',
    title: 'VNL Эрэгтэй Финал — Алтан Медаль 🏆',
    desc: '2026 оны FIVB эрэгтэй волейболын лигийн финал Beilun Gymnasium (北仑体育馆)-д болно. Буудал нь заалнаас ердөө ~1.8 км зайтай. Тоглолтын дараа Ningbo-д хононо.',
    highlight: true,
    steps: [
      { time: '12:00', text: 'Beilun Gymnasium орчим бэлтгэл, сувенир авна' },
      { time: 'Өдөр/Орой', text: 'VNL Финалын шигшээ тоглолт эхэлнэ' }
    ],
    chips: [
      { text: 'Beilun Gymnasium', hot: true },
      { text: 'Тийз тусад нь', hot: false },
      { text: 'Ningbo-д хонох', hot: false }
    ]
  },
  {
    date: '08.03',
    dow: 'Даваа',
    location: 'Ningbo → Beijing → УБ',
    title: 'Ningbo → Beijing → Улаанбаатар Нислэг',
    desc: 'Өглөө Ningbo Lishe Airport (NGB) T2-оос CA1854 нислэгээр 09:25-д хөдөлж, Beijing Capital (PEK) T3-д 11:55-д буна. Буудлаас ~06:30-д гараарай. ~3 цагийн холболтоор олон улсын 15:00 нислэгт холбогдож, УБ-д ~17:15-д ирнэ.',
    highlight: false,
    steps: [
      { time: '06:30', text: 'Ningbo буудлаас аэропорт руу гарна' },
      { time: '09:25', text: 'CA1854 нислэг хөдөлнө (NGB T2)' },
      { time: '11:55', text: 'Beijing PEK T3 дээр бууна' },
      { time: '15:00', text: 'PEK-ээс Улаанбаатар руу хөдөлнө' },
      { time: '17:15', text: 'Улаанбаатарт гэртээ ирнэ' }
    ],
    chips: [
      { text: 'CA1854 · 09:25–11:55', hot: false },
      { text: 'NGB T2 → PEK T3', hot: false },
      { text: 'PEK-д ~3ц холболт', hot: true }
    ]
  }
]);
</script>
