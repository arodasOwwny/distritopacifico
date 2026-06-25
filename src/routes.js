// Lazy loading de componentes para mejor performance
const Landing = () => import("./views/Landing.vue")
const NotFound = () => import("./views/NotFound.vue")
const Expectation = () => import('./views/Expectation.vue')
const Thanks = () => import("./views/Thanks.vue")

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { 
    path: "/", 
    component: Expectation, 
    meta: { 
      title: "Inicio - Proyecto Inmobiliario",
      description: "Descubre tu próximo hogar",
      requiresAuth: false
    } 
  },
  { 
    path: "/home", 
    component: Landing, 
    meta: { 
      title: "Home - Proyecto Inmobiliario",
      description: "Explora nuestros proyectos",
      requiresAuth: false
    } 
  },
  { 
    path: "/thanks", 
    component: Thanks, 
    meta: { 
      title: "Gracias - Proyecto Inmobiliario",
      description: "Información enviada exitosamente",
      requiresAuth: false
    } 
  },
  { 
    path: "/:path(.*)", 
    component: NotFound,
    meta: {
      title: "Página no encontrada",
      description: "La página que buscas no existe"
    }
  },
];
