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
    <footer class="bg-azul py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <img
          src="https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/LogoWhiteHorizontal.png"
          alt="Distrito Pacífico"
          class="h-12 w-auto"
        />
        <p class="text-gris/80 text-sm">© {{ currentYear }} Distrito Pacífico. Todos los derechos reservados.</p>
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

  const url = 'https://sq1.owwny.com/webhook-test/distritopacifico'
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
