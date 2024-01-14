import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Devtools from './plugin';
import routes from './routes';
import { onAfterFetch } from './composables/useHttp';

import type { Options } from './plugin/index.d';

import './css/build.css';
import './css/main.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App)
  .use(router)
  .use<Options>(Devtools, {
    onAfterFetch,
    responsePath: 'response.meta[0].debugBar',
  })

app.mount('#app');
