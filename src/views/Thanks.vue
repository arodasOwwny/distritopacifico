<template>
    <div class="h-screen bg-secondary">

      <div class="flex justify-center">
        <img
          class="mt-32 h-full duration-700 ease-in-out md:mt-24 md:h-32 lg:mt-32 lg:h-60"
          src="https://owwny-b2b-base-files.s3.amazonaws.com/websites/owwny-24/owwny_white_360.png"
          alt="Owwny Logo"
        />
      </div>
      <div class="mt-12 w-full text-center text-2xl text-primary">
        <p class="text-3xl px-12 lg:px-20 text-primary tracking-wider uppercase">
          ¡Información enviada!
        </p>
        <p class="font-light px-12 mt-4 lg:px-20 text-white tracking-wider">
          Muy pronto obtendrá todos los detalles.
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <router-link
          to="/"
          class="mb-12 flex w-auto rounded-sm bg-primary py-3 px-8 text-xl font-semibold tracking-wider text-secondary hover:bg-secondary hover:text-white transition-colors duration-300 md:text-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
  
          Regresar
        </router-link>
       
      </div>
      <div v-if="socialLinks.instagram || socialLinks.facebook">
        <div class="flex justify-center">
          <div class="flex gap-2 p-4">
            <a 
              v-if="socialLinks.instagram" 
              :href="socialLinks.instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-4 mr-2 h-7 w-7 fill-primary hover:fill-four transition-colors duration-300"
                viewBox="0 0 448 512"
              >
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
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5 h-6 w-6 fill-primary hover:fill-four transition-colors duration-300"
                viewBox="0 0 512 512"
              >
                <path
                  d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        socialLinks: {
          instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
          facebook: import.meta.env.VITE_FACEBOOK_URL || ''
        }
      }
    }
  };
  </script>