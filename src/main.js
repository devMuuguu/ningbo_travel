import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

// Register PWA Service Worker for Offline Capabilities
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // Check for SW updates on each page load
      reg.update();

      // When a new SW is installed and waiting, tell it to activate immediately
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New SW ready — skip waiting and reload
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      });
    }).catch((err) => {
      console.log('SW registration failed: ', err);
    });

    // Reload once when the new SW takes over
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}
