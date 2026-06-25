<template>
  <div class="mt-0 flex gap-0.5" v-for="p in properties" :key="p.id">
    <div
      @click="openQuoter(p), (selectedProperty = p)"
      :class="p.status == 'Disponible' ? 'h-14 mt-0 w-24 border-2 border-none bg-gray-200 text-center font-thin text-gray-900 duration-300 ease-linear hover:border-0 hover:bg-secondary hover:font-black hover:text-white hover:shadow-lg hover:shadow-four md:w-24 lg:w-28 xl:w-28' 
      :'h-14 mt-0 w-24 border-2 border-none bg-red-100 cursor-not-allowed text-center font-thin text-red-700 duration-300 ease-linear md:w-24 lg:w-28 xl:w-28'"
    >
      <div v-if="p.status == 'Disponible'">
        <div class="flex justify-between mt-1 ">
          <p class="text-left text-xs font-thin ml-2">
            {{ p.reference }}
          </p>
          <p class="text-right text-xs font-thin mr-2">
            {{ (p.typology).slice(-1) }}
          </p>

        </div>
        
        <p
        class="mt-0 text-center text-sm font-bold tracking-wider md:-mt-0.5 md:text-base"
      >
        {{ p.unit_name }}
      </p>
      <p class="-mt-1 text-center text-xs font-light ">
        {{ p.construction_area }} m2
      </p>
      </div>
      

    <div v-else>
      <p
        class="mt-1.5 text-center text-sm font-black tracking-wider md:mt-2.5 md:text-sm"
      >
        Vendido
      </p>
      <p class="mt-0 text-center text-xs font-light">
        {{ p.reference }}
      </p>
    </div>
    </div>
  </div>
</template>

<script>
import propertiesApi from "@/graphql/properties";
import { mapState } from "vuex";
export default {
  props: {
    level: Number,
  },
  mounted() {
    const res = propertiesApi
      .getPropertiesByLevel(
        "92b7aac2-579d-44a4-899b-d9a6feaaa1f0",
        this.level,
        `${this.filterPropeties}`
      )
      .then((v) => {
        this.properties = v;
      });
  },
  data() {
    return {
      properties: [],
      selectedProperty: [],
    };
  },

  computed: {
    ...mapState("ui", ["filterPropeties"]),
  },
  watch: {
    filterPropeties() {
      const res = propertiesApi
        .getPropertiesByLevel(
          "92b7aac2-579d-44a4-899b-d9a6feaaa1f0",
          this.level,
          `${this.filterPropeties}`
        )
        .then((v) => {
          this.properties = v;
        });
    },
  },
  methods: {
    openQuoter(property) {
      if (property.status == "Disponible") {
        this.$store.commit("ui/TOGGLE_QUOTER", true);
      this.$store.commit("user/PROPERTY_VIEW", property);
      this.$store.commit("user/UNIT_PROPERTY_PRICE", property.price);
      this.$store.commit("user/FINAL_RESERVE_INPUT", property.reservation);
      if (property.parkings_relation.length > 0) {
        this.$store.commit(
          "user/PREASSIGNED_PARKING_PRICE",
          property.parkings_relation[0].price
        );
      }
      }
     
    },
  },
};
</script>
