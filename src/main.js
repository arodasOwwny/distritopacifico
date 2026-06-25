import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store'
import Toast, { POSITION } from "vue-toastification"
import VueSmoothScroll from 'vue3-smooth-scroll'
import "vue-toastification/dist/index.css"
import Vue3CountryIntl from 'vue3-country-intl'
import 'vue3-country-intl/lib/vue3-country-intl.css'

const app = createApp(App)

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Actualizar título de la página
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Actualizar meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }

  // Validar autenticación si es requerida
  if (to.meta.requiresAuth) {
    const user = store.state.user.userProfile
    if (!user || user.length === 0) {
      // Redirigir a home si no está autenticado
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Tracking de analytics (descomentar cuando esté configurado)
  // if (window.gtag) {
  //   window.gtag('config', 'GA_TRACKING_ID', {
  //     page_path: to.path
  //   })
  // }
})

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.log('Error info:', info)
}

// Router error handler
router.onError((error) => {
  console.error('Router error:', error)
})

app.use(router)
app.use(store)
app.use(Toast, { 
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  icon: true
})
app.component(Vue3CountryIntl.name, Vue3CountryIntl)
app.use(VueSmoothScroll, {
  duration: 1200,
  updateHistory: false
})

app.mount('#app')
