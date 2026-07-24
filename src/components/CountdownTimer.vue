<template>
  <div class="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 my-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
        <Clock class="w-5 h-5" />
      </div>
      <div>
        <div class="text-xs font-mono uppercase text-amber-400 font-medium tracking-wider">
          {{ targetTitle }}
        </div>
        <div class="text-sm text-slate-300 font-medium">
          {{ targetDateFormatted }}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 font-mono text-center">
      <div class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[50px]">
        <span class="text-lg font-bold text-slate-100 block leading-tight">{{ days }}</span>
        <span class="text-[10px] text-slate-400 uppercase">Өдөр</span>
      </div>
      <span class="text-slate-600 font-bold">:</span>
      <div class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[50px]">
        <span class="text-lg font-bold text-slate-100 block leading-tight">{{ hours }}</span>
        <span class="text-[10px] text-slate-400 uppercase">Цаг</span>
      </div>
      <span class="text-slate-600 font-bold">:</span>
      <div class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[50px]">
        <span class="text-lg font-bold text-slate-100 block leading-tight">{{ minutes }}</span>
        <span class="text-[10px] text-slate-400 uppercase">Мин</span>
      </div>
      <span class="text-slate-600 font-bold">:</span>
      <div class="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 min-w-[50px]">
        <span class="text-lg font-bold text-amber-400 block leading-tight">{{ seconds }}</span>
        <span class="text-[10px] text-slate-400 uppercase">Сек</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Clock } from 'lucide-vue-next';

const targetDate = new Date('2026-07-29T18:35:00+08:00'); // Flight departure time
const targetTitle = ref('Аялал эхлэхэд үлдсэн хугацаа');
const targetDateFormatted = '2026.07.29 · 18:35 (Улаанбаатар)';

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer = null;

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    return;
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24);
  minutes.value = Math.floor((diff / 1000 / 60) % 60);
  seconds.value = Math.floor((diff / 1000) % 60);
}

onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
