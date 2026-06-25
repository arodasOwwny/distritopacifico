import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store'
import moshaToast from "mosha-vue-toastify"
import Toast, {POSITION} from "vue-toastification";
import VueSmoothScroll from 'vue3-smooth-scroll'
import "vue-toastification/dist/index.css";
import 'mosha-vue-toastify/dist/style.css'
import Vue3CountryIntl from 'vue3-country-intl';
import 'vue3-country-intl/lib/vue3-country-intl.css'

const app = createApp(App)

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
})
app.use(router)
app.use(Toast, {position: POSITION.BOTTOM_RIGHT})
app.use(store)
app.use(moshaToast)
app.component(Vue3CountryIntl.name, Vue3CountryIntl);
app.use(VueSmoothScroll, {
  duration: 1200,
  updateHistory: false
})
app.mount('#app')
