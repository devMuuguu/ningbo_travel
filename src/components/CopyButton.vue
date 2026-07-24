<template>
  <button 
    @click="handleCopy" 
    class="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-sky-200 border border-slate-700 transition-colors"
    :title="copied ? 'Хуулагдлаа!' : 'Хуулах'"
  >
    <Check v-if="copied" class="w-3.5 h-3.5 text-emerald-400" />
    <Copy v-else class="w-3.5 h-3.5 text-slate-400" />
    <span>{{ copied ? 'Хуулагдлаа' : text ? label || text : label }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { Copy, Check } from 'lucide-vue-next';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const copied = ref(false);

function handleCopy() {
  if (!props.text) return;
  navigator.clipboard.writeText(props.text);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>
