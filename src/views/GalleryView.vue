<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Баталгаажуулах зураг</div>
      <h2 class="page-title">Тасалбар & Билетийн Зургууд</h2>
      <p class="text-sm text-slate-400 mb-6">
        Галт тэрэг болон нислэгийн захиалгын баталгаажуулалтын зурагнууд. Зураг дээр дарж томруулан харах эсвэл татан авч оффлайн үед ашиглана уу.
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div 
        v-for="img in ticketImages" 
        :key="img.src"
        class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden flex flex-col group hover:border-amber-500/50 transition-all duration-200 shadow-md"
      >
        <div class="relative overflow-hidden bg-black/40 h-52 flex items-center justify-center p-2 cursor-pointer" @click="openImage(img)">
          <img 
            :src="img.src" 
            :alt="img.title" 
            class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
              <ZoomIn class="w-3.5 h-3.5" />
              <span>Томруулах</span>
            </span>
          </div>
        </div>

        <div class="p-4 bg-[#1b2637] flex-1 flex flex-col justify-between border-t border-[#2f3f58]">
          <div>
            <div class="text-sm font-bold text-slate-100 mb-1">{{ img.title }}</div>
            <div class="text-xs text-slate-400 leading-relaxed">{{ img.desc }}</div>
          </div>

          <div class="mt-4 pt-3 border-t border-[#2f3f58] flex items-center justify-between">
            <button @click="openImage(img)" class="text-xs text-amber-400 font-medium hover:underline flex items-center gap-1">
              <Eye class="w-3.5 h-3.5" />
              <span>Харах</span>
            </button>
            <a :href="img.src" download class="btn-secondary text-xs py-1 px-2.5 flex items-center gap-1">
              <Download class="w-3 h-3" />
              <span>Татах</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Lightbox Modal -->
    <ImageModal 
      :is-open="modalOpen" 
      :image-src="activeImage?.src" 
      :title="activeImage?.title" 
      @close="modalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ZoomIn, Eye, Download } from 'lucide-vue-next';
import ImageModal from '../components/ImageModal.vue';

const modalOpen = ref(false);
const activeImage = ref(null);

const ticketImages = ref([
  {
    title: 'Beijing → Shanghai (G3 Галт тэрэг)',
    desc: 'Beijing South -> Shanghai Railway Station G3 галт тэрэгний Trip.com дээрх баталгаажуулалт ($425.56)',
    src: '/beijing_to_shanghai_train.png'
  },
  {
    title: 'Shanghai → Ningbo (D2287 Галт тэрэг)',
    desc: 'Shanghai South -> Ningbo D2287 галт тэрэгний баталгаажуулалт ($89.92)',
    src: '/shanghai_to_ningbo_train.png'
  },
  {
    title: 'Ningbo → Beijing (CA1854 Нислэг)',
    desc: 'Air China CA1854 NGB -> PEK нислэгийн Trip.com дээрх захиалгын зураг ($696.40, PNR: MDVL8P)',
    src: '/ub-shanghai flight.png'
  }
]);

function openImage(img) {
  activeImage.value = img;
  modalOpen.value = true;
}
</script>
