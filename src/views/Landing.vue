<template>
  <div class="font-montserrat text-white bg-azul">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-[#1f4577]">
      <div class="boxed py-3 lg:py-0 lg:h-[80px] flex items-center justify-between gap-3">
        <img :src="img.logoWhite" alt="Distrito Pacífico" class="h-10 w-auto lg:h-auto" />

        <nav class="hidden lg:flex items-center gap-3">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="text-[14px] border border-white/80 rounded-full px-4 py-1 hover:bg-white hover:text-azul transition-colors"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="scrollTo('#formulario')"
            class="bg-white text-[#1f4577] text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 rounded-full hover:bg-celeste transition-colors whitespace-nowrap"
          >
            <span class="sm:hidden">Más información</span>
            <span class="hidden sm:inline">Quiero más información</span>
          </button>
          <button
            type="button"
            class="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            :aria-expanded="menuOpen"
            aria-label="Abrir menú"
            @click="menuOpen = !menuOpen"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h16" />
              <path v-else d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Menú móvil -->
      <nav v-if="menuOpen" class="lg:hidden border-t border-white/20 bg-[#1f4577]">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click.prevent="goTo(link.href)"
          class="block boxed py-3 text-base border-b border-white/10 last:border-b-0"
        >
          {{ link.label }}
        </a>
      </nav>
    </header>

    <!-- Hero -->
    <section class="relative min-h-[560px] lg:min-h-[720px] flex items-center overflow-hidden">
      <img :src="img.hero" alt="Casas Distrito Pacífico" class="absolute inset-0 w-full h-full object-cover" />
      <div class="relative boxed py-10 flex lg:justify-end">
        <div class="w-full lg:w-[44%] bg-white/55 backdrop-blur-[2px] rounded-tl-[3rem] rounded-br-[3rem] p-6 sm:p-8 lg:p-10 text-azul">
          <p class="text-sm sm:text-base">Distrito Pacífico</p>
          <h1 class="font-sage text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight mt-2">Tu oasis en Mazate</h1>
          <div class="h-[3px] w-full bg-gradient-to-r from-verdeazul to-transparent mt-2 mb-5"></div>
          <p class="font-sage text-lg sm:text-2xl leading-snug">
            Casas de 1 y 2 niveles<br />
            Cuotas desde Q 3,400
          </p>
          <button
            type="button"
            @click="scrollTo('#formulario')"
            class="mt-8 bg-azul text-white text-sm font-medium px-7 py-2.5 rounded-full hover:bg-verdeazul transition-colors"
          >
            Más información
          </button>
        </div>
      </div>
    </section>

    <!-- Ubicación: fondo propio con degradado (azul oscuro → celeste) -->
    <section id="ubicacion" class="location-gradient pb-14 scroll-mt-16">
      <div class="boxed py-16">
        <p class="text-xl sm:text-2xl lg:text-3xl">Ubicación del Proyecto</p>
        <div class="h-px w-full max-w-md bg-white/70 mt-2"></div>

        <!-- Espacio para el mapa (imagen). Solo el título y el botón de Waze son elementos reales -->
        <div class="mt-8 aspect-[762/430] rounded-2xl overflow-hidden">
          <img :src="img.map" alt="Mapa de ubicación de Distrito Pacífico" class="w-full h-full object-contain" />
        </div>

        <div class="mt-6 flex flex-col items-center gap-4">
          <p class="flex items-center gap-2 text-azul text-sm sm:text-base font-medium">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            CA2, Mazatenango
          </p>
          <a
            :href="wazeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-[#1f4577] text-white text-base px-10 py-2.5 rounded-full hover:bg-verdeazul transition-colors"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3C7.6 3 4.5 6.2 4.5 10c0 1.4.4 2.6 1.1 3.7-.2 1.2-.7 2.3-1.6 3.1 1.6.2 3-.3 4-1.1 1 .5 2.1.8 3.5.8 4.4 0 7.5-3.2 7.5-7.5S16.4 3 12 3Z" />
              <circle cx="9.5" cy="9.5" r=".9" fill="currentColor" stroke="none" />
              <circle cx="14.5" cy="9.5" r=".9" fill="currentColor" stroke="none" />
              <path d="M9.3 12.6c1.5 1.4 3.9 1.4 5.4 0" />
              <circle cx="8.5" cy="19.2" r="1.5" />
              <circle cx="15.5" cy="19.2" r="1.5" />
            </svg>
            Ir con Waze
          </a>
        </div>
      </div>
    </section>

    <!-- Tu nuevo entorno -->
    <section id="entorno" class="bg-[#1f4577] pt-10 lg:pt-14 scroll-mt-16">
      <div class="boxed">
        <p class="text-xl sm:text-2xl lg:text-3xl">Tu nuevo entorno</p>
        <div class="h-px w-full max-w-md bg-white mt-2"></div>
        <h2 class="font-sage text-3xl sm:text-4xl lg:text-5xl leading-tight mt-8 lg:mt-10 max-w-2xl">
          Bienvenido a Distrito Pacífico, tu oasis en Mazatenango.
        </h2>
      </div>

      <div class="mt-8 lg:mt-10 flex justify-end">
        <img :src="img.aerial" alt="Vista aérea de Distrito Pacífico" class="w-[80%] h-auto" />
      </div>

      <div class="boxed py-10 lg:py-14">
        <p class="text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl">
          Un desarrollo integral con áreas residenciales, comerciales e industriales, pensado para acompañar el
          crecimiento de la ciudad y acercarte a más servicios y oportunidades.
        </p>
      </div>
    </section>

    <!-- Fondo degradado compartido: Tipologías → Contacto -->
    <div class="shared-gradient text-white">
      <!-- Tipología de casas -->
      <section id="tipologias" class="boxed pt-14 pb-16 scroll-mt-16">
        <p class="text-azul text-xl sm:text-2xl lg:text-3xl">Tipología de Casas</p>
        <div class="h-px w-full max-w-md bg-azul mt-2"></div>
        <p class="text-xl sm:text-2xl tracking-wide mt-8">Su área residencial cuenta con tres modelos de vivienda:</p>

        <div class="mt-10 grid grid-cols-3 gap-[6%]">
          <div v-for="model in models" :key="model.name" class="flex flex-col items-center">
            <div class="relative w-full aspect-[182/278] rounded-t-full overflow-hidden shadow-[4px_6px_10px_rgba(0,0,0,0.3)]">
              <img :src="model.image" :alt="`Modelo ${model.name}`" class="w-full h-full object-cover" />
              <h3 class="absolute top-[12%] inset-x-0 text-center font-alethia text-xl sm:text-3xl text-azul">{{ model.name }}</h3>
            </div>
            <button
              type="button"
              @click="openModel(model)"
              class="mt-5 bg-[#1f4577] text-white text-sm sm:text-lg lg:text-xl px-5 sm:px-12 py-2 sm:py-3 rounded-full hover:bg-verdeazul transition-colors"
            >
              Ver más
            </button>
          </div>
        </div>

        <p class="text-base sm:text-lg lg:text-xl mt-10">Todos los modelos incluyen parqueo para 2 vehículos.</p>
      </section>

      <!-- Amenidades -->
      <section id="amenidades" class="pb-10 scroll-mt-16">
        <div class="boxed">
        <p class="text-azul text-xl sm:text-2xl lg:text-3xl">Amenidades</p>
        <div class="h-px w-full max-w-md bg-azul mt-2"></div>
        <p class="text-base sm:text-lg lg:text-xl tracking-wide mt-8 max-w-4xl leading-relaxed">
          Además, disfrutarás de amenidades como piscina, casa club, cancha polideportiva y churrasqueras, en una
          ubicación estratégica sobre la CA-2.
        </p>
        </div>

        <!-- Foto a todo el ancho; los mosaicos sobresalen por debajo (medidas tomadas del diseño) -->
        <div class="relative mt-14 mb-[16vw] sm:mb-[7vw]">
          <img :src="img.pool" alt="Piscina y casa club" class="block w-full h-auto" />
          <p class="absolute inset-x-0 text-center text-white text-[clamp(10px,1.25vw,16px)] bottom-[32%] sm:bottom-[10vw]">
            *Imágenes con fines ilustrativos.
          </p>
          <div
            class="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[44%] w-[94%] sm:w-[76%] grid grid-cols-5 gap-[2%] sm:gap-[7%]"
          >
            <div
              v-for="item in amenities"
              :key="item.label"
              class="aspect-[115/135] sm:aspect-[115/130] rounded-t-full shadow-[6px_4px_8px_rgba(0,0,0,0.35)] flex flex-col items-center justify-between pt-[18%] pb-[8%] px-[4%]"
              :class="[item.bg, item.fg]"
            >
              <AmenityIcon :name="item.key" class="w-[52%] h-auto" />
              <span class="font-alethia text-azul text-center leading-tight text-[clamp(7px,1.3vw,20px)]">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Video tour -->
      <section id="video" class="boxed pb-16 scroll-mt-16">
        <p class="text-xl sm:text-2xl lg:text-3xl">Video tour</p>
        <div class="h-px w-full max-w-md bg-white/70 mt-2"></div>
        <div class="mt-8 rounded-[2rem] overflow-hidden shadow-xl bg-black">
          <video :src="videoUrl" :poster="img.videoPoster" controls playsinline preload="none" class="w-full aspect-video object-cover"></video>
        </div>
      </section>

      <!-- Requisitos -->
      <section id="requisitos" class="boxed pb-16 scroll-mt-16">
        <p class="text-xl sm:text-2xl lg:text-3xl">Requisitos</p>
        <div class="h-px w-full max-w-md bg-white mt-2"></div>

        <!-- Filas escalonadas: cada icono en arco sobresale de su píldora y se solapa con la fila anterior -->
        <ul class="mt-10">
          <li
            v-for="(req, i) in requirements"
            :key="req.key"
            class="relative w-full sm:w-[83%] aspect-[421/100]"
            :class="[i % 2 ? 'ml-auto' : '', i > 0 ? '-mt-[5%]' : '']"
            :style="{ '--icon-cut': i % 2 ? '#1d4373' : '#b4b1b3' }"
          >
            <!-- Píldora -->
            <div
              class="absolute bottom-0 h-1/2 flex items-center px-[4%] text-[11px] sm:text-sm lg:text-lg leading-snug"
              :class="
                i % 2
                  ? 'left-0 right-[20%] rounded-l-full bg-[#1d4373] text-gris justify-end text-right'
                  : 'left-[20%] right-0 rounded-r-full bg-gris text-[#1d4373]'
              "
            >
              {{ req.text }}
            </div>
            <!-- Icono en arco -->
            <div
              class="absolute bottom-0 w-[21%] aspect-[88/100] rounded-t-full flex items-center justify-center pt-[6%]"
              :class="i % 2 ? 'right-0 bg-[#1d4373] text-gris' : 'left-0 bg-gris text-[#1d4373]'"
            >
              <RequirementIcon :name="req.key" class="w-[58%] h-auto" />
            </div>
          </li>
        </ul>
      </section>

      <!-- Conoce más / Contacto -->
      <section id="formulario" class="boxed pb-16 scroll-mt-16">
        <p class="text-azul text-xl sm:text-2xl lg:text-3xl">Conoce más</p>
        <div class="h-px w-full max-w-md bg-white mt-2"></div>

        <div class="mt-10 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 class="font-sage text-4xl sm:text-5xl leading-tight">Casas de 1 y 2 niveles en Mazatenango</h2>
            <p class="text-base sm:text-lg lg:text-xl mt-6 max-w-md">
              Distrito Pacífico es el nuevo desarrollo de vivienda, comercio e industria en Mazatenango.
            </p>
          </div>

          <div class="bg-[#dbe4ec] rounded-tl-[3rem] rounded-br-[3rem] p-6 sm:p-10 text-azul lg:max-w-xl lg:ml-auto w-full">
            <h3 class="font-sage text-2xl sm:text-3xl">Tu nuevo oasis.</h3>
            <p class="text-sm sm:text-base text-gray-500 mt-2 mb-6">
              Déjanos tus datos y sé el primero en conocer todos los detalles.
            </p>
            <form @submit.prevent="sendLead" class="space-y-4">
              <div>
                <label for="nombre" class="block text-sm font-medium mb-1">Nombre</label>
                <input
                  id="nombre"
                  v-model.trim="name"
                  type="text"
                  placeholder="Tu nombre completo"
                  class="block w-full rounded-md border-gray-300 text-base focus:border-azul focus:ring-azul"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  v-model.trim="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  class="block w-full rounded-md border-gray-300 text-base focus:border-azul focus:ring-azul"
                />
              </div>
              <div>
                <label for="telefono" class="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  id="telefono"
                  v-model.trim="phone"
                  type="tel"
                  placeholder="00000000"
                  class="block w-full rounded-md border-gray-300 text-base focus:border-azul focus:ring-azul"
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
      </section>
    </div>

    <!-- Desarrolladora -->
    <section id="desarrolladora" class="bg-white text-center px-6 py-10 scroll-mt-16">
      <p class="text-gray-600 text-base sm:text-lg lg:text-xl">Con el respaldo y desarrollo de</p>
      <img :src="img.intepro" alt="Intepro" class="h-16 sm:h-20 w-auto mx-auto mt-6" />
      <div class="mt-8 boxed grid sm:grid-cols-3 gap-6 text-base sm:text-lg lg:text-xl">
        <p v-for="stat in stats" :key="stat.strong" class="text-gray-600">
          <span class="block text-[#a4212a] font-medium">{{ stat.strong }}</span>
          {{ stat.text }}
        </p>
      </div>
      <a
        href="https://intepro.com.gt"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block mt-8 bg-[#a4212a] text-white text-lg px-16 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Conocer más
      </a>
    </section>

    <!-- Footer -->
    <footer class="bg-[#1f4577] px-6 py-8">
      <div class="boxed flex flex-col sm:flex-row items-center justify-between gap-6">
        <img :src="img.logoWhite" alt="Distrito Pacífico" class="h-16 w-auto" />
        <div class="text-sm sm:text-base space-y-3">
          <div class="flex items-center justify-center sm:justify-start gap-3">
            <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 512 512" class="w-6 h-6" fill="currentColor">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>
            <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 hover:text-celeste transition-colors">
            <svg viewBox="0 0 448 512" class="w-6 h-6" fill="currentColor" aria-label="Instagram">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
            </svg>
            <span>| @Distritopacífico_gt</span>
          </a>
          </div>
          <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center sm:justify-start gap-3 hover:text-celeste transition-colors">
            <svg viewBox="0 0 448 512" class="w-6 h-6" fill="currentColor" aria-label="WhatsApp">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <span>| 3132-7594</span>
          </a>
        </div>
      </div>
      <p class="text-center text-xs text-white/60 mt-6">© {{ currentYear }} Powered by Owwny Inc. All rights reserved.</p>
    </footer>
    <!-- Popup de tipología -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="selectedModel"
          class="fixed inset-0 z-[100] bg-black/60 flex p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          :aria-label="`Modelo ${selectedModel.name}`"
          @click.self="closeModel"
        >
          <div class="relative m-auto bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl font-montserrat">
            <button
              type="button"
              class="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#1d4373] text-white flex items-center justify-center hover:bg-verdeazul transition-colors"
              aria-label="Cerrar"
              @click="closeModel"
            >
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <!-- Encabezado: píldora celeste + medalla con los m² -->
            <div class="flex justify-end pt-5 sm:pt-8 pl-[18%]">
              <div class="flex items-center w-full">
                <div class="flex-1 bg-celeste rounded-l-full flex items-center pl-6 sm:pl-10 pr-4">
                  <h3 class="font-alethia text-azul text-3xl sm:text-5xl lg:text-6xl leading-none py-1 sm:py-2">
                    Modelo {{ selectedModel.name }}
                  </h3>
                </div>
                <div
                  v-if="selectedModel.area"
                  class="-ml-8 sm:-ml-14 bg-[#1d4373] text-white rounded-l-full flex items-baseline justify-center px-6 sm:px-12 py-3 sm:py-6"
                >
                  <span class="font-alethia text-4xl sm:text-6xl lg:text-7xl leading-none">{{ selectedModel.area }}</span>
                  <span class="font-alethia text-lg sm:text-3xl leading-none">m<sup class="text-[0.6em]">2</sup></span>
                </div>
              </div>
            </div>

            <!-- Render -->
            <div class="px-4 sm:px-8 mt-4 sm:mt-6">
              <img :src="selectedModel.render" :alt="`Distribución del modelo ${selectedModel.name}`" class="block w-full h-auto" />
            </div>

            <!-- Características -->
            <ul class="px-6 sm:px-14 py-6 sm:py-8 grid grid-flow-col grid-rows-4 sm:grid-rows-2 gap-x-6 gap-y-2 sm:gap-y-3">
              <li v-for="feature in selectedModel.features" :key="feature" class="flex items-center gap-3 font-alethia text-azul text-lg sm:text-2xl">
                <span class="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-verdeazul shrink-0"></span>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AmenityIcon from '@/components/AmenityIcon.vue'
import RequirementIcon from '@/components/RequirementIcon.vue'

const store = useStore()
const router = useRouter()

const currentYear = new Date().getFullYear()
const BASE = 'https://owwny-b2b-base-files.nyc3.digitaloceanspaces.com/websites/DistritoPacifico'

// TODO: reemplazar por los enlaces definitivos de DigitalOcean (los marcados "pendiente" aún no existen)
const img = {
  logoWhite: `${BASE}/LogoWhiteHorizontal.png`,
  hero: `${BASE}/landing/heroBG.jpg`,
  aerial: `${BASE}/landing/entorno.png`,
  pool: `${BASE}/landing/amenityBG.png`,
  map: `${BASE}/landing/Mapa.png`,
  videoPoster: `${BASE}/Renders/calle.jpg`,
  intepro: `${BASE}/landing/InteproLogoColor.png`,
}
const videoUrl = `${BASE}/video-tour.mp4` // pendiente
const wazeUrl = 'https://waze.com/ul?q=Distrito%20Pac%C3%ADfico%20Mazatenango' // pendiente: coordenadas exactas
const whatsappUrl = 'https://wa.me/50231327594'

const socialLinks = {
  instagram: 'https://www.instagram.com/distritopacifico_gt/',
  facebook: 'https://www.facebook.com/people/Distrito-Pac%C3%ADfico/61590998562052/?ref=1',
}

const navLinks = [
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Tu nuevo entorno', href: '#entorno' },
  { label: 'Requisitos', href: '#requisitos' },
  { label: 'Video tour', href: '#video' },
  { label: 'Desarrolladora', href: '#desarrolladora' },
]

const amenities = [
  { key: 'casa-club', label: 'Casa Club', bg: 'bg-white', fg: 'text-azul' },
  { key: 'cancha', label: 'Cancha Polideportiva', bg: 'bg-celeste', fg: 'text-azul' },
  { key: 'parques', label: 'Parques', bg: 'bg-gris', fg: 'text-azul' },
  { key: 'churrasqueras', label: 'Churrasqueras', bg: 'bg-gris', fg: 'text-azul' },
  { key: 'piscina', label: 'Piscina', bg: 'bg-verdeazul', fg: 'text-white' },
]

const auraFeatures = ['Sala', 'Comedor', 'Cocina', '3 Habitaciones', '1 Baño', 'Lavandería', 'Jardín', '2 Parqueos']
// TODO: render1.png es el de Aura; Terra y Roble usan temporalmente los datos de Aura (render, m² y características); reemplazar por los reales
const models = [
  { name: 'Aura', image: `${BASE}/landing/tipoaura.png`, render: `${BASE}/landing/render1.png`, area: 56, features: auraFeatures },
  { name: 'Terra', image: `${BASE}/landing/tipoterra.png`, render: `${BASE}/landing/render1.png`, area: 56, features: auraFeatures },
  { name: 'Roble', image: `${BASE}/landing/tiporoble.png`, render: `${BASE}/landing/render1.png`, area: 56, features: auraFeatures },
]

const menuOpen = ref(false)
const goTo = (selector) => {
  menuOpen.value = false
  scrollTo(selector)
}

const selectedModel = ref(null)
const openModel = (model) => {
  selectedModel.value = model
}
const closeModel = () => {
  selectedModel.value = null
}
const onKeydown = (e) => {
  if (e.key === 'Escape') closeModel()
}
watch(selectedModel, (model) => {
  document.body.style.overflow = model ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const requirements = [
  { key: 'maletin', text: '1 año de continuidad laboral' },
  { key: 'dinero', text: 'Estados de cuenta de los últimos 3 meses que reflejen los ingresos reportados.' },
  { key: 'documento', text: 'El banco pide que tengas de ingresos familiares 3 veces la cuota de tu apartamento.' },
  { key: 'checklist', text: 'Constancia Laboral y de ingresos' },
]

const stats = [
  { strong: '+15 años', text: 'de experiencia' },
  { strong: '+3,000 viviendas', text: 'entregadas' },
  { strong: '+4,000 viviendas', text: 'en desarrollo' },
]

// Formulario
const countryCode = '502'
const name = ref('')
const phone = ref(null)
const email = ref('')
const showLoading = ref(false)

const utms = computed(() => store.state.ui.utms)

const checkData = computed(
  () =>
    name.value != '' &&
    name.value != null &&
    phone.value != null &&
    String(phone.value).length > 7 &&
    email.value != ''
)

const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
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

  fetch(
    new Request(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
  )
  setTimeout(() => {
    showLoading.value = false
    router.push('/thanks')
  }, 2000)
}
</script>

<style scoped>
/* Contenido "boxed": 80% del ancho en escritorio, 90% en móvil/tablet */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.boxed {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1024px) {
  .boxed {
    width: 80%;
  }
}

/* Degradado continuo compartido por Tipologías → Contacto */
.location-gradient {
  background: linear-gradient(to bottom, #1f4577 0%, #3a7096 55%, #7cc4d3 100%);
}
.shared-gradient {
  background: linear-gradient(
    to bottom,
    #86cdd6 0%,
    #4f93b3 22%,
    #2a5a8a 34%,
    #4c88ab 55%,
    #2b5c8c 68%,
    #4a86a5 80%,
    #5c9ab5 88%,
    #1f4577 100%
  );
}
</style>
