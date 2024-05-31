import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import App from './App.vue';
import router from './router';

import { firebaseApp as firebaseApp, analytics } from './config/firebase';

// Import main components from crush
import CrushPagination from '@nabux-crush/crush-pagination';
import CrushButton from '@nabux-crush/crush-button';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushUpload from '@nabux-crush/crush-upload';

async function createVueApp() {
  const app = createApp(App);
  const pinia = createPinia();

  // setting pinia
  app.use(pinia);

  //setting router
  app.use(router);

  // components globally
  app.component('CrushPagination', CrushPagination);
  app.component('CrushButton', CrushButton);
  app.component('CrushTextField', CrushTextField);
  app.component('CrushUpload', CrushUpload);

  return app;
}

export { createVueApp };
