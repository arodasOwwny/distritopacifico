<template>
  <div class="flex justify-end">
    <img class="mt-4 h-14 w-14 rounded-full" :src="userProfile.photoURL" alt="" />
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="mt-8 mr-4 flex items-center bg-transparent text-secondary hover:text-four">
          <span class="sr-only">Open options</span>
          <DotsVerticalIcon class="h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems
          class="absolute right-0 mt-2 mr-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <div class="bg-gray-100 pt-4 pl-4 pb-2">
              <p class="text-sm font-semibold text-gray-700">
                {{ userProfile.displayName }}
              </p>
              <p class="text-sm text-gray-700">{{ userProfile.email }}</p>
            </div>
            <MenuItem v-slot="{ active }" class="hover:bg-gray-100">
            <a href="https://owwny.com" target="_blank" :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm font-semibold',
            ]">Mi Dashboard<br />
              <p class="text-xs font-normal">
                Ingresa en owwny.com y ve todas tus cotizaciones generadas.
              </p>
            </a>
            </MenuItem>
            <MenuItem v-slot="{ active }" class="hover:bg-gray-100">
            <a href="https://owwny.com/terms" target="_blank" :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm',
            ]">Términos y condiciones</a>
            </MenuItem>

            <MenuItem v-slot="{ active }" class="hover:bg-gray-100">
            <button @click="logOut" :class="[
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block w-full px-4 py-2 text-left text-sm',
            ]">
              Cerrar sesión
            </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
  <div class="mt-0 grid p-4 md:mt-0 md:justify-center md:p-8">
    <div class="mt-12 md:mt-8">

      <p class="mt-1 text-center text-5xl font-badScript font-semibold tracking-wider text-secondary md:text-center">
        Cotizador en linea
      </p>

    </div>
    <div class="mt-12 mb-10">
      <p class="text-lg mb-1">Selecciona un tipo de apartamento:</p>
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-four/50"></div>
        </div>

      </div>

      <div class="grid md:flex gap-2 mt-4">
        <button @click="typeSelected('Modelo A')"
          :class="typeSelection == 'Modelo A' ?
            'w-auto px-8 py-4 border text-center rounded-sm bg-secondary text-white shadow-lg ease-in-out duration-700 hover:shadow-lg' :
            'w-auto px-8 py-4 border text-center rounded-sm hover:bg-secondary hover:text-white ease-in-out duration-700 hover:shadow-lg'">
          <p class="font-semibold text-lg">MODELO A</p>
          <p class="text-sm tracking-wide">2 Habitaciones, 1 Baño</p>
          <p class="text-xs tracking-wider mt-0.5">Desde 60m2</p>
        </button>
        <button @click="typeSelected('Modelo B')"
          :class="typeSelection == 'Modelo B' ?
            'w-auto px-8 py-4 border text-center rounded-sm bg-secondary text-white shadow-lg ease-in-out duration-700 hover:shadow-lg' :
            'w-auto px-8 py-4 border text-center rounded-sm hover:bg-secondary hover:text-white ease-in-out duration-700 hover:shadow-lg'">
          <p class="font-semibold text-lg">MODELO B</p>
          <p class="text-sm tracking-wide">2 Habitaciones, 2 Baños</p>
          <p class="text-xs tracking-wider mt-0.5">Desde 60m2 a 89m2</p>
        </button>
        <button @click="typeSelected('Modelo C')"
          :class="typeSelection == 'Modelo C' ?
            'w-auto px-8 py-4 border text-center rounded-sm bg-secondary text-white shadow-lg ease-in-out duration-700 hover:shadow-lg' :
            'w-auto px-8 py-4 border text-center rounded-sm hover:bg-secondary hover:text-white ease-in-out duration-700 hover:shadow-lg'">
          <p class="font-semibold text-lg">MODELO C</p>
          <p class="text-sm tracking-wide">3 Habitaciones, 2 Baños y Estudio</p>
          <p class="text-xs tracking-wider mt-0.5">Desde 86m2 a 90m2</p>
        </button>
        <button @click="typeSelected('PH')"
          :class="typeSelection == 'PH' ?
            'w-auto px-8 py-4 border text-center rounded-sm bg-secondary text-white shadow-lg ease-in-out duration-700 hover:shadow-lg' :
            'w-auto px-8 py-4 border text-center rounded-sm hover:bg-secondary hover:text-white ease-in-out duration-700 hover:shadow-lg'">
          <p class="font-semibold text-lg">PH</p>
          <p class="text-sm tracking-wide">Vendido</p>

        </button>
      </div>
    </div>
  </div>

  <div class="flex grid-cols-1 gap-0">
    <div
      class="md:-mt-8 -mt-8 w-[12rem] border-0 border-four bg-local bg-top object-contain md:w-[14rem] md:bg-top lg:w-[36rem] xl:w-[38rem]">
      <img class="md:h-auto h-[46rem] w-auto object-cover md:rounded-r-2xl"
        src="https://fakeimg.pl/1500x800/171a1f/9d7ee7?text=Owwny"
        alt="OwwnyTemp OwwnyTemp" />
    </div>
    <div class="lg:mt-22 grid-col-1 mt-0 mb-24 w-full justify-start font-semibold md:mt-24">
      <div class="mt-0 flex grid-cols-2 md:mt-6">
        <div
          class="relative h-auto w-full justify-left md:border-4 border-0 border-none bg-primary px-0 md:relative md:-ml-9 md:w-auto lg:absolute lg:right-12 md:-mt-12">
        </div>
      </div>
      <div class="mt-0 ml-0 flex h-[4rem] gap-1 overflow-x-auto overflow-y-clip overscroll-x-contain md:-ml-2"
        v-for="l in getFilterLevels" :key="l.index">
        <div
          class="mt-0 h-14 w-20 flex-none border-none border-secondary bg-secondary text-center text-sm text-white/80 duration-300 ease-linear md:w-28 md:text-base">
          <p class="font-base mt-8 tracking-wide text-white md:mt-4">
            Nivel {{ l }}
          </p>
        </div>
        <individual-level :level="l" />
      </div>
    </div>
  </div>
</template>

<script>
import propertiesApi from "@/graphql/properties";
import apiProject from "@/graphql/projects";
import IndividualLevel from "./IndividualLevel.vue";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { mapState } from "vuex";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { DotsVerticalIcon } from "@heroicons/vue/solid";
import clientApi from "@/graphql/client";
export default {
  components: {
    IndividualLevel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
  },
  data() {
    return {
      properties: [],
      allLevels: [],
      filterLevels: [],
      levels: [],
      filter: "",
     
    };
  },
  watch: {
    properties() {
      this.properties.forEach((e) => {
        this.allLevels.push(e.level);
      });
    },
    
  },
  methods: {
    typeSelected(type) {
      this.$store.commit("ui/TYPE_SELECTION", type)
      this.$store.commit("ui/FILTER_PROPERTIES", this.typeSelection);
    },
    logOut() {
      signOut(auth)
        .then(() => {
          this.$moshaToast(`Sesión cerrada`, {
            type: "success",
            transition: "slide",
            position: "bottom-right",
            showIcon: true,
            hideProgressBar: false,
            toastBackgroundColor: "#122347",
          });
          this.$store.commit("ui/AUTH_QUOTER_CONTAINER_STEP", 0);
          this.$store.commit("user/SEND_PROFILE_DATA", []);
          this.$router.push("/");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapState("ui", ["typeSelection"]),
    getFilterLevels() {
      const levels = [...new Set(this.allLevels)];
      const des = levels.sort((a, b) => {
        return b - a;
      });
      return des;
    },
  },
  mounted() {
    this.typeSelected("Modelo A")
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit("user/SEND_PROFILE_DATA", user.providerData[0]);
      }
    });
    const res = clientApi.getClient(this.userProfile.email).then((v) => {
      this.$store.commit("user/SEND_PROFILE_DB_DATA", v);
    });
  },
  beforeMount() {
    const resProject = apiProject
      .getProjectData("92b7aac2-579d-44a4-899b-d9a6feaaa1f0")
      .then((data) => {
        this.$store.commit("user/PROJECT_DATA", data);
      });
    this.$store.commit("ui/SHOW_LOADING_AT_PROPERTIES", true);
    const resProperties = propertiesApi
      .getAllProperties("92b7aac2-579d-44a4-899b-d9a6feaaa1f0")
      .then((v) => {
        this.properties = v;
        this.$store.commit("user/SEND_PROPERTIES", v);
        this.$store.commit("ui/SHOW_LOADING_AT_PROPERTIES", false);
      });
  },
};
</script>
