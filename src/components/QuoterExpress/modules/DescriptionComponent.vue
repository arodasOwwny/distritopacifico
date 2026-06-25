<template>
  <div class="mx-0 mt-10">
    <div>
      <div>
        <img :src="viewProperty.base_plane" class="mt-4 mb-0 object-contain p-1 md:mb-2 md:p-6" alt="" />
      </div>
      <div class="bg-secondary text-lg text-white px-4 py-2 tracking-wide mt-10">
        Especificaciones del inmueble
      </div>

      <div class="p-2 mt-1">
        <ul role="list" class="divide-y divide-four/20 px-1">
          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Unidad:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.unit_name }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Tipo:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.typology }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Vista:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.reference }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Habitaciones:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.bedrooms }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Baños:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.bathrooms }}</p>
            </div>
          </li>

        

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Área de apartamento :</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.living_area }} m2</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Área de balcón:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ viewProperty.balcony_area }} m2</p>
            </div>
          </li>
          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Parqueos de vehículo:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ getCarParking(viewProperty.parkings_relation) }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Parqueos de motocicleta:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ getCycleParking(viewProperty.parkings_relation) }}</p>
            </div>
          </li>

          <li class="flex justify-between gap-x-6 py-2 ">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Area de parqueos:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-semibold text-gray-900">{{ getAreaParkings(viewProperty.parkings_relation) }} m2</p>
            </div>
          </li>


          <li class="flex justify-between gap-x-6 py-2 bg-secondary/5">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Área total :</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ (viewProperty.construction_area + getAreaParkings(viewProperty.parkings_relation)).toFixed(2) }} m2</p>
            </div>
          </li>

        </ul>

      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { ArrowRightIcon } from "@heroicons/vue/outline";
export default {
  data() {
    return {};
  },
  components: {
    ArrowRightIcon,
  },
  computed: {
    ...mapState("user", ["viewProperty"]),
    ...mapState("ui", ["quoterStep"]),

  },
  methods: {
    toStep(s) {
      this.$store.commit("ui/CHANGE_TO_STEP", s);
    },
    getCarParking(i) {
      const carParkings = []
      i.forEach(element => {
        if (element.area > 10) {
          carParkings.push(element)
        }
      });
      return carParkings.length
    },
    getCycleParking(i) {
      const cycleParkings = []
      i.forEach(element => {
        if (element.area < 10) {
          cycleParkings.push(element)
        }
      });
      return cycleParkings.length
    },
    getAreaParkings(i){
      const area = i.reduce(
        (accumulator, e) => {
          return accumulator + e.area;
        },
        0
      );
      return area
    }
  },


};
</script>
