import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { getAnalytics } from 'firebase/analytics';

import App from './App.vue';
import router from './router';
import firebaseApp from './config/firebase';

// Import main components from crush
import CrushPagination from '@nabux-crush/crush-pagination';
import CrushButton from '@nabux-crush/crush-button';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushUpload from '@nabux-crush/crush-upload';
import CrushSelect from '@nabux-crush/crush-select';
import CrushGlobalLoading from '@nabux-crush/crush-global-loading'

async function createVueApp() {
  const app = createApp(App);
  const pinia = createPinia();

  // setting pinia
  app.use(pinia);

  //setting router
  app.use(router);

  // setting firebase
  getAnalytics(firebaseApp);

  // components globally
  app.component('CrushPagination', CrushPagination);
  app.component('CrushButton', CrushButton);
  app.component('CrushTextField', CrushTextField);
  app.component('CrushUpload', CrushUpload);
  app.component('CrushSelect', CrushSelect);
  app.component('CrushGlobalLoading', CrushGlobalLoading);

  return app;
}

export { createVueApp };