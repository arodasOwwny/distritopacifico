<template>
  <div
    id="login"
    class="flex h-screen min-h-full flex-col justify-center bg-secondary bg-fixed p-4 py-32 sm:px-6 lg:px-8"
   
  >
 
    <div class="mt-14 sm:mx-auto sm:w-full sm:max-w-sm bg-secondary">
      <div
        class="bg-none py-8 px-4 shadow-2xl border-2 duration-500 ease-linear sm:px-10"
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            class="mx-auto h-40 w-auto p-2"
            src="https://owwny-b2b-base-files.s3.amazonaws.com/websites/owwny-24/owwny_white_360.png"
            alt=""
          />
        </div> <p class="mt-6 text-center text-5xl font-badScript font-semibold tracking-wider text-primary md:text-center">
        Cotizador
      </p>
       
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-primary/40 border-2" />
          </div>
          <div class="relative flex justify-center">
          </div>
        </div>
        <div class="mt-8 grid grid-cols-1 gap-4">
     

          <div>
            <button
              v-if="!loadingGoogle"
              @click="loginWithGoogle"
              href=""
              class="hover:white inline-flex w-full justify-center rounded-none bg-primary/10 py-4 px-4 text-sm font-light text-white duration-500 ease-linear hover:bg-primary hover:text-secondary hover:shadow-2xl hover:shadow-secondary/75"
            >
              <span class="sr-only">Sign in with Google</span>

              <svg
                aria-hidden="true"
                class="mr-3 -ml-3 mt-1.5 h-5 w-5"
                viewBox="0 0 512 512"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              <p class="mt-0.5 text-lg tracking-wider">Ingresa con Google</p>
            </button>
            <button
              v-else
              href=""
              class="inline-flex w-full justify-center rounded-md bg-secondary py-4 px-4 text-sm font-medium text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-3 h-7 w-7 animate-spin"
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
              <p class="mt-0.5 text-lg">Cargando...</p>
            </button>
          </div>
          <div>
            <button
              v-if="!loadingGoogle"
              @click="loginWithApple"
              href="#"
              class="hover:white inline-flex w-full justify-center rounded-none bg-primary/10 py-4 px-4 text-sm font-light text-white duration-500 ease-linear hover:bg-primary hover:text-secondary hover:shadow-2xl hover:shadow-secondary/75"
            >
              <span class="sr-only">Sign in with Facebook</span>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="mr-3 -ml-3 mt-1 h-6 w-6" ><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <p class="mt-0.5 text-lg tracking-wider">Ingresa con Apple</p>
            </button>
          </div>
          <div class="flex justify-center">
            <p class="font-light text-sm text-primary mt-2 tracking-wider">Inicia para cotizar en línea</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/services/firebase";
import apiProjects from "@/graphql/projects";
import clientApi from "@/graphql/client";


import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  OAuthProvider
} from "firebase/auth";


export default {
  data () {
    return {
      phone: "",
      loadingGoogle: false,
    }
  },
   methods: {
    loginWithApple() {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = OAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          this.loadingGoogle = true;
          this.$store.commit("user/SEND_PROFILE_DATA", result.user);
          this.checkUserProfile(result.user.email);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = OAuthProvider.credentialFromError(error);
          // ...
        });
    },
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result.user.email);
          const token = credential.accessToken;
          // The signed-in user info.
          this.loadingGoogle = true;
          this.$store.commit(
            "user/SEND_PROFILE_DATA",
            result.user.providerData[0]
          );
          this.checkUserProfile(result.user.providerData[0].email);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },

    loginWithFacebook() {
      const provider = new FacebookAuthProvider();
      provider.addScope("email");
      signInWithRedirect(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          this.loadingGoogle = true;
          this.$store.commit(
            "user/SEND_PROFILE_DATA",
            result.user.providerData[0]
          );
          this.checkUserProfile(result.user.providerData[0].email);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
          // ...
        });
    },

    checkUserProfile(email) {
      const res = clientApi.getClient(email).then((v) => {
        if (v.length == 0) {
          this.$store.commit("ui/AUTH_QUOTER_CONTAINER_STEP", 1);
        } else {
          this.$store.commit("ui/AUTH_QUOTER_CONTAINER_STEP", 2);
        }
      });
    },
  },
  async beforeMount() {
    const res = await apiProjects
      .getProjectData("92b7aac2-579d-44a4-899b-d9a6feaaa1f0")
      .then((v) => {
        this.$store.commit("user/PROJECT_DATA", v[0]);
      });
  },
  unmounted() {
    this.loadingGoogle = false;
  },
}
</script>