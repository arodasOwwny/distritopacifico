<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <nav class="mt-0 mb-2 flex items-center justify-center" aria-label="Progress">
    <ol role="list" class="ml-0 flex items-center space-x-3">
      <li v-for="step in steps" :key="step.name">
        <button
          v-if="quoterStep > step.step"
          class="block h-2.5 w-2.5 rounded-full bg-primary hover:bg-primary"
        >
          
        </button>
        <button
          v-else-if="quoterStep == step.step"
          
          class="relative flex items-center justify-center"
          aria-current="step"
        >
          <span class="absolute flex h-6 w-6 p-px" aria-hidden="true">
            <span class="h-full w-full rounded-full bg-green-900/20 " />
          </span>
          <span
            class="relative block h-2.5 w-2.5 rounded-full bg-primary"
            aria-hidden="true"
          />
         
        </button>
        <button
          v-else
          class="block h-2.5 w-2.5 rounded-full bg-green-900/20 hover:bg-green-900/20"
        >
          
        </button>
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      steps: [
        { step: 1, href: "#", status: "current" },
        { step: 2, href: "#", status: "upcoming" },
        { step: 3, href: "#", status: "upcoming" },
      ],
    };
  },
  computed:{
    ...mapState("ui", ["quoterStep"])
  },
};
</script>
