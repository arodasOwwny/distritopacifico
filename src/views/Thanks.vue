<template>
  <div class="min-h-screen bg-gradient-to-br from-azul via-azul/80 to-celeste flex flex-col font-montserrat">
    <header class="px-4 sm:px-6 lg:px-8 py-6">
      <img
        src="https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/LogoWhiteHorizontal.png"
        alt="Distrito Pacífico"
        class="h-10 sm:h-12 w-auto"
      />
    </header>

    <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl rounded-tl-[4rem] shadow-2xl p-8 sm:p-12 max-w-lg w-full text-center">
        <p class="font-montserrat uppercase tracking-[0.2em] text-verdeazul text-xs sm:text-sm mb-3">
          Distrito Pacífico
        </p>
        <h1 class="font-sage text-3xl sm:text-4xl text-azul mb-4">¡Información enviada!</h1>
        <p class="text-gray-500 text-sm sm:text-base mb-8">
          Muy pronto nos pondremos en contacto contigo con todos los detalles de tu nuevo oasis en Mazatenango.
        </p>

        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 bg-azul text-white font-semibold px-6 py-3 rounded-full hover:bg-verdeazul transition-colors"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Volver al inicio
        </router-link>

        <div v-if="socialLinks.instagram || socialLinks.facebook" class="flex justify-center gap-4 mt-8">
          <a
            v-if="socialLinks.instagram"
            :href="socialLinks.instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Instagram"
            class="text-azul hover:text-verdeazul transition-colors"
          >
            <svg viewBox="0 0 448 512" class="w-6 h-6" fill="currentColor">
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
          </a>
          <a
            v-if="socialLinks.facebook"
            :href="socialLinks.facebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Síguenos en Facebook"
            class="text-azul hover:text-verdeazul transition-colors"
          >
            <svg viewBox="0 0 512 512" class="w-6 h-6" fill="currentColor">
              <path
                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>

    <footer class="px-4 sm:px-6 lg:px-8 py-6 text-center">
      <p class="text-white/70 text-sm">© {{ currentYear }} Distrito Pacífico. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const socialLinks = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
  facebook: import.meta.env.VITE_FACEBOOK_URL || '',
}
</script>
