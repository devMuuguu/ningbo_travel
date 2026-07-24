<template>
  <div v-if="deferredPrompt" class="bg-gradient-to-r from-amber-500/20 via-blue-500/10 to-emerald-500/20 border border-amber-500/30 rounded-xl p-3 my-3 flex items-center justify-between gap-3 shadow-md">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
        <Download class="w-4 h-4" />
      </div>
      <div>
        <div class="text-xs font-semibold text-slate-100">Апп болгон суулгах (PWA)</div>
        <div class="text-[11px] text-slate-300">Оффлайн горимд интернетгүй үед шууд ажиллана.</div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button @click="installPwa" class="btn-primary text-xs py-1.5 px-3">
        Суулгах
      </button>
      <button @click="dismiss" class="text-slate-400 hover:text-slate-200 p-1">
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Download, X } from 'lucide-vue-next';

const deferredPrompt = ref(null);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});

async function installPwa() {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;
  if (outcome === 'accepted') {
    deferredPrompt.value = null;
  }
}

function dismiss() {
  deferredPrompt.value = null;
}
</script>
