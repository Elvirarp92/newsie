import { createApp } from "vue";
import App from "./App.vue";
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia } from "pinia";
import VueDOMPurifyHTML from 'vue-dompurify-html';

/* Components */
import Articles from "./views/Articles.vue"
import Feeds from "./views/Feeds.vue"

/* Vue Router */
const routes = [
  { path: '/', name: 'Articles', component: Articles },
  { path: '/feeds', name: 'Feeds', component: Feeds },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

/* Pinia */
const pinia = createPinia()

createApp(App)
.use(VueDOMPurifyHTML)
.use(router)
.use(pinia)
.mount("#app");
