<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" @click.self="close">
      <div class="relative max-w-4xl max-h-[90vh] w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
          <span class="text-sm font-semibold text-slate-200">{{ title || 'Тасалбарын зураг' }}</span>
          <button @click="close" class="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="flex-1 overflow-auto p-2 flex items-center justify-center bg-black/40">
          <img :src="imageSrc" :alt="title" class="max-w-full max-h-[75vh] object-contain rounded-lg" />
        </div>
        <div class="p-3 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
          <a :href="imageSrc" download class="btn-secondary text-xs flex items-center gap-1">
            <Download class="w-3.5 h-3.5" />
            <span>Татж авах</span>
          </a>
          <button @click="close" class="btn-primary text-xs">Хаах</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X, Download } from 'lucide-vue-next';

defineProps({
  isOpen: Boolean,
  imageSrc: String,
  title: String
});

const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>
