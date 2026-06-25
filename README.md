![Logo](https://owwny-b2b-base-files.s3.amazonaws.com/logo-pink.png)

# 🏢 Owwny Template

Plantilla base optimizada para proyectos web inmobiliarios usando Vue 3, Vite y TailwindCSS.

## ✨ Características

- ⚡️ **Vue 3** + **Vite 5** - Build rápido y HMR instantáneo
- 🎨 **TailwindCSS 3** - Utility-first CSS framework
- 🔥 **Firebase** - Autenticación y servicios backend
- 📡 **Apollo Client** - Cliente GraphQL con Hasura
- 🗂 **Vuex 4** - State management
- 🧭 **Vue Router 4** - Navegación con lazy loading
- 📱 **Responsive** - Diseño adaptativo mobile-first
- 🔒 **Seguro** - Variables de entorno para credenciales
- 🎯 **SEO Ready** - Meta tags y Open Graph configurados

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 16+ y npm/yarn
- Cuenta de Firebase
- Endpoint GraphQL de Hasura

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar .env con tus credenciales
```

### Variables de Entorno

Edita el archivo `.env` con tus credenciales:

```bash
# Firebase
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

# Hasura GraphQL
VITE_H_PASS=tu_hasura_secret
VITE_GRAPHQL_HTTP_URL=https://tu-endpoint.hasura.app/v1/graphql
VITE_GRAPHQL_WS_URL=wss://tu-endpoint.hasura.app/v1/graphql

# Redes Sociales
VITE_INSTAGRAM_URL=https://instagram.com/tu_perfil
VITE_FACEBOOK_URL=https://facebook.com/tu_perfil
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
owwny-template/
├── public/              # Archivos estáticos
│   ├── robots.txt       # Configuración SEO
│   ├── sitemap.xml      # Mapa del sitio
│   └── font/            # Fuentes personalizadas
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── QuoterExpress/  # Sistema de cotización
│   ├── views/           # Páginas principales
│   ├── store/           # Vuex store
│   │   └── modules/     # Módulos del store
│   ├── services/        # Servicios externos
│   │   ├── apolloClient.js  # Cliente GraphQL
│   │   └── firebase.js      # Configuración Firebase
│   ├── graphql/         # Queries y mutations
│   ├── App.vue          # Componente raíz
│   ├── main.js          # Entry point
│   └── routes.js        # Definición de rutas
├── .env.example         # Template de variables de entorno
├── .eslintrc.cjs        # Configuración ESLint
├── .prettierrc          # Configuración Prettier
├── index.html           # HTML template
├── tailwind.config.js   # Configuración Tailwind
├── vite.config.js       # Configuración Vite
└── package.json         # Dependencias y scripts
```

## 🛠 Stack Tecnológico

### Frontend

- **Vue 3.5** - Framework progresivo
- **Vite 5** - Build tool de nueva generación
- **TailwindCSS 3.4** - Framework CSS utility-first
- **Vue Router 4** - Enrutamiento oficial
- **Vuex 4** - State management

### Backend/Servicios

- **Firebase 10** - Authentication & Cloud Services
- **Apollo Client 3** - Cliente GraphQL
- **Hasura** - GraphQL Engine

### UI/UX

- **Headless UI** - Componentes accesibles
- **Hero Icons** - Iconografía
- **Vue Toastification** - Notificaciones
- **Swiper** - Carruseles modernos
- **GSAP** - Animaciones de alto rendimiento

## 📝 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Preview del build
npm run lint      # Linter de código
npm run format    # Formatear código
```

## 🎨 Personalización

### Colores (TailwindCSS)

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: "#ffffff",    // Color principal
  secondary: "#000000",  // Color secundario
  third: "#dddddd",      // Tercer color
  four: "#eeeeee"        // Cuarto color
}
```

### SEO

Actualiza meta tags en `index.html` y rutas en `routes.js`

## 🔐 Seguridad

- ✅ Credenciales en variables de entorno
- ✅ Firebase rules configuradas
- ✅ Headers de seguridad en Netlify
- ⚠️ Nunca commitear archivo `.env`

## 🚀 Deployment

### Netlify (Recomendado)

El proyecto incluye `netlify.toml` configurado:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Configurar variables de entorno en Netlify Dashboard.

## 📦 Dependencias Principales

```json
{
  "vue": "^3.5.0",
  "vite": "^5.4.0",
  "vue-router": "^4.4.0",
  "vuex": "^4.1.0",
  "@apollo/client": "^3.11.0",
  "firebase": "^10.13.0",
  "tailwindcss": "^3.4.11"
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Propiedad de Owwny - Todos los derechos reservados

## 👥 Equipo

Desarrollado por el equipo de Owwny

## 📞 Soporte

Para soporte, contactar a: [email de soporte]

---

**Nota**: Recuerda configurar todas las variables de entorno antes de desplegar a producción.
