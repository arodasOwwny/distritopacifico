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
      title: "Distrito Pacífico - Un oasis en Mazatenango",
      description: "Distrito Pacífico es el nuevo desarrollo en Mazatenango donde vivir se siente diferente. Regístrate para conocer todos los detalles.",
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
      title: "¡Gracias! - Distrito Pacífico",
      description: "Tu información fue enviada exitosamente. Pronto te contactaremos.",
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
