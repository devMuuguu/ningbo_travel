import { createRouter, createWebHistory } from 'vue-router';
import OverviewView from '../views/OverviewView.vue';
import TicketsView from '../views/TicketsView.vue';
import MapsView from '../views/MapsView.vue';
import ItineraryView from '../views/ItineraryView.vue';
import AttractionsView from '../views/AttractionsView.vue';
import BudgetView from '../views/BudgetView.vue';
import NotesView from '../views/NotesView.vue';
import GalleryView from '../views/GalleryView.vue';

const routes = [
  { path: '/', name: 'overview', component: OverviewView, meta: { title: 'Ерөнхий', icon: 'Compass' } },
  { path: '/tickets', name: 'tickets', component: TicketsView, meta: { title: 'Тийзүүд', icon: 'Ticket' } },
  { path: '/maps', name: 'maps', component: MapsView, meta: { title: 'Зураг', icon: 'MapPin' } },
  { path: '/itinerary', name: 'itinerary', component: ItineraryView, meta: { title: 'Хөтөлбөр', icon: 'Calendar' } },
  { path: '/attractions', name: 'attractions', component: AttractionsView, meta: { title: 'Сонирхолтой газар', icon: 'Landmark' } },
  { path: '/budget', name: 'budget', component: BudgetView, meta: { title: 'Зардал', icon: 'Wallet' } },
  { path: '/notes', name: 'notes', component: NotesView, meta: { title: 'Тэмдэглэл', icon: 'FileText' } },
  { path: '/gallery', name: 'gallery', component: GalleryView, meta: { title: 'Зургууд', icon: 'Image' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
