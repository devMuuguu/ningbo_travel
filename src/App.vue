<template>
  <div
    class="min-h-screen bg-[#131b29] text-[#eef2f8] flex flex-col font-sans selection:bg-amber-500 selection:text-black"
  >
    <!-- Top Header -->
    <header
      class="bg-linear-to-b from-[#1b2637] to-[#131b29] border-b border-[#2f3f58] pt-6 pb-5"
    >
      <div class="wrap">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div
            class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e0a52e]"
          >
            <span class="w-3 h-0.5 bg-[#e0a52e]"></span>
            <span>VNL Finals 2026 · Аяллын хөтөч</span>
          </div>

          <!-- Offline / Online Indicator & PWA badge -->
          <div class="flex items-center gap-2">
            <span
              :class="
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              "
              class="px-2.5 py-1 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="
                  isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                "
              ></span>
              {{ isOnline ? "Онлайн" : "Оффлайн горим" }}
            </span>
          </div>
        </div>

        <h1
          class="font-['Oswald'] text-3xl sm:text-5xl font-semibold uppercase tracking-wide text-[#eef2f8] leading-none mb-2"
        >
          Улаанбаатар <span class="text-[#e0a52e]">→</span> Ningbo
        </h1>
        <p class="text-sm sm:text-base text-[#93a2bd] max-w-2xl mb-4">
          07.29 – 08.03 · UB · Beijing 北京 · Shanghai 上海 · Ningbo 宁波 · VNL
          эрэгтэй финал
        </p>

        <!-- Route quick strip -->
        <div
          class="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs font-mono text-[#93a2bd]"
        >
          <span
            class="px-2 py-1 bg-[#1b2637] border border-[#2f3f58] rounded text-[#eef2f8] whitespace-nowrap"
            >УБ (UBN)</span
          >
          <span class="text-[#e05643]">✈️</span>
          <span
            class="px-2 py-1 bg-[#1b2637] border border-[#2f3f58] rounded text-[#eef2f8] whitespace-nowrap"
            >PEK</span
          >
          <span class="text-[#3b86ef]">🚆</span>
          <span
            class="px-2 py-1 bg-[#1b2637] border border-[#2f3f58] rounded text-[#eef2f8] whitespace-nowrap"
            >Beijing South</span
          >
          <span class="text-[#3b86ef]">🚆</span>
          <span
            class="px-2 py-1 bg-[#1b2637] border border-[#2f3f58] rounded text-[#eef2f8] whitespace-nowrap"
            >Shanghai</span
          >
          <span class="text-[#3b86ef]">🚆</span>
          <span
            class="px-2 py-1 bg-[#1b2637] border border-[#2f3f58] rounded text-[#eef2f8] whitespace-nowrap"
            >Ningbo</span
          >
          <span class="text-[#e0a52e]">🏐</span>
          <span
            class="px-2 py-1 bg-[#e0a52e]/20 border border-[#e0a52e]/40 rounded text-[#f6dfac] whitespace-nowrap"
            >Beilun Gymnasium</span
          >
        </div>
      </div>
    </header>

    <!-- Top Sticky Tabs Nav (Desktop & Mobile) -->
    <nav class="tabs-header">
      <div class="wrap relative">
        <div
          ref="topNavRef"
          class="tabs-nav"
          @mousedown="onMouseDown($event, topNavRef)"
          @mousemove="onMouseMove($event, topNavRef)"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
          @touchstart="onTouchStart($event, topNavRef)"
          @touchmove="onTouchMove($event, topNavRef)"
          @touchend="onTouchEnd"
        >
          <router-link
            v-for="routeItem in navRoutes"
            :key="routeItem.path"
            :to="routeItem.path"
            class="tab-btn"
            @click="onTabClick($event)"
          >
            <component
              :is="getIcon(routeItem.meta.icon)"
              class="w-4 h-4 icon shrink-0"
            />
            <span>{{ routeItem.meta.title }}</span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-1 wrap py-6">
      <PwaInstallBanner />

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Mobile Bottom Navigation Bar (Scrollable & Draggable) -->
    <div class="mobile-nav-container">
      <div
        ref="mobileNavRef"
        class="mobile-nav"
        @mousedown="onMouseDown($event, mobileNavRef)"
        @mousemove="onMouseMove($event, mobileNavRef)"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
        @touchstart="onTouchStart($event, mobileNavRef)"
        @touchmove="onTouchMove($event, mobileNavRef)"
        @touchend="onTouchEnd"
      >
        <router-link
          v-for="routeItem in navRoutes"
          :key="routeItem.path"
          :to="routeItem.path"
          class="mobile-tab-item"
          @click="onTabClick($event)"
        >
          <component
            :is="getIcon(routeItem.meta.icon)"
            class="w-5 h-5 shrink-0"
          />
          <span>{{ routeItem.meta.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Compass,
  Ticket,
  MapPin,
  Calendar,
  Landmark,
  Wallet,
  FileText,
  Image,
} from "lucide-vue-next";
import PwaInstallBanner from "./components/PwaInstallBanner.vue";

const router = useRouter();
const route = useRoute();
const navRoutes = router.getRoutes();

const isOnline = ref(navigator.onLine);
const topNavRef = ref(null);
const mobileNavRef = ref(null);

// Drag-to-scroll state
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let draggedDistance = 0;
let currentTargetRef = null;

function onMouseDown(e, targetRef) {
  if (!targetRef) return;
  isDragging = true;
  currentTargetRef = targetRef;
  startX = e.pageX - targetRef.offsetLeft;
  scrollLeft = targetRef.scrollLeft;
  draggedDistance = 0;
}

function onMouseMove(e, targetRef) {
  if (!isDragging || !currentTargetRef || currentTargetRef !== targetRef)
    return;
  e.preventDefault();
  const x = e.pageX - targetRef.offsetLeft;
  const walk = (x - startX) * 1.5;
  draggedDistance += Math.abs(x - startX);
  targetRef.scrollLeft = scrollLeft - walk;
}

function onMouseUp() {
  isDragging = false;
  currentTargetRef = null;
}

function onMouseLeave() {
  isDragging = false;
  currentTargetRef = null;
}

function onTouchStart(e, targetRef) {
  if (!targetRef || !e.touches || !e.touches[0]) return;
  isDragging = true;
  currentTargetRef = targetRef;
  startX = e.touches[0].pageX - targetRef.offsetLeft;
  scrollLeft = targetRef.scrollLeft;
  draggedDistance = 0;
}

function onTouchMove(e, targetRef) {
  if (
    !isDragging ||
    !currentTargetRef ||
    currentTargetRef !== targetRef ||
    !e.touches ||
    !e.touches[0]
  )
    return;
  const x = e.touches[0].pageX - targetRef.offsetLeft;
  const walk = (x - startX) * 1.2;
  draggedDistance += Math.abs(x - startX);
  targetRef.scrollLeft = scrollLeft - walk;
}

function onTouchEnd() {
  isDragging = false;
  currentTargetRef = null;
}

function onTabClick(e) {
  // If user was dragging significantly, prevent navigation so it acts purely as drag
  if (draggedDistance > 10) {
    e.preventDefault();
  }
}

function scrollToActiveTab() {
  nextTick(() => {
    [topNavRef.value, mobileNavRef.value].forEach((container) => {
      if (!container) return;
      const activeEl = container.querySelector(".router-link-exact-active");
      if (activeEl) {
        const containerWidth = container.clientWidth;
        const activeLeft = activeEl.offsetLeft;
        const activeWidth = activeEl.clientWidth;
        container.scrollTo({
          left: activeLeft - containerWidth / 2 + activeWidth / 2,
          behavior: "smooth",
        });
      }
    });
  });
}

watch(
  () => route.path,
  () => {
    scrollToActiveTab();
  },
);

function updateOnlineStatus() {
  isOnline.value = navigator.onLine;
}

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  scrollToActiveTab();
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});

function getIcon(iconName) {
  const icons = {
    Compass,
    Ticket,
    MapPin,
    Calendar,
    Landmark,
    Wallet,
    FileText,
    Image,
  };
  return icons[iconName] || Compass;
}
</script>
