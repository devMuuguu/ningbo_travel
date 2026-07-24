<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <div class="eyebrow">Аялал, Шопинг & Кафе</div>
      <h2 class="page-title">Сонирхолтой Газрууд (Shanghai & Ningbo)</h2>
      <p class="text-sm text-slate-400 mb-6">
        Заавал үзэх дурсгалт газрууд, эмэгтэйчүүдийн шоппинг моллууд болон
        хамгийн хөөрхөн, зураг авахад тохиромжтой кафе, бэйкеринүүд.
      </p>
    </div>

    <!-- Category Tabs (Main Categories) -->
    <div
      class="flex overflow-x-auto scrollbar-none gap-2 bg-[#131b29] p-1.5 rounded-xl border border-[#2f3f58]"
    >
      <button
        @click="activeCategory = 'attractions'"
        class="flex-1 shrink py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
        :class="
          activeCategory === 'attractions'
            ? 'bg-amber-500 text-black shadow-md'
            : 'text-slate-300 hover:text-white hover:bg-[#1b2637]'
        "
      >
        <Landmark class="w-4 h-4 shrink-0" />
        <span>Үзвэр & Аялал</span>
        <span class="text-[10px] opacity-80 font-mono">(20)</span>
      </button>

      <button
        @click="activeCategory = 'malls'"
        class="flex-1 shrink py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
        :class="
          activeCategory === 'malls'
            ? 'bg-amber-500 text-black shadow-md'
            : 'text-slate-300 hover:text-white hover:bg-[#1b2637]'
        "
      >
        <ShoppingBag class="w-4 h-4 shrink-0" />
        <span>Шопинг & Молл</span>
        <span class="text-[10px] opacity-80 font-mono">(10)</span>
      </button>

      <button
        @click="activeCategory = 'cafes'"
        class="flex-1 shrink py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
        :class="
          activeCategory === 'cafes'
            ? 'bg-amber-500 text-black shadow-md'
            : 'text-slate-300 hover:text-white hover:bg-[#1b2637]'
        "
      >
        <Coffee class="w-4 h-4 shrink-0" />
        <span>Кафе & Бэйкери</span>
        <span class="text-[10px] opacity-80 font-mono">(20)</span>
      </button>
    </div>

    <!-- Sub Filters (City & Distance) -->
    <div
      class="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-[#2f3f58] pb-3 whitespace-nowrap"
    >
      <button
        @click="cityFilter = 'all'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
        :class="
          cityFilter === 'all'
            ? 'bg-slate-200 text-black font-bold'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Бүх хот
      </button>
      <button
        @click="cityFilter = 'near'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
        :class="
          cityFilter === 'near'
            ? 'bg-emerald-500 text-black font-bold'
            : 'bg-[#1b2637] text-emerald-400 hover:bg-[#26344a]'
        "
      >
        <Hotel class="w-3.5 h-3.5" />
        <span>Буудалд ойрхон</span>
      </button>
      <button
        @click="cityFilter = 'shanghai'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
        :class="
          cityFilter === 'shanghai'
            ? 'bg-blue-500 text-white font-bold'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Shanghai · 上海
      </button>
      <button
        @click="cityFilter = 'ningbo'"
        class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0"
        :class="
          cityFilter === 'ningbo'
            ? 'bg-amber-500 text-black font-bold'
            : 'bg-[#1b2637] text-slate-300 hover:bg-[#26344a]'
        "
      >
        Ningbo · 宁波
      </button>
    </div>

    <!-- Category Intro Banner -->
    <div
      v-if="activeCategory === 'attractions'"
      class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 text-xs text-blue-200 flex items-center gap-3"
    >
      <Landmark class="w-5 h-5 text-blue-400 shrink-0" />
      <span
        ><b>10 Шанхай + 10 Нинбо үзвэр:</b> Ихэнх нь ороход үнэгүй, түүхэн болон
        зураг авахад нэн тохиромжтой шилдэг газрууд.</span
      >
    </div>

    <div
      v-if="activeCategory === 'malls'"
      class="bg-pink-500/10 border border-pink-500/20 rounded-xl p-3.5 text-xs text-pink-200 flex items-center gap-3"
    >
      <Sparkles class="w-5 h-5 text-pink-400 shrink-0" />
      <span
        ><b>Эмэгтэйчүүдийн Шопинг Молл (5 Шанхай + 5 Нинбо):</b> Гоо сайхан,
        Солонгос/Япон косметик, Зара, Sephora, POP MART, хувцас ба брэнд
        дэлгүүрүүд.</span
      >
    </div>

    <div
      v-if="activeCategory === 'cafes'"
      class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 text-xs text-amber-200 flex items-center gap-3"
    >
      <Coffee class="w-5 h-5 text-amber-400 shrink-0" />
      <span
        ><b>20 Күт Кафе & Бэйкери (10 Шанхай + 10 Нинбо):</b> Шанхай ба
        Нинбогийн хамгийн их хандалттай, амттай кэйк, кофе, жимсний цай ба фото
        бүсүүд.</span
      >
    </div>

    <!-- Cards List -->
    <div class="space-y-6">
      <div
        v-for="(item, index) in currentDisplayItems"
        :key="item.name + index"
        class="bg-[#1b2637] border border-[#2f3f58] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-lg hover:border-amber-500/40 transition-all duration-200"
      >
        <!-- Map Frame Container -->
        <div
          class="w-full md:w-5/12 h-60 md:h-auto bg-[#131b29] relative flex shrink-0"
        >
          <iframe
            loading="lazy"
            :src="item.mapUrl"
            class="w-full h-full border-0 min-h-[220px]"
            title="Location Map"
          ></iframe>
          <div
            class="absolute top-3 left-3 bg-[#131b29]/90 backdrop-blur border border-[#2f3f58] px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-amber-400"
          >
            {{ item.city }}
          </div>
        </div>

        <!-- Content Details -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <!-- Badges -->
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span
                v-if="item.isNearHotel"
                class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"
              >
                <Hotel class="w-3 h-3" />
                <span>Буудалд ойрхон</span>
              </span>
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30"
              >
                {{ item.cost }}
              </span>
              <span
                class="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-[#131b29] border border-[#2f3f58]"
              >
                {{ item.chineseName }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-base sm:text-lg font-bold text-slate-100 mb-1">
              {{ index + 1 }}. {{ item.name }}
            </h3>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
              {{ item.desc }}
            </p>

            <!-- Key Brands / Highlights if applicable -->
            <div
              v-if="item.highlights"
              class="mb-3 text-xs text-pink-300 bg-pink-500/10 border border-pink-500/20 p-2.5 rounded-lg flex items-start gap-1.5"
            >
              <Sparkles class="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong class="font-semibold text-pink-200"
                  >Брэнд ба онцлог:
                </strong>
                <span>{{ item.highlights }}</span>
              </div>
            </div>

            <!-- Directions & Metro box -->
            <div
              class="bg-[#131b29] border border-[#2f3f58] rounded-xl p-3 space-y-2 text-xs"
            >
              <div class="flex items-start gap-2 text-sky-300 font-medium">
                <Navigation class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold text-amber-400 font-mono"
                    >Яаж очих (Метро / Автобус / Зам):</span
                  >
                  <p class="text-slate-200 mt-0.5">{{ item.transportInfo }}</p>
                </div>
              </div>
              <div
                v-if="item.hotelDistance"
                class="flex items-center gap-2 text-emerald-400 pt-1 border-t border-[#2f3f58]/60 font-mono"
              >
                <Footprints class="w-3.5 h-3.5" />
                <span>Буудлаас: {{ item.hotelDistance }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div
            class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2f3f58]"
          >
            <CopyButton
              :text="item.chineseName"
              :label="'Хятад нэр: ' + item.chineseName"
            />
            <a
              :href="item.googleMapLink"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-white font-medium hover:underline"
            >
              <ExternalLink class="w-3.5 h-3.5" />
              <span>Google Maps дээр нээх</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Landmark,
  ShoppingBag,
  Coffee,
  Hotel,
  Navigation,
  Footprints,
  ExternalLink,
  Sparkles,
} from "lucide-vue-next";
import CopyButton from "../components/CopyButton.vue";

const activeCategory = ref("attractions"); // 'attractions' | 'malls' | 'cafes'
const cityFilter = ref("all"); // 'all' | 'near' | 'shanghai' | 'ningbo'

// 1. MUST-VISIT ATTRACTIONS (20 Total: 10 Shanghai + 10 Ningbo)
const attractionsData = [
  // --- SHANGHAI (10) ---
  {
    city: "Shanghai · 上海",
    name: "Jing'an Temple & Park (Жингань алтан сүм ба парк)",
    chineseName: "静安寺 / 静安公园",
    isNearHotel: true,
    cost: "Парк ҮНЭГҮЙ (Сүм $7)",
    desc: "Шанхайн хамгийн алдартай, эртний алтан сүм болон түүний эсрэг талын үзэсгэлэнт ногоон парк. Орчин үеийн тэнгэр баганадсан барилгуудын дундах амар тайван баянбүрд.",
    transportInfo:
      "Metro Line 2 эсвэл Line 7-оор Jing'an Temple Station (静安寺站) бууна. 1 эсвэл 2-р гарахаар гараад 1 мин алхана.",
    hotelDistance:
      "Shanghai Home Stay буудлаас ердөө 2–3 минут явган алхана (~200 метр)",
    mapUrl:
      "https://maps.google.com/maps?q=Jing%27an+Temple,+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Jing%27an+Temple+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Nanjing Road Pedestrian Street (Нанжингийн худалдааны гудамж)",
    chineseName: "南京东路步行街",
    isNearHotel: true,
    cost: "ҮНЭГҮЙ",
    desc: "Хятадын хамгийн алдартай дэлгүүр, худалдаа, неонон гэрэлт гудамж. Энд алхаж худалдааны төвүүд, бэлэг дурсгал болон Шанхай хотын гудамжны амттай хоолыг амтлах болон зураг авахад тохиромжтой.",
    transportInfo:
      "Буудлаас Metro Line 2 (Jing'an Temple) сууж People's Square эсвэл East Nanjing Road буудал дээр бууна.",
    hotelDistance: "Буудлаас Метро Line 2-оор шууд 8–10 минут явна",
    mapUrl:
      "https://maps.google.com/maps?q=Nanjing+Road+Pedestrian+Street+Shanghai&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Nanjing+Road+Pedestrian+Street+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "People's Park & Square (Ардын паркийн талбай)",
    chineseName: "人民广场 / 人民公园",
    isNearHotel: true,
    cost: "ҮНЭГҮЙ",
    desc: "Шанхай хотын төвд орших тохилог ногоон парк, музей, бадамлянхуа цөөрөм болон урлагийн музейн орчин. Амрах, зугаалахад нэн тохиромжтой.",
    transportInfo:
      "Jing'an Temple буудлаас Metro Line 2 эсвэл Line 1 суугаад People's Square Station (人民广场站) буудалд бууна.",
    hotelDistance: "Буудлаас Метро Line 2-оор 2 зогсоол (~6 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=People%27s+Square+Shanghai&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=People%27s+Square+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "The Bund Waterfront (Вайнтань эрэг ба Шанхайн тэнгэрийн хаяа)",
    chineseName: "外滩",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Шанхайн нэрийн хуудас болсон хуучны Европын загвартай барилгууд болон Хуанпу голын цаана харагдах Oriental Pearl цамхаг, Shanghai Tower-ийн агуу харагдац.",
    transportInfo:
      "Metro Line 2 (East Nanjing Road Station) дээр буугаад Exit 2-оор гараад 500 метр зүүн тийш гол руу алхана.",
    hotelDistance: "Jing'an Temple-ээс Line 2-оор 4 зогсоол (~12 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=The+Bund+Shanghai&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=The+Bund+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Tianzifang Arts & Crafts Alley (Тианьзифан урлагийн гудамж)",
    chineseName: "田子坊",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Шанхайн хуучны Шикүмэнь хийцийн нарийн гудамж бүхий урлаг, гар урлал, кафе, бэлэг дурсгал болон гэрэл зураг авах хамгийн дурсгалт газар.",
    transportInfo:
      "Metro Line 9-өөр Dapuqiao Station (打浦桥站) буудалд буугаад Exit 1-ээр гарахад яг гудамжны үүдэнд очно.",
    hotelDistance:
      "Jing'an Temple-ээс Metro Line 7 эсвэл Line 9 дамжин ~15 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Tianzifang+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Tianzifang+Shanghai",
  },
  {
    city: "Shanghai · Shanghai",
    name: "Yu Garden & Traditional Bazaar (Юй цэцэрлэгт хүрээлэн & Базар)",
    chineseName: "豫园 / 豫园商城",
    isNearHotel: false,
    cost: "Базар ҮНЭГҮЙ (Дотор парк $6)",
    desc: "Мин гүрний үеийн уламжлалт хятад архитектур, бадамлянхуа цөөрөм, зангилаатай гүүр болон амттай бууз, сувенирийн базар.",
    transportInfo:
      "Metro Line 10 эсвэл Line 14-өөр Yuyuan Station (豫园站) буудалд буугаад Exit 1-ээр гараад 5 минут алхана.",
    hotelDistance: "Jing'an Temple-ээс Line 14-өөр шууд 4 зогсоол (~10 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Yu+Garden+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Yu+Garden+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Former French Concession & Wukang Mansion (Вукан гудамж & Түүхэн барилга)",
    chineseName: "武康路 / 武康大楼",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Шанхайн хамгийн гоё зургийн бүс. 1920-од оны Франц загварын гудамж, алдартай Wukang Mansion барилга, платаны модтой сүүдэртэй замууд.",
    transportInfo:
      "Metro Line 10 эсвэл Line 11-өөр Jiao Tong University Station (交通大学站) буугаад Exit 7-оор гараад Вукан зам руу орно.",
    hotelDistance:
      "Jing'an Temple-ээс таксигаар 10 минут эсвэл Метрогоор 12 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Wukang+Mansion+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Wukang+Mansion+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Xintiandi Historic Precinct (Шинтианди түүхэн ба орчин үеийн бүс)",
    chineseName: "新天地",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Хуучны Хятад чулуун байшингуудыг орчин үеийн ресторан, кафе, бутикуудтай хослуулсан европ маягийн нээлттэй гудамж.",
    transportInfo:
      "Metro Line 10 эсвэл Line 13-аар Xintiandi Station (新天地站) буугаад Exit 6-аар гарахад бэлэн.",
    hotelDistance: "Jing'an Temple-ээс Metro Line 13-аар 3 зогсоол (~8 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Xintiandi+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Xintiandi+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Lujiazui Elevated Pedestrian Skywalk (Лужиазуй цамхагуудын тойрог гүүр)",
    chineseName: "陆家嘴环形天桥",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Oriental Pearl, Shanghai Tower зэрэг дэлхийн хамгийн өндөр барилгуудыг дээрээс нь болон доороос нь тод харах дугуй хэлбэртэй агаарын явган гүүр.",
    transportInfo:
      "Metro Line 2-оор Lujiazui Station (陆家嘴站) буугаад Exit 1-ээр гарахад шууд гүүрэн дээр гарна.",
    hotelDistance: "Jing'an Temple-ээс Line 2-оор 5 зогсоол (~14 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Lujiazui+Skywalk+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Lujiazui+Skywalk+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "West Bund Riverside Promenade & Art Mile (Вест Банд голын эрэг)",
    chineseName: "西岸滨江",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Хуанпу голын дагуух орчин үеийн залуусын амралтын бүс. Чөлөөт цагаа өнгөрөөх, салхилах, орчин үеийн урлагийн галерейнууд харах боломжтой.",
    transportInfo:
      "Metro Line 11-ээр Yunjin Road Station (云锦路站) буугаад Exit 2-оор голын эрэг рүү 500м алхана.",
    hotelDistance: "Jing'an Temple-ээс Метро Line 7/11-ээр ~18 минут",
    mapUrl:
      "https://maps.google.com/maps?q=West+Bund+Shanghai&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=West+Bund+Shanghai",
  },

  // --- NINGBO (10) ---
  {
    city: "Ningbo · 宁波",
    name: "Beilun Central Park (Бэйлунь төв парк ба залуучуудын талбай)",
    chineseName: "北仑中心公园",
    isNearHotel: true,
    cost: "ҮНЭГҮЙ",
    desc: "Нинбо хотын Бэйлунь дүүргийн төв парк. Том нуур, усан оргилуур, гүйлтийн зам, орчин үеийн гэрэлтүүлэгтэй тул оройдоо салхилахад маш тухтай.",
    transportInfo:
      "Буудлаас шууд явган алхах эсвэл Автобус 789/753 суугаад Central Park зогсоол дээр бууна.",
    hotelDistance:
      "Huihe Ruyu Hotel буудлаас ердөө ~1.2 км (15 минут алхана эсвэл $1 такси)",
    mapUrl:
      "https://maps.google.com/maps?q=Beilun+Central+Park+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Beilun+Central+Park+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "China Port Museum (Хятадын далайн боомтын музей)",
    chineseName: "中国港口博物馆",
    isNearHotel: true,
    cost: "ҮНЭГҮЙ (Паспортаар)",
    desc: "Бэйлуньд байрлах Хятадын хамгийн том далайн ба боомтын үндэсний музей. Орчин үеийн интерактив үзмэрүүд болон Торгоны далайн замын түүхийг харуулдаг.",
    transportInfo:
      "Буудлаас Автобус 708/790 эсвэл Didi таксигаар ~12-15 минут яваад бэлэн очино.",
    hotelDistance:
      "Huihe Ruyu Hotel буудлаас ~8 км (~12 минут такси / автобус)",
    mapUrl:
      "https://maps.google.com/maps?q=China+Port+Museum+Ningbo&hl=en&z=14&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=China+Port+Museum+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Phoenix Mountain & Starlight Square (Феникс уул & Одон талбай)",
    chineseName: "凤凰山 / 凤凰里",
    isNearHotel: true,
    cost: "ҮНЭГҮЙ",
    desc: "Бэйлунь дэх цэцэрлэгт хүрээлэн, нуур ба оройн цагаар залуус цугладаг амралтын гудамж, гэрэлт гудамж.",
    transportInfo:
      "Буудлаас Метро Line 1 (Changjiang Road Station) буудалд суугаад 1 зогсоол эсвэл явган 15 минут алхана.",
    hotelDistance: "Huihe Ruyu Hotel буудлаас ердөө 1.5 км",
    mapUrl:
      "https://maps.google.com/maps?q=Phoenix+Mountain+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Phoenix+Mountain+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Tianyi Square & Music Fountain (Тианьи талбай ба хөгжимт усан оргилуур)",
    chineseName: "天一广场",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Нинбо хотын хамгийн ачаалалтай худалдааны ба амралтын төв талбай. Оройн цагаар хөгжимт усан оргилуурын шоу болж, дэлгүүр болон хоолны газрууд ажилладаг.",
    transportInfo:
      "Metro Line 1-ээр Dongmenkou Station (东门口站) дээр буугаад Exit A-аар шууд талбай руу гарна.",
    hotelDistance:
      "Нинбо галт тэрэгний буудлаас Метро Line 2 + Line 1 замаар 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Tianyi+Square+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Tianyi+Square+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Moon Lake Park & Historic Pavilion (Сарны нуур ба түүхэн цэцэрлэгт хүрээлэн)",
    chineseName: "月湖公园",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Нинбо хотын төвд орших эртний Сун гүрний үеийн үзэсгэлэнт нуур, Хятад уламжлалт пагода, гүүр, ногоон баянбүрд.",
    transportInfo:
      "Metro Line 2-оор Ningbo Railway Station-аас 1 зогсоол яваад Changdeng (城隍庙) эсвэл Line 1-ийн Ximen (西门口) дээр бууна.",
    hotelDistance: "Нинбо Галт тэрэгний буудлаас ердөө 1 км (15 мин алхана)",
    mapUrl:
      "https://maps.google.com/maps?q=Moon+Lake+Park+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Moon+Lake+Park+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Ningbo Museum (Нинбо хотын үндэсний музей)",
    chineseName: "宁波博物馆",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ (Паспортаар)",
    desc: "Прицкер шагналт архитектор Ван Шүгийн бүтээсэн дэлхийд алдартай байгалийн хавтан бүхий барилга ба Нинбо хотын 7000 жилийн түүхийн музей.",
    transportInfo:
      "Metro Line 3-аар Yinzhou Government (鄞州区政府站) буудалд буугаад Exit HP-аар гараад 800м алхана.",
    hotelDistance: "Ningbo Railway Station-аас Метро Line 3-аар 15 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Ningbo+Museum&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Ningbo+Museum",
  },
  {
    city: "Ningbo · 宁波",
    name: "Ningbo Old Bund / Lao Waitan (Нинбогийн түүхэн хуучин эрэг)",
    chineseName: "老外滩",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Шанхайн Вайнтаниас ч хуучин, 1844 оны Европын тоосгон сүм барилгууд, голын эрэг дагуух кафе, ресторан, оройн гэрэлт гудамж.",
    transportInfo:
      "Metro Line 2-оор Basic Bridge Station (外滩大桥站) буудалд буугаад Exit B-ээр гараад 300м алхана.",
    hotelDistance:
      "Ningbo Railway Station-аас Метро Line 2-оор 3 зогсоол (~8 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Old+Bund+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Old+Bund+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Tianyi Pavilion Library & Garden (Тианьи номын сан & Парк)",
    chineseName: "天一阁",
    isNearHotel: false,
    cost: "Базарын талбай ҮНЭГҮЙ (Дотор музей $4)",
    desc: "Азийн хамгийн эртний бөгөөд одоог хүртэл хадгалагдан үлдсэн 1561 оны хувийн номын сан, Хятад уламжлалт чулуун багц цэцэрлэг.",
    transportInfo:
      "Metro Line 1-ээр Ximenk口 Station (西门口站) буудалд буугаад Exit D-ээр гараад 500м алхана.",
    hotelDistance: "Ningbo Station-аас Метро Line 2/1 замаар ~10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Tianyi+Pavilion+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Tianyi+Pavilion+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Nantang Ancient Water Street (Нантан түүхэн усан гудамж)",
    chineseName: "南塘老街",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ",
    desc: "Уламжлалт Хятад усан замын дагуух эртний гудамж. Нинбо хотын бүх төрлийн үндэсний амттан, жигнэсэн бууз, бэлэг дурсгал энд байдаг.",
    transportInfo:
      "Ningbo Railway Station-аас өмнө тийш ердөө 800 метр (10 минут алхана) эсвэл Метро Line 2 (Yunxia Road Station).",
    hotelDistance: "Ningbo Railway Station-аас маш ойрхон (10 мин явган)",
    mapUrl:
      "https://maps.google.com/maps?q=Nantang+Ancient+Street+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Nantang+Ancient+Street+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Dongqian Lake & Xiaopu Scenic Spot (Дунчиань нуур ба арал)",
    chineseName: "东钱湖 / 小普陀",
    isNearHotel: false,
    cost: "ҮНЭГҮЙ (Зарим бүс $2-3)",
    desc: "Захай нуураас 4 дахин том үзэсгэлэнт нуур. Нуурын дундах урт далан, завин аялал, цэвэр агаар, байгалийн амар тайван орчин.",
    transportInfo:
      "Metro Line 4-өөр Dongqian Lake Station (东钱湖站) буудалд буугаад 960 эсвэл 906 дугаартай автобусаар 10 мин явна.",
    hotelDistance: "Ningbo Station-аас Метро Line 4-өөр ~25 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Dongqian+Lake+Ningbo&hl=en&z=13&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Dongqian+Lake+Ningbo",
  },
];

// 2. SHOPPING MALLS (10 Malls: 5 Shanghai + 5 Ningbo)
const shoppingMallsData = [
  // --- SHANGHAI MALLS (5) ---
  {
    city: "Shanghai · 上海",
    name: "Jiuguang Dept Store & Jing'an Kerry Centre (Жиүгуан & Жингань Кэрри)",
    chineseName: "久光百货 / 静安嘉里中心",
    isNearHotel: true,
    cost: "Молл (Бүх төрлийн үнэ)",
    highlights:
      "Япон/Солонгос гоо сайхан, Sephora, Chanel, Dior cosmetics, Zara, Uniqlo, B2 давхрын амттан ба супермаркет",
    desc: "Шанхай дахь буудлын яг дэргэд байрлах хамгийн том luxury ба эмэгтэйчүүдийн хувцас, косметикийн молл. Дэлхийн томоохон гоо сайхны брэндүүд цугласан.",
    transportInfo:
      "Jing'an Temple Station (静安寺站) Exit 1 эсвэл 2. Метроноос шууд B2 B1 давхар руу орно.",
    hotelDistance: "Буудлаас ердөө 150-200 метр явган алхана (2 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Jing%27an+Kerry+Centre+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Jing%27an+Kerry+Centre+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "IAPM Luxury & Fashion Mall (IAPM Их дэлгүүр)",
    chineseName: "环贸iapm商场",
    isNearHotel: false,
    cost: "Премиум & Бренд",
    highlights:
      "Gentle Monster, POP MART, YSL, Gucci, Dior, Zara, COS, Lululemon, оройн 23:00 хүртэл онгорхой",
    desc: "Шанхайн эмэгтэйчүүдийн хамгийн дуртай загварын их дэлгүүр. Залуусын брэндүүд, нарны шил, тренд хувцас ба хоолны давхруудтай.",
    transportInfo:
      "Metro Line 1, Line 10, Line 12-оор South Shaanxi Road Station (陕西南路站) бууж шууд B2-оор орно.",
    hotelDistance: "Jing'an Temple-ээс Метро Line 7 / Line 1 замаар 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=IAPM+Mall+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=IAPM+Mall+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "TX Huaihai Youth Energy Complex (TX Хуайхай дизайнер молл)",
    chineseName: "TX淮海年轻力中心",
    isNearHotel: false,
    cost: "Тренд & Дизайнер",
    highlights:
      "Хятадын биеэ даасан дизайнер брэндүүд, стильтэй эмэгтэй хувцас, поп-ап дэлгүүр, зураг авах фото зонууд",
    desc: "Шанхайн охид залуусын хандлага тодорхойлдог концепт молл. Хэзээ ч давтагдашгүй хувцас, аксесуар болон фото концептуудтай.",
    transportInfo:
      "Metro Line 13 Site of First CPC National Congress · Xintiandi буудал эсвэл Line 1 South Huangpi Rd.",
    hotelDistance: "Jing'an Temple-ээс Metro Line 13 эсвэл таксигаар 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=TX+Huaihai+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=TX+Huaihai+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Global Harbor Mall (Глобал Харбор - Европын кастл молл)",
    chineseName: "环球港",
    isNearHotel: false,
    cost: "Бүх төрөл (Дундаж & Брэнд)",
    highlights:
      "400+ эмэгтэй хувцасны дэлгүүр, Zara, UR (Urban Revivo), Uniqlo, Mango, Sephora, Солонгос косметик, гоо сайхны салон",
    desc: "Шанхайн хамгийн том Европын замок хийцтэй молл. Эмэгтэйчүүдэд зориулсан бүх төрлийн брэнд хувцас, гутал, цүнх нэг дор.",
    transportInfo:
      "Metro Line 3, Line 4, Line 13-аар Jinshajiang Road Station (金沙江路站) буухад шууд молл дотор гарна.",
    hotelDistance: "Jing'an Temple-ээс Метро Line 2/3 замаар 12 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Global+Harbor+Shanghai&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Global+Harbor+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Shanghai IFC Mall Lujiazui (ИФС Дэлхийн брэнд молл)",
    chineseName: "上海国金中心IFC",
    isNearHotel: false,
    cost: "Luxury Брэндүүд",
    highlights:
      "Chanel, Dior, Hermès, Louis Vuitton, Cartier, Tiffany & Co, high-end гоо сайхны флагшип дэлгүүрүүд",
    desc: "Дэлхийн хамгийн тансаг luxury брэндүүдийн иж бүрэн цуглуулга. Алдартай брэндүүдийн хамгийн сүүлийн үеийн цуглуулгуудыг харах ба худалдан авахад тохиромжтой.",
    transportInfo:
      "Metro Line 2-оор Lujiazui Station (陆家嘴站) Exit 6-аар шууд IFC молл руу орно.",
    hotelDistance: "Jing'an Temple-ээс Line 2-оор 5 зогсоол (~14 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Shanghai+IFC+Mall&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Shanghai+IFC+Mall",
  },

  // --- NINGBO MALLS (5) ---
  {
    city: "Ningbo · 宁波",
    name: "Beilun Intime Department Store (Бэйлунь Интай молл)",
    chineseName: "北仑银泰城",
    isNearHotel: true,
    cost: "Дундаж & Брэнд",
    highlights:
      "Sephora, Perfect Diary, Miniso, Zara, UR, Uniqlo, Солонгос хувцас, амттай бөмбөлөгтэй цай (Heytea, Chagee)",
    desc: "Нинбогийн буудлаас ердөө 1.5 км зайтай хамгийн том худалдааны молл. Эмэгтэй хувцас, гоо сайхан, цүнх аксесуар иж бүрэн.",
    transportInfo:
      "Буудлаас явган 15 минут эсвэл Метро Line 1 (Changjiang Road Station) бууж 1 зогсоол / $1 такси.",
    hotelDistance: "Huihe Ruyu Hotel буудлаас 1.5 км (Таксигаар 3 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Beilun+Intime+Department+Store+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Beilun+Intime+Department+Store+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Tianyi Square Shopping District (Тианьи худалдааны бүс)",
    chineseName: "天一广场",
    isNearHotel: false,
    cost: "Бүх төрөл",
    highlights:
      "Их дэлгүүрүүд, Sephora, Apple Store, хувцасны бутикууд, үнэт эдлэл, гоо сайхны том лангуунууд",
    desc: "Нинбо хотын хамгийн том ил задгай шоппинг цогцолбор. Олон зуун хувцас, брэнд дэлгүүрүүд болон хоолны газруудтай.",
    transportInfo:
      "Metro Line 1-ээр Dongmenkou Station (东门口站) Exit A-аар шууд талбай руу гарна.",
    hotelDistance: "Ningbo Railway Station-аас Метро Line 2/1-ээр 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Tianyi+Square+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Tianyi+Square+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Ningbo Heyi Avenue Shopping Center (Хэи Авеню Luxury молл)",
    chineseName: "和义大道购物中心",
    isNearHotel: false,
    cost: "Luxury & Брэнд",
    highlights:
      "Louis Vuitton, Gucci, Dior, Chanel cosmetics, Cartier, тансаг зэрэглэлийн эмэгтэй хувцасны танхимууд",
    desc: "Нинбо хотын голын эрэг дээрх хамгийн тансаг молл. Тансаг брэндүүд ба гоо сайхны салбарууд цугласан.",
    transportInfo:
      "Metro Line 1 Dongmenkou Station эсвэл Line 2 Gulou Station-аас 500м алхана.",
    hotelDistance: "Tianyi Square-ийн чанх хойно голын дагуу байрлалтай",
    mapUrl:
      "https://maps.google.com/maps?q=Heyi+Avenue+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Heyi+Avenue+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Ningbo Raffles City Mall (Раффлс Сити Их дэлгүүр)",
    chineseName: "宁波来福士广场",
    isNearHotel: false,
    cost: "Залуусын Тренд",
    highlights:
      "Сингапур загварын молл, залуусын хувцасны брендэд, косметик, стильтэй кафе, шинэ тренд зүйлс",
    desc: "Залуу эмэгтэйчүүдэд зориулсан орчин үеийн тухтай молл. Шинэ үеийн Ази ба Европын хувцасны брэндүүдтэй.",
    transportInfo:
      "Metro Line 2-оор Waitan Bridge Station (外滩大桥站) Exit B-ээр гарахад молл дотор гарна.",
    hotelDistance: "Ningbo Station-аас Line 2-оор 3 зогсоол (~8 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Raffles+City+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Raffles+City+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Yinzhou Wanda Plaza (Инжоу Ванда плаза)",
    chineseName: "鄞州万达广场",
    isNearHotel: false,
    cost: "Хямд & Боломжийн",
    highlights:
      "Хятадын үндэсний гоо сайхны дэлгүүрүүд, бэлэн хувцас, гутал цүнхний хямд дэлгүүрүүд, хүүхэд ба эмэгтэйчүүдийн бүс",
    desc: "Нинбо хотын хамгийн их хөл хөдөлгөөнтэй, боломжийн үнэтэй бараа бүтээгдэхүүн ихтэй залуусын их дэлгүүр.",
    transportInfo: "Metro Line 3-аар Yinzhou Wanda Station бууж шууд орно.",
    hotelDistance: "Ningbo Station-аас Метро Line 3-аар 12 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Yinzhou+Wanda+Plaza+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Yinzhou+Wanda+Plaza+Ningbo",
  },
];

// 3. CUTE CAFES & BAKERIES (20 Cafes: 10 Shanghai + 10 Ningbo)
const cafesData = [
  // --- SHANGHAI CAFES (10) ---
  {
    city: "Shanghai · 上海",
    name: "MANNER Coffee Glasshouse (Жингань Парк дахь шилэн кафе)",
    chineseName: "MANNER 咖啡 (静安公园店)",
    isNearHotel: true,
    cost: "Кофе $2 – 3.5 (Амттай & Хямд)",
    highlights:
      "Парк доторх шилэн байшин, эспрессо, овъёосны латте, матча, зураг авахад нэн үзэсгэлэнтэй",
    desc: "Шанхайн алдартай MANNER сүлжээний хамгийн гоё паркийн салбар. Шанхайн Home Stay буудлаас 3 мин алхаад ногоон модон дунд кофе ууна.",
    transportInfo:
      "Jing'an Temple Station Exit 5. Жингань паркийн гол хаалгаар орно.",
    hotelDistance: "Shanghai Home Stay буудлаас ердөө 200 метр (3 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Manner+Coffee+Jing%27an+Park+Shanghai&hl=en&z=17&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Manner+Coffee+Jing%27an+Park+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Butterful & Creamorous Bakery (Нанжин зам дахь алдартай бэйкери)",
    chineseName: "Butterful & Creamorous (面包黄油与奶油)",
    isNearHotel: true,
    cost: "Круассан $3 – 5",
    highlights:
      "Ногоон цаасан уут, том шоколадтай ба кремтэй круассан, гүзээлзгэнэтэй амттангууд, супер фото бүс",
    desc: "Шанхай дахь хамгийн тренд болж буй Франц бэйкери. Охидын дуртай кремтэй круассан ба тортнуудтай.",
    transportInfo:
      "Metro Line 2/12/13 West Nanjing Road Station бууж Exit 11-ээс 200м алхана.",
    hotelDistance: "Jing'an Temple-ээс Метро Line 2-оор 1 зогсоол (~3 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Butterful+Creamorous+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Butterful+Creamorous+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Peet's Coffee & Bakery Terrace (Жингань Кэрри Сити салбар)",
    chineseName: "Peet's Coffee (静安嘉里中心店)",
    isNearHotel: true,
    cost: "Кофе & Кэйк $4 – 7",
    highlights:
      "Ил террас судал, тусгай хууран агаартай кофе, Франц тарпи болон круассан",
    desc: "Шанхайн тухтай террастай премиум кофе шоп. Өглөөний цай болон өдрийн амралтад нэн тохиромжтой.",
    transportInfo:
      "Jing'an Kerry Centre-ийн 1-р давхрын гадна талбайд байрлана.",
    hotelDistance: "Буудлаас ердөө 2 минут явган алхана",
    mapUrl:
      "https://maps.google.com/maps?q=Peet%27s+Coffee+Jing%27an+Kerry+Shanghai&hl=en&z=17&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Peet%27s+Coffee+Jing%27an+Kerry+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Luneurs French Bakery & Gelato (Вукан гудамжны Франц кафе)",
    chineseName: "Luneurs (武康路店)",
    isNearHotel: false,
    cost: "Дөхөм ба зайрмаг $3 – 6",
    highlights:
      "Гараар хийсэн Франц Gelato зайрмаг, давстай карамельтай круассан, гудамжны гоё сандалтай зураг",
    desc: "Шанхайн хамгийн алдартай Вукан гудамжны Франц бэйкери ба зайрмагны газар. Охидын зураг авхуулдаг ТОП газар.",
    transportInfo:
      "Metro Line 10/11 Jiao Tong University Station бууж Вукан зам руу алхана.",
    hotelDistance: "Jing'an Temple-ээс таксигаар 8 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Luneurs+Wukang+Road+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Luneurs+Wukang+Road+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "RAC Coffee & Creperie (Анфу гудамжны ногоон цонхтой кафе)",
    chineseName: "RAC Coffee (安福路店)",
    isNearHotel: false,
    cost: "Кофе ба брекфаст $5 – 10",
    highlights:
      "Ногоон жаазтай цонхтой фото бүс, авокадотой тост, Франц блинчик (Galette), эспрессо",
    desc: "Шанхай дахь залуусын хамгийн их очиж зураг авхуулдаг ногоон хаалгатай стильтэй кафе.",
    transportInfo:
      "Metro Line 1/7 Changshu Road Station бууж Exit 8-аар гараад Анфу зам руу 5 мин алхана.",
    hotelDistance: "Jing'an Temple-ээс явган 15 мин эсвэл таксигаар 5 мин",
    mapUrl:
      "https://maps.google.com/maps?q=RAC+Coffee+Anfu+Road+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=RAC+Coffee+Anfu+Road+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Basdban Futuristic Bakery (Басдбан хар круассан ба кафе)",
    chineseName: "Basdban (愚园路店)",
    isNearHotel: false,
    cost: "Круассан & Кофе $4 – 7",
    highlights:
      "Ирээдүйн металл интерьер, хар өнгөтэй круассан, матча лава кэйк, тусгай латте",
    desc: "Ююань гудамжинд орших футуристик стильтэй маш алдартай бэйкери. Сонирхолтой амттангуудтай.",
    transportInfo:
      "Metro Line 2/11 Jiangsu Road Station Exit 2-оор гараад 300м алхана.",
    hotelDistance: "Jing'an Temple-ээс Метро Line 2-оор 1 зогсоол",
    mapUrl:
      "https://maps.google.com/maps?q=Basdban+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Basdban+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Sunflour Bakery & Sun Croissant (Санфлауэр наран бэйкери)",
    chineseName: "Sunflour (阳光房)",
    isNearHotel: false,
    cost: "Талх & Цай $3 – 6",
    highlights:
      "Нарны хэлбэртэй алдартай Little Sun круассан, далайн давстай талх, нарны гэрэлтэй нарлаг өрөө",
    desc: "Шанхайн тухтай, шинэхэн барьсан талхны үнэр ханхалсан охидын дуртай бэйкери кафе.",
    transportInfo:
      "Metro Line 10 Shanghai Library Station Exit 3-аар гараад 400м алхана.",
    hotelDistance: "Jing'an Temple-ээс таксигаар 8 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Sunflour+Bakery+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Sunflour+Bakery+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "1/1000 Floral Pink Cafe (Ягаан цэцэгт концепт кафе)",
    chineseName: "千分之一咖啡",
    isNearHotel: true,
    cost: "Кофе $3 – 5",
    highlights:
      "Ягаан өнгийн гоё интерьер, цэцгэн чимэглэл, тусгай жимсний латте, дээд талын фото бүс",
    desc: "Охидод зориулсан тусгай ягаан өнгийн цэцэгсээр чимэглэсэн маш хөөрхөн зураг авах кафе.",
    transportInfo: "Jing'an Temple орчмоос явган 10 минут эсвэл Метро Line 7.",
    hotelDistance: "Jing'an Temple буудлаас 800 метр",
    mapUrl:
      "https://maps.google.com/maps?q=Jing%27an+Temple+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Jing%27an+Temple+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "A3 Specialty Coffee & Strawberry Cake (Шинтианди А3 кафе)",
    chineseName: "A3 咖啡",
    isNearHotel: false,
    cost: "Кэйк & Кофе $5 – 8",
    highlights:
      "Шинэхэн гүзээлзгэнэтэй шифон кэйк, Dirty латте, Европын гудамжны сандал",
    desc: "Шинтианди гудамжны хамгийн тухтай, нарийн боов ба тусгай кофены академи-кафе.",
    transportInfo:
      "Metro Line 10/13 Xintiandi Station бууж Exit 6-аас 300м алхана.",
    hotelDistance: "Jing'an Temple-ээс Line 13-аар 3 зогсоол",
    mapUrl:
      "https://maps.google.com/maps?q=Xintiandi+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Xintiandi+Shanghai",
  },
  {
    city: "Shanghai · 上海",
    name: "Heytea & Bakery Flagship (Нанжин замын Хэйтий флагшип)",
    chineseName: "喜茶 (南京东路店)",
    isNearHotel: false,
    cost: "Жимсний цай $2.5 – 4",
    highlights:
      "Шинэхэн усан үзэм ба манготой цөцгийтэй жимсний цай, хөөстэй боба, шинэхэн барьсан талх",
    desc: "Хятадын #1 алдартай Heytea бренд. Жинхэнэ жимс, цөцгийтэй сүүтэй цай ба бэйкери нэг дор.",
    transportInfo:
      "Metro Line 2 East Nanjing Road Station Exit 1-ээр гарахад шууд бэлэн.",
    hotelDistance: "Jing'an Temple-ээс Line 2-оор 3 зогсоол",
    mapUrl:
      "https://maps.google.com/maps?q=Nanjing+Road+Shanghai&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Nanjing+Road+Shanghai",
  },

  // --- NINGBO CAFES (10) ---
  {
    city: "Ningbo · 宁波",
    name: "MANNER Coffee (Бэйлунь Интай молл салбар)",
    chineseName: "MANNER 咖啡 (北仑银泰店)",
    isNearHotel: true,
    cost: "Кофе $2 – 3.5",
    highlights:
      "Өглөөний эспрессо, матча латте, хурдан шуурхай service, боломжийн үнэ",
    desc: "Бэйлунь зочид буудлын ойролцоох Интай молл доторх Manner кофе шоп. Тоглолт ба аяллын өглөө кофе авахад тохиромжтой.",
    transportInfo: "Beilun Intime Mall 1-р давхарт байрлана.",
    hotelDistance: "Huihe Ruyu Hotel буудлаас 1.5 км (Таксигаар 3 мин)",
    mapUrl:
      "https://maps.google.com/maps?q=Beilun+Intime+Department+Store+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Beilun+Intime+Department+Store+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "TPLUS Tea & Souffle Bakery (Бэйлунь Сүфле кафе)",
    chineseName: "TPLUS 茶饮面包",
    isNearHotel: true,
    cost: "Сүфле & Цай $3 – 5",
    highlights:
      "Зөөлөн япон сүфле блинчик, жимсний сүүтэй цай, хөөрхөн ягаан суудлууд",
    desc: "Бэйлуньд байрлах агаарын мэт зөөлөн сүфле ба жимсний цайгаар үйлчилдэг күүл кафе.",
    transportInfo: "Beilun Starlight Square эсвэл Intime mall-ийн дэргэд.",
    hotelDistance: "Huihe Ruyu Hotel буудлаас 1.2 км",
    mapUrl:
      "https://maps.google.com/maps?q=Beilun+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Beilun+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Guchi Japanese Bakery (Гучи Бэйлунь Япон бэйкери)",
    chineseName: "谷迟面包 (北仑店)",
    isNearHotel: true,
    cost: "Талх & Кофе $2 – 4",
    highlights:
      "Япон сүүтэй талх (Shokupan), заварной кремтэй бууз, шинэхэн эспрессо",
    desc: "Бэйлунь дүүргийн хамгийн амттай шинэхэн барьсан Япон стилийн талхны дэлгүүр.",
    transportInfo: "Changjiang South Road дагуу байрлана.",
    hotelDistance: "Huihe Ruyu Hotel буудлаас явган 800 метр (10 минут)",
    mapUrl:
      "https://maps.google.com/maps?q=Beilun+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Beilun+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Heytea & Naixue Bakery (Тианьи талбай дээрх Алдартай цай ба Бэйкери)",
    chineseName: "喜茶 / 奈雪的茶 (天一广场店)",
    isNearHotel: false,
    cost: "Жимсний цай & Кэйк $3 – 5",
    highlights:
      "Шинэ гүзээлзгэнэтэй soft-European талх, сыртай жимсний цай, тухтай суудлууд",
    desc: "Нинбогийн төв талбай дээрх Хятадын шилдэг бренд болох Heytea болон Naixue-ийн том салбарууд.",
    transportInfo: "Metro Line 1 Dongmenkou Station Exit A.",
    hotelDistance: "Ningbo Station-аас Метро Line 2/1 замаар 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Tianyi+Square+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Tianyi+Square+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Lao Waitan Riverside Cafe Alley (Лао Вайнтань голын эргэлийн кафенууд)",
    chineseName: "老外滩沿江咖啡街",
    isNearHotel: false,
    cost: "Кофе $3 – 6",
    highlights:
      "1920-од оны тоосгон барилга, голын эрэг харах террас, гар аргаар хуурсан кофе, оройн гэрэлтүүлэг",
    desc: "Нинбогийн хуучин эрэг дагуух түүхэн Европын барилгууд доторх гоо зүйн өндөр мэдрэмжтэй кафенууд.",
    transportInfo: "Metro Line 2 Waitan Bridge Station Exit B.",
    hotelDistance: "Ningbo Station-аас Метро Line 2-оор 3 зогсоол",
    mapUrl:
      "https://maps.google.com/maps?q=Old+Bund+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Old+Bund+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Moyun Lakeside Courtyard Cafe (Сарны нуурын уламжлалт Хятад кафе)",
    chineseName: "墨云湖景咖啡 (月湖店)",
    isNearHotel: false,
    cost: "Цай ба Дорнод амттан $4 – 7",
    highlights:
      "Сарны нуур руу харсан дэнж, османтус цэцэгтэй цай, Хятад традиционал кэйк, зураг авах орчин",
    desc: "Сарны нуурын эрэг дээрх Хятад уламжлалт хашаа бүхий маш амгалан тайван, зураг авахад үзэсгэлэнтэй кафе.",
    transportInfo:
      "Metro Line 2 Changdeng (城隍庙) эсвэл Line 1 Ximenkou Station.",
    hotelDistance: "Ningbo Station-аас явган 10-15 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Moon+Lake+Park+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Moon+Lake+Park+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "DAILY Specialty Coffee & Tarts (Хэи Авеню шилэн кафе)",
    chineseName: "DAILY 咖啡 (和义大道店)",
    isNearHotel: false,
    cost: "Премиум кофе & Тарпи $4 – 8",
    highlights:
      "Голын эрэг харах шилэн панорама цонх, лимон ба жимсний тарпи, тусгай кофены шош",
    desc: "Хэи Авеню luxury моллын дэргэдэх голын харагдацтай орчин үеийн тунгалаг шилэн кафе.",
    transportInfo: "Metro Line 1 Dongmenkou Station-аас 500м алхана.",
    hotelDistance: "Ningbo Station-аас Метро Line 2/1 замаар 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Heyi+Avenue+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Heyi+Avenue+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Nantang Traditional Rice Cake & Tea (Нантан гудамжны уламжлалт амттан)",
    chineseName: "南塘传统糕点与茶饮",
    isNearHotel: false,
    cost: "Амттан $1.5 – 3 (Маш хямд)",
    highlights:
      "Нинбогийн уламжлалт цагаан будааны зөөлөн кэйк (Танюань), гар аргаар чанасан ургамлын цай",
    desc: "Нинбо хотын үндэсний алдартай халуун, зөөлөн будааны амттан ба цайг амтлах хамгийн шилдэг түүхэн гудамж.",
    transportInfo: "Ningbo Station-аас урагшаа 800м явган алхана.",
    hotelDistance: "Ningbo Station-аас явган 10 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Nantang+Ancient+Street+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Nantang+Ancient+Street+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Little Bear & Berry Dessert Cafe (Баавгайн сэдэвт кэйк шоп)",
    chineseName: "小熊与莓莓 (来福士店)",
    isNearHotel: false,
    cost: "Кэйк $3.5 – 6",
    highlights:
      "Жинхэнэ баавгайн хэлбэртэй мусс кэйк, гүзээлзгэнэтэй сүү, күүл тоглоом ба интерьер",
    desc: "Раффлс Сити молл доторх охидын хамгийн дуртай, супер күүл баавгайн хэлбэртэй мусс амттантай кафе.",
    transportInfo: "Metro Line 2 Waitan Bridge Station Exit B.",
    hotelDistance: "Ningbo Station-аас Метро Line 2-оор 3 зогсоол",
    mapUrl:
      "https://maps.google.com/maps?q=Raffles+City+Ningbo&hl=en&z=16&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Raffles+City+Ningbo",
  },
  {
    city: "Ningbo · 宁波",
    name: "Inu Inu Pet & Floral Cafe (Цэцэгт & Тохилог залуусын кафе)",
    chineseName: "犬犬花艺咖啡",
    isNearHotel: false,
    cost: "Кофе ба амттан $3 – 5",
    highlights:
      "Шинэхэн цэцгээр чимэглэсэн интерьер, матча шифон кэйк, амар тайван орчин",
    desc: "Нинбо хотын залуусын дунд алдартай цэцэг ба кофены хослол бүхий тухтай кафе.",
    transportInfo: "Metro Line 3 Yinzhou Central Station бууна.",
    hotelDistance: "Ningbo Station-аас Метро Line 3-аар 12 минут",
    mapUrl:
      "https://maps.google.com/maps?q=Yinzhou+Ningbo&hl=en&z=15&output=embed",
    googleMapLink:
      "https://www.google.com/maps/search/?api=1&query=Yinzhou+Ningbo",
  },
];

// Computed display list based on active category & city filter
const currentDisplayItems = computed(() => {
  let baseList = [];
  if (activeCategory.value === "attractions") {
    baseList = attractionsData;
  } else if (activeCategory.value === "malls") {
    baseList = shoppingMallsData;
  } else if (activeCategory.value === "cafes") {
    baseList = cafesData;
  }

  if (cityFilter.value === "near") {
    return baseList.filter((item) => item.isNearHotel);
  }
  if (cityFilter.value === "shanghai") {
    return baseList.filter((item) => item.city.includes("Shanghai"));
  }
  if (cityFilter.value === "ningbo") {
    return baseList.filter((item) => item.city.includes("Ningbo"));
  }
  return baseList;
});
</script>
