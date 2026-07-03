<template>
  <div class="min-h-screen bg-white font-montserrat">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <img
          src="https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/LogoColorHorizontal.png"
          alt="Distrito Pacífico"
          class="h-12 sm:h-12 w-auto"
        />
        <button
          type="button"
          @click="scrollToForm"
          class="bg-azul text-white text-sm sm:text-base font-medium px-4 sm:px-6 py-2.5 rounded-full hover:bg-verdeazul transition-colors"
        >
          Quiero más información
        </button>
      </div>
    </header>

    <!-- Slider -->
    <section class="relative bg-azul">
      <Swiper
        :modules="[Pagination, Navigation, Autoplay, EffectFade]"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :pagination="{ clickable: true, el: '.distrito-slider-pagination' }"
        :navigation="{ nextEl: '.distrito-slider-next', prevEl: '.distrito-slider-prev' }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="sliderImages.length > 1"
        class="distrito-slider w-full h-[420px] sm:h-[560px] lg:h-[680px]"
      >
        <SwiperSlide v-for="(slide, index) in sliderImages" :key="index">
          <div class="relative w-full h-full">
            <img :src="slide.src" :alt="slide.alt" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-azul via-azul/30 to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0">
              <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16 lg:pb-20">
                <p class="font-montserrat uppercase tracking-[0.2em] text-celeste text-xs sm:text-sm mb-3">
                  {{ slide.eyebrow }}
                </p>
                <h2 class="font-sage text-white text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-xl">
                  {{ slide.title }}
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Controles -->
      <div class="absolute inset-x-0 bottom-6 sm:bottom-8 z-10 flex items-center justify-center sm:justify-end gap-4 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pointer-events-none">
        <div class="distrito-slider-pagination flex items-center gap-2 pointer-events-auto"></div>
        <div v-if="sliderImages.length > 1" class="hidden sm:flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            class="distrito-slider-prev w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-verdeazul hover:border-verdeazul transition-colors"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            class="distrito-slider-next w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-verdeazul hover:border-verdeazul transition-colors"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Hero -->
    <section class="bg-gradient-to-b from-azul via-azul/80 to-celeste">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white">
          <p class="font-montserrat uppercase tracking-widest text-celeste text-sm sm:text-base mb-4">
            Próximamente
          </p>
          <h1 class="font-sage text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Casas de 1 y 2 niveles en Mazatenango
          </h1>
          <p class="font-montserrat text-base sm:text-lg text-white/90 max-w-md mb-8">
            Distrito Pacífico es el nuevo desarrollo de vivienda, comercio e industria en Mazatenango. 
             
          </p>
          <button
            type="button"
            @click="scrollToForm"
            class="lg:hidden bg-white text-azul text-base font-semibold px-6 py-3 rounded-full hover:bg-celeste transition-colors"
          >
            Quiero ser de los primeros
          </button>
        </div>

        <!-- Formulario -->
        <div id="formulario">
          <div class="bg-white rounded-3xl rounded-tl-[4rem] shadow-2xl p-8 sm:p-12">
            <h2 class="font-sage text-2xl sm:text-3xl text-azul mb-2">Tu nuevo oasis.</h2>
            <p class="text-gray-500 text-sm sm:text-base mb-8">
              Déjanos tus datos y sé el primero en conocer todos los detalles.
            </p>

            <form @submit.prevent="sendLead" class="space-y-5">
              <div>
                <label for="nombre" class="block text-sm font-medium text-azul mb-1">Nombre</label>
                <input
                  id="nombre"
                  v-model.trim="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-azul mb-1">Email</label>
                <input
                  id="email"
                  v-model.trim="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
                />
              </div>

              <div>
                <label for="telefono" class="block text-sm font-medium text-azul mb-1">Teléfono</label>
                <input
                  id="telefono"
                  v-model.trim="phone"
                  type="tel"
                  placeholder="00000000"
                  class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
                />
              </div>

              <button
                type="submit"
                :disabled="!checkData || showLoading"
                class="w-full bg-azul text-white font-semibold py-3 rounded-full hover:bg-verdeazul transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ showLoading ? 'Enviando...' : 'Enviar' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

  

    <!-- Footer -->
    <footer class="bg-azul pt-4 pb-3">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gris/30">
          <div class="flex flex-col items-center sm:items-start gap-1">
            <p class="text-gris/80 text-xs">Un proyecto desarrollado por:</p>
            <div class="bg-white rounded-lg px-3 py-2 shadow-sm">
              <img
                src="https://owwny-b2b-base-files.s3.amazonaws.com/websites/CDLP/InteproLogoColor.png"
                alt="Intepro"
                class="h-10 w-auto"
              />
            </div>
          </div>

          <div class="flex items-center gap-4">
            <a
              :href="socialLinks.facebook"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook"
              class="text-gris/90 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 512 512" class="w-8 h-8" fill="currentColor">
                <path
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/distritopacifico_gt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              class="text-gris/90 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 448 512" class="w-8 h-8" fill="currentColor">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="pt-3">
          <p class="text-gris/80 text-sm text-center">© {{ currentYear }} Powered by Owwny Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const store = useStore()
const router = useRouter()

const currentYear = new Date().getFullYear()
const socialLinks = {
  instagram: 'https://www.instagram.com/distritopacifico_gt/',
  facebook: 'https://www.facebook.com/people/Distrito-Pac%C3%ADfico/61590998562052/?ref=1',
}

const sliderImages = [
  {
    src: 'https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/Tipo2.jpg',
    alt: 'Render Distrito Pacífico',
    eyebrow: 'Distrito Pacífico',
    title: 'Tu propio oasis',
  },
  {
    src: 'https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/Renders/calle.jpg',
    alt: 'Render Distrito Pacífico',
    eyebrow: 'Distrito Pacífico',
    title: 'Donde vivir se siente diferente',
  },
]

const countryCode = '502'
const name = ref('')
const phone = ref(null)
const email = ref('')
const showLoading = ref(false)

const utms = computed(() => store.state.ui.utms)

const checkData = computed(() => {
  return (
    name.value != '' &&
    name.value != null &&
    phone.value != null &&
    String(phone.value).length > 7 &&
    email.value != ''
  )
})

const scrollToForm = () => {
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
}

const sendLead = async () => {
  if (!checkData.value) return

  showLoading.value = true

  const url = 'https://sq1.owwny.com/webhook/distritopacifico'
  const formData = new FormData()
  formData.append('lead_Name', name.value)
  formData.append('lead_Phone', `+${countryCode}${phone.value}`)
  formData.append('lead_Email', email.value)
  formData.append('recaptcha_token', '')
  formData.append('utm_source', utms.value.utm_source)
  formData.append('utm_medium', 'Owwny')
  formData.append('utm_campaign', utms.value.utm_campaign)
  formData.append('utm_id', utms.value.utm_id)
  formData.append('utm_term', utms.value.utm_term)
  formData.append('utm_content', utms.value.utm_content)

  const request = new Request(url, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
    headers: {
      accept: 'application/json;odata=verbose',
      contentType: 'text/xml',
    },
  })

  fetch(request)
  setTimeout(() => {
    showLoading.value = false
    router.push('/thanks')
  }, 2000)
}
</script>

<style scoped>
.distrito-slider :deep(.swiper-pagination-bullet) {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 1;
  transition: background-color 0.3s ease;
}
.distrito-slider :deep(.swiper-pagination-bullet-active) {
  background: #59bdb5;
}
</style>
