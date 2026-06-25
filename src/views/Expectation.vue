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

    <!-- Hero -->
    <section class="bg-gradient-to-br from-azul via-azul/80 to-celeste">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div class="text-white order-2 lg:order-1">
          <p class="font-montserrat uppercase tracking-widest text-celeste text-sm sm:text-base mb-4">
            Próximamente en Mazatenango
          </p>
          <h1 class="font-sage text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            Un oasis en Mazatenango
          </h1>
          <p class="font-montserrat text-base sm:text-lg text-white/90 max-w-md mb-8">
            Distrito Pacífico es el nuevo desarrollo donde vivir se siente diferente.
            Déjanos tus datos y sé el primero en conocer todos los detalles.
          </p>
          <button
            type="button"
            @click="scrollToForm"
            class="bg-white text-azul text-base font-semibold px-6 py-3 rounded-full hover:bg-celeste transition-colors"
          >
            Quiero ser de los primeros
          </button>
        </div>
        <div class="order-1 lg:order-2">
          <img
            src="https://owwny-b2b-base-files.s3.us-east-1.amazonaws.com/websites/DistritoPacifico/Tipo2.jpg"
            alt="Render Distrito Pacífico"
            class="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>

    <!-- Formulario -->
    <section id="formulario" class="bg-four py-16 sm:py-24">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-3xl rounded-tl-[4rem] shadow-xl p-8 sm:p-12">
         
          <p class="text-gray-500 text-sm sm:text-base mb-8">
            Regístrate y te contactaremos con toda la información de Distrito Pacífico.
          </p>

          <form v-if="!submitted" @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label for="nombre" class="block text-sm font-medium text-azul mb-1">Nombre</label>
              <input
                id="nombre"
                v-model.trim="form.nombre"
                type="text"
                placeholder="Tu nombre completo"
                class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
              />
              <p v-if="errors.nombre" class="mt-1 text-sm text-red-500">{{ errors.nombre }}</p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-azul mb-1">Email</label>
              <input
                id="email"
                v-model.trim="form.email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
            </div>

            <div>
              <label for="telefono" class="block text-sm font-medium text-azul mb-1">Teléfono</label>
              <input
                id="telefono"
                v-model.trim="form.telefono"
                type="tel"
                placeholder="00000000"
                class="block w-full rounded-lg border-gris/60 focus:border-azul focus:ring-azul"
              />
              <p v-if="errors.telefono" class="mt-1 text-sm text-red-500">{{ errors.telefono }}</p>
            </div>

            <button
              type="submit"
              :disabled="sending"
              class="w-full bg-azul text-white font-semibold py-3 rounded-full hover:bg-verdeazul transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ sending ? 'Enviando...' : 'Enviar' }}
            </button>
          </form>

          <!-- TODO: conectar el submit a Firebase/API cuando se defina el endpoint -->
          <div v-else class="text-center py-6">
            <SunIcon class="w-12 h-12 text-verdeazul mx-auto mb-4" />
            <h3 class="font-sage text-xl text-azul mb-2">¡Gracias!</h3>
            <p class="text-gray-500">Te contactaremos pronto con más información.</p>
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
import { reactive, ref } from 'vue'
import SunIcon from '@/components/icons/SunIcon.vue'

const currentYear = new Date().getFullYear()

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
})

const errors = reactive({
  nombre: '',
  email: '',
  telefono: '',
})

const sending = ref(false)
const submitted = ref(false)

const scrollToForm = () => {
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
}

const validate = () => {
  errors.nombre = form.nombre ? '' : 'Ingresa tu nombre.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Ingresa un correo válido.'
  errors.telefono = /^\d{8}$/.test(form.telefono) ? '' : 'Ingresa un teléfono válido (8 dígitos).'
  return !errors.nombre && !errors.email && !errors.telefono
}

const handleSubmit = async () => {
  if (!validate()) return

  sending.value = true
  // TODO: reemplazar por la llamada real a Firebase/API cuando se defina el endpoint del lead
  await new Promise((resolve) => setTimeout(resolve, 600))
  sending.value = false
  submitted.value = true
}
</script>
