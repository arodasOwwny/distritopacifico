<template>
  <div
    class="flex h-screen min-h-full flex-col justify-center bg-secondary py-32 sm:px-6 lg:px-8"
  >
    <div class="mt-8 p-4 sm:mx-auto sm:w-full sm:max-w-md md:p-0">
      <div
        class="border-8 border-secondary bg-primary py-8 px-4 shadow-md shadow-secondary/75 md:px-8"
      >
        <div class="flex">
          <div class="grid-cols-1 p-3">
            <p class="text-2xl font-semibold text-secondary">
              {{ userProfile.displayName }},
            </p>
            <p class="-mt-1 text-2xl font-semibold text-secondary md:text-lg">
              Completa tus datos
            </p>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1">
          <div
            class="relative border border-secondary px-4 py-4 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-secondary"
          >
            <label
              for="email"
              class="absolute -top-2 left-2 -mt-px inline-block bg-primary px-3 text-sm font-semibold text-secondary"
              >Email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              class="block w-full border-0 bg-transparent p-0 text-secondary placeholder-gray-500 focus:ring-0 sm:text-sm"
            />
          </div>

          <div class="flex gap-4">
            <div class="w-1/2 mt-6 border border-third">
              <vue3-country-intl
                    v-model="areaCode"
                    :onlyValue="true"
                    placeholder=""
                    autocomplete="on"
                  ></vue3-country-intl>
            </div>
            
                  <div
            class="relative mt-6 border border-third px-4 w-full py-4 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-secondary"
          >
           
            <label
              for="phone"
              class="absolute -top-2 left-2 -mt-px inline-block bg-primary px-3 text-sm font-semibold text-third"
              >Teléfono</label
            >
            <input
              type="tel"
              name="phone"
              id="phone"
              v-model="phone"
              class="block w-full border-0 bg-transparent p-0 text-four placeholder-gray-500 focus:ring-0 sm:text-sm"
            />
          </div>
            </div> 
          
          <p
            class="mt-2 text-sm tracking-wider text-secondary"
            v-if="phone.length <= 7"
          >
            Ingresa un número válido sin espacios.
          </p>
          <div class="mt-8">
            <button
              v-if="validateFields"
              class="w-full bg-gray-200 py-4 text-xl font-semibold tracking-wider text-gray-700 opacity-50"
            >
              <p>Completar...</p>
            </button>
            <button
              v-else
              @click="createClient"
              class="text flex w-full justify-center bg-secondary py-4 text-xl font-semibold tracking-wider text-primary shadow-2xl duration-300 ease-linear hover:bg-secondary hover:text-white hover:shadow-none shadow-secondary"
            >
              <p v-if="!showLoading">Continuar</p>
              <svg
                v-if="showLoading"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-7 w-7 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <p v-if="showLoading">Creando perfil...</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import client from "@/services/apolloClient";
import clientApi from "@/graphql/client";
import sellersApi from "@/graphql/sellers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
export default {
  data() {
    return {
      email: "",
      phone: "",
      areaCode: 502,
      showLoading: false,
      randomSeller: [],
    };
  },
  methods: {
    createClient() {
      this.showLoading = true;
      const provider = this.userProfile.providerId;
      const profilePic = this.userProfile.photoURL;
      const newPhone = this.phone.replace(" ", "");
      let newUrl = "";
      if (provider == "google.com") {
        newUrl = profilePic.replace("s96", "s350");
      } else {
        newUrl = profilePic.replace(
          "/picture",
          "/picture?width=350&height=350"
        );
      }
      const res = clientApi
        .createClient(
          this.userProfile.displayName,
          this.userProfile.email,
          this.userProfile.uid,
          newPhone,
          this.areaCode,
          newUrl,
          this.email,
          this.userProfile.providerId
        )
        .then((r) => {
          this.createClientToCompanyRelation();
          this.checkUser();
        });
    },
    async createClientToCompanyRelation() {
      const res = await clientApi.createClientRelationToCompany(
        this.userProfile.email,
        this.projectProfile.company_id,
        this.randomSeller.email,
        this.utms.utm_id,
        this.utms.utm_term,
        this.utms.utm_medium,
        this.utms.utm_source,
        this.utms.utm_content,
        this.utms.utm_campaign
      );
    },
    async getRandomSeller() {
      const res = await sellersApi
        .getSellersByProyect(this.projectProfile.id)
        .then((r) => {
          var randomSeller = Math.floor(Math.random() * r.length);
          this.randomSeller = r[randomSeller];
        });
    },
    checkUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$store.commit("user/SEND_PROFILE_DATA", user.providerData[0]);
          client.cache.reset();
          this.$store.commit("ui/AUTH_QUOTER_CONTAINER_STEP", 3);
        }
      });
    },
    async getNewUrl(value, provider) {
      let newUrl = "";
      if (provider == "google.com") {
        newUrl = await value.replace("s96", "s350");
      } else {
        newUrl = await value.concat("?width=350&height=350");
      }
      return newUrl;
    },
  },
  computed: {
    validateFields() {
      if (this.email != "" && this.phone != "" && this.phone.length != 7) {
        return false;
      } else {
        return true;
      }
    },

    ...mapState("user", ["userProfile", "firstName", "projectProfile"]),
    ...mapState("ui", ["utms"]),
  },
  unmounted() {
    this.showLoading = false;
    this.email = "";
    this.phone = "";
    this.areaCode = 502
  },
  mounted() {
    this.getRandomSeller();
  },
};
</script>

<style lang="css" scoped>
.vue-country-intl-input .country-intl-label {
  border-color: #122347 !important;
  height: 4rem !important;
  background-color: #ffffff !important;
  color: #122347 !important;
  border-color: #122347 !important;
  border-radius: 0px !important;
  border: none !important;
}
.vue-country-intl-input .country-intl-label {
  height: 3.4rem !important;
  padding-top: 15px !important;
  border: none !important;
}
.vue-country-intl-input {
  height: 3.5rem !important;
  border: none !important;
}
.vue-country-intl-input .dropdown-flag {
  top: 8px !important;
  border: none !important;
}
</style>
