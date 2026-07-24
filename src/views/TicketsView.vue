<template>
  <div class="space-y-6">
    <div>
      <div class="eyebrow">Захиалгын самбар</div>
      <h2 class="page-title">Захиалагдсан Тээвэр ба Буудлууд</h2>
      <p class="text-sm text-slate-400 mb-4">
        Мөр эсвэл тийз дээр дарж дэлгэрэнгүй мэдээлэл, захиалгын код болон газрын зургийн холбоосыг нээнэ үү.
      </p>

      <!-- Search & Filter bar -->
      <div class="relative mb-6">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Тийз, нислэг, галт тэрэг, код болон хотоор хайх..."
          class="w-full bg-[#1b2637] border border-[#2f3f58] rounded-xl px-4 py-3 pl-10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-3 text-slate-400 hover:text-slate-200">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Total Transport Cost Summary Bar -->
    <div class="bg-gradient-to-r from-[#1b2637] to-[#26344a] border border-[#2f3f58] rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 class="w-5 h-5" />
        </div>
        <div>
          <div class="text-xs uppercase font-mono text-slate-400">Баталгаажсан Нийт Тээврийн Зардал</div>
          <div class="text-xl font-bold font-['Oswald'] text-emerald-400">$1,211.88 <span class="text-xs font-sans text-slate-400 font-normal">(4 хүн)</span></div>
        </div>
      </div>
      <div class="text-xs font-mono text-slate-400 bg-[#131b29] px-3 py-1.5 rounded-lg border border-[#2f3f58]">
        Trip.com & Албан ёсны захиалгаар
      </div>
    </div>

    <!-- Ticket Cards List -->
    <div class="space-y-4">
      <div 
        v-for="ticket in filteredTickets" 
        :key="ticket.id" 
        class="bg-[#1b2637] border border-[#2f3f58] rounded-xl overflow-hidden transition-all duration-200"
        :class="{ 'ring-1 ring-amber-500/40': ticket.open }"
      >
        <!-- Header Button -->
        <button 
          @click="ticket.open = !ticket.open" 
          class="w-full p-4 flex flex-wrap items-center justify-between gap-4 text-left hover:bg-[#26344a]/50 transition-colors"
        >
          <div class="flex items-center gap-3 min-w-[180px]">
            <div class="font-mono text-sm font-semibold text-amber-400 w-16">
              {{ ticket.date }}
              <span class="block text-xs font-bold text-slate-100">{{ ticket.time }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full" :class="ticket.typeColor"></span>
              <div>
                <div class="font-mono font-bold text-slate-100 text-sm">{{ ticket.codes }}</div>
                <div class="text-xs text-slate-400">{{ ticket.title }}</div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 ml-auto">
            <span :class="ticket.statusClass" class="pill">
              {{ ticket.statusText }}
            </span>
            <ChevronDown class="w-4 h-4 text-slate-400 transition-transform duration-200" :class="{ 'rotate-180': ticket.open }" />
          </div>
        </button>

        <!-- Expanded Ticket Detail Section -->
        <div v-if="ticket.open" class="border-t border-[#2f3f58] bg-[#131b29]/90 p-4 sm:p-5 space-y-4">
          <!-- Ticket Stub Details Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#f8f4ea] text-[#171f2c] p-4 rounded-xl border border-[#d6ccb6] font-sans shadow-inner">
            <div v-for="(field, index) in ticket.fields" :key="index" class="space-y-0.5">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#55617a]">{{ field.k }}</div>
              <div class="text-xs sm:text-sm font-semibold text-[#171f2c] whitespace-pre-line" :class="{ 'text-amber-700 font-bold': field.highlight }">
                {{ field.v }}
              </div>
            </div>
          </div>

          <!-- Quick Copy bar if codes exist -->
          <div v-if="ticket.copyCodes && ticket.copyCodes.length" class="flex flex-wrap items-center gap-2 pt-2">
            <span class="text-xs text-slate-400 font-mono">Түргэн хуулах:</span>
            <CopyButton v-for="c in ticket.copyCodes" :key="c.code" :text="c.code" :label="c.label" />
          </div>

          <!-- Google Maps & Station Links -->
          <div v-if="ticket.maps && ticket.maps.length" class="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2f3f58]">
            <span class="text-xs text-slate-400 font-mono">Газрын зураг:</span>
            <a 
              v-for="m in ticket.maps" 
              :key="m.url" 
              :href="m.url" 
              target="_blank" 
              rel="noopener"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#26344a] text-sky-300 hover:text-white hover:bg-[#2f3f58] transition-colors border border-[#2f3f58]"
            >
              <MapPin class="w-3.5 h-3.5 text-red-400" />
              <span>{{ m.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Search, X, ChevronDown, CheckCircle2, MapPin } from 'lucide-vue-next';
import CopyButton from '../components/CopyButton.vue';

const searchQuery = ref('');

const tickets = ref([
  {
    id: 1,
    date: '07.29',
    time: '18:35',
    codes: 'UBN → PEK',
    title: 'Улаанбаатар → Beijing Нислэг',
    statusText: 'Захиалсан',
    statusClass: 'go',
    typeColor: 'bg-[#e05643]',
    open: true,
    fields: [
      { k: 'Хөдлөх', v: '07.29 Лха · 18:35\nUBN · Улаанбаатар' },
      { k: 'Хүрэх', v: '07.29 Лха · 20:35\nPEK · Beijing Capital' },
      { k: 'Үргэлжлэх', v: '~2 цаг' },
      { k: 'Нислэгийн дугаар', v: 'Олон улсын нислэг' },
      { k: 'Терминал', v: 'PEK T3' },
      { k: 'Ангилал', v: 'Economy (4 зорчигч)' },
      { k: 'Нийт үнэ', v: 'Захиалга хийгдсэн' },
      { k: 'Захиалгын систем', v: 'Агаарын тээвэр' }
    ],
    copyCodes: [
      { label: 'UBN Airport', code: 'Chinggis Khaan International Airport' },
      { label: 'PEK Airport (ZH)', code: '北京首都国际机场' }
    ],
    maps: [
      { title: 'UBN Чингис хаан буудал', url: 'https://www.google.com/maps/search/?api=1&query=Chinggis+Khaan+International+Airport' },
      { title: 'PEK 北京首都国际机场', url: 'https://www.google.com/maps/search/?api=1&query=Beijing+Capital+International+Airport' }
    ]
  },
  {
    id: 2,
    date: '07.30',
    time: '06:52',
    codes: 'BJS → SHA (G3)',
    title: 'Beijing South → Shanghai · Хурдан галт тэрэг',
    statusText: 'Захиалсан ($425.56)',
    statusClass: 'go',
    typeColor: 'bg-[#3b86ef]',
    open: false,
    fields: [
      { k: 'Хөдлөх', v: '07.30 Пүр · 06:52\nBeijing South (北京南站)' },
      { k: 'Хүрэх', v: '07.30 Пүр · 11:33\nShanghai Railway Station (上海站)' },
      { k: 'Суух хаалга', v: 'Хаалга 10A / 10B', highlight: true },
      { k: 'Галт тэрэгний дугаар', v: 'G3 (4ц 41мин)' },
      { k: 'Нийт үнэ', v: '$425.56 ($106.39/хүн × 4)' },
      { k: 'Захиалгын дугаар', v: '1688900494199231 (Trip.com)', highlight: true },
      { k: 'Суудал', v: 'Вагон 08, суудал 015F, 014F, 015D, 014D', highlight: true },
      { k: 'Тэмдэглэл', v: '05:20-д буудлаас гарч таксигаар явах' }
    ],
    copyCodes: [
      { label: 'Beijing South (ZH)', code: '北京南站' },
      { label: 'Shanghai Station (ZH)', code: '上海站' },
      { label: 'Захиалгын дугаар', code: '1688900494199231' }
    ],
    maps: [
      { title: 'Beijing South Station', url: 'https://www.google.com/maps/search/?api=1&query=Beijing+South+Railway+Station' },
      { title: 'Shanghai Railway Station (上海站)', url: 'https://www.google.com/maps/search/?api=1&query=31.2508246,121.4506144' }
    ]
  },
  {
    id: 3,
    date: '07.30',
    time: '14:00',
    codes: 'Shanghai Stay',
    title: 'Shanghai Home Stay (Jing\'an Temple)',
    statusText: 'Захиалсан',
    statusClass: 'go',
    typeColor: 'bg-[#e0a52e]',
    open: false,
    fields: [
      { k: 'Байршил', v: 'Jing\'an Temple Subway Station ойролцоо' },
      { k: 'Байрлах хугацаа', v: '07.30 – 08.01 (2 шөнө)' },
      { k: 'Метро', v: 'Line 2 / Line 7 ойрхон' },
      { k: 'Төлөв', v: 'Захиалга баталгаажсан' }
    ],
    copyCodes: [
      { label: 'Jing\'an Temple', code: '静安寺' }
    ],
    maps: [
      { title: 'Shanghai Home Stay Maps', url: 'https://www.google.com/maps/search/?api=1&query=31.22211586149014,121.45399211177829' }
    ]
  },
  {
    id: 4,
    date: '08.01',
    time: '06:52',
    codes: 'SHA → NGB (D2287)',
    title: 'Shanghai South → Ningbo · Галт тэрэг',
    statusText: 'Захиалсан ($89.92)',
    statusClass: 'go',
    typeColor: 'bg-[#3b86ef]',
    open: false,
    fields: [
      { k: 'Хөдлөх буудал', v: 'Shanghai South (上海南站)', highlight: true },
      { k: 'Хүрэх буудал', v: 'Ningbo Railway Station (宁波站)\n08.01 · 09:16' },
      { k: 'Хөдлөх цаг', v: '08.01 Бям · 06:52 (2ц 24мин)' },
      { k: 'Галт тэрэг', v: 'D2287' },
      { k: 'Суух хаалга', v: 'Хаалга 6A', highlight: true },
      { k: 'Суудал', v: 'Вагон 04, суудал 013F, 014F, 013D, 014D', highlight: true },
      { k: 'Нийт үнэ', v: '$89.92 ($22.48/хүн + fee $12)' },
      { k: 'Тэмдэглэл', v: 'Shanghai South руу 05:40-д гараарай' }
    ],
    copyCodes: [
      { label: 'Shanghai South (ZH)', code: '上海南站' },
      { label: 'Ningbo Station (ZH)', code: '宁波站' }
    ],
    maps: [
      { title: 'Shanghai South Railway Station', url: 'https://www.google.com/maps/search/?api=1&query=Shanghai+South+Railway+Station' },
      { title: 'Ningbo Railway Station', url: 'https://www.google.com/maps/search/?api=1&query=29.861388,121.536331' }
    ]
  },
  {
    id: 5,
    date: '08.01',
    time: '12:00',
    codes: 'Ningbo Stay',
    title: 'Huihe Ruyu Hotel (Beilun, Ningbo)',
    statusText: 'Захиалсан',
    statusClass: 'go',
    typeColor: 'bg-[#e0a52e]',
    open: false,
    fields: [
      { k: 'Зочид буудал', v: 'Huihe Ruyu Hotel (宁波汇和如语酒店)' },
      { k: 'Хаяг', v: 'No. 196 Changjiang South Road, Beilun District, Ningbo' },
      { k: 'Заалнаас зай', v: 'Beilun Gymnasium-аас ердөө ~1.8 км' },
      { k: 'Байрлах хугацаа', v: '08.01 – 08.03 (2 шөнө)' }
    ],
    copyCodes: [
      { label: 'Буудлын хаяг (ZH)', code: '宁波市北仑区长江南路196号' },
      { label: 'Beilun Gym (ZH)', code: '北仑体育馆' }
    ],
    maps: [
      { title: 'Huihe Ruyu Hotel Maps', url: 'https://www.google.com/maps/place/29%C2%B053\'18.0%22N+121%C2%B050\'23.0%22E' }
    ]
  },
  {
    id: 6,
    date: '08.03',
    time: '09:25',
    codes: 'NGB → PEK (CA1854)',
    title: 'Ningbo (NGB) → Beijing Capital (PEK) Нислэг',
    statusText: 'Захиалсан ($696.40)',
    statusClass: 'go',
    typeColor: 'bg-[#e05643]',
    open: false,
    fields: [
      { k: 'Хөдлөх', v: '08.03 Дав · 09:25\nNingbo Lishe (NGB) T2', highlight: true },
      { k: 'Хүрэх', v: '08.03 Дав · 11:55\nBeijing Capital (PEK) T3' },
      { k: 'Агаарын компани', v: 'Air China · CA1854' },
      { k: 'Trip.com Захиалга', v: '1688900627286791', highlight: true },
      { k: 'PNR Код', v: 'MDVL8P', highlight: true },
      { k: 'Ачааны эрх', v: 'Гар тээш 5кг + Ачаа 20кг/хүн' },
      { k: 'Үнэ', v: '$696.40 (4 хүн)' },
      { k: 'Тэмдэглэл', v: '07:25-д аэропорт дээр байх (~06:30 гараарай)' }
    ],
    copyCodes: [
      { label: 'PNR Код', code: 'MDVL8P' },
      { label: 'Trip.com №', code: '1688900627286791' },
      { label: 'Ningbo Airport (ZH)', code: '宁波栎社国际机场' }
    ],
    maps: [
      { title: 'Ningbo Lishe Airport (NGB)', url: 'https://www.google.com/maps/search/?api=1&query=Ningbo+Lishe+International+Airport' },
      { title: 'Beijing Capital Airport (PEK)', url: 'https://www.google.com/maps/search/?api=1&query=Beijing+Capital+International+Airport' }
    ]
  }
]);

const filteredTickets = computed(() => {
  if (!searchQuery.value.trim()) return tickets.value;
  const q = searchQuery.value.toLowerCase();
  return tickets.value.filter(t => 
    t.title.toLowerCase().includes(q) ||
    t.codes.toLowerCase().includes(q) ||
    t.date.includes(q) ||
    t.fields.some(f => f.v.toLowerCase().includes(q) || f.k.toLowerCase().includes(q))
  );
});
</script>
