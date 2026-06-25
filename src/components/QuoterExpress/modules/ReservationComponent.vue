<template>
  <div>
    <div class="bg-secondary text-lg text-white px-4 py-2 tracking-wide mt-10">
      Precios 
    </div>
    <div class="p-2 mt-1">
      <ul role="list" class="divide-y divide-four/20">
        <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Precio sin impuestos:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ currencyFormater(viewProperty.price_base) }}</p>
            </div>
          </li>
          <li class="flex justify-between gap-x-6 py-2">
            <div class="flex min-w-0 gap-x-4">

              <div class="min-w-0 flex-auto">
                <p class="text-base font-semibold text-gray-950">Precio con impuestos:</p>
              </div>
            </div>
            <div class=" shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-base text-gray-900">{{ currencyFormater(viewProperty.price) }}</p>
            </div>
          </li>
      </ul>
    </div>
    <div class="bg-secondary text-lg text-white px-4 py-2 tracking-wide mt-10">
      Enganche (12%)
    </div>
    <div class="p-2 mt-1">
      <ul role="list" class="divide-y divide-four/20">
        <!-- Enganche -->
        <li class="flex justify-between gap-x-6 py-2">
          <div>
            <p class="text-base font-semibold text-gray-950 mt-2">Enganche</p>
          </div>
          <div class="relative mt-1 shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-secondary sm:text-base"> Q. </span>
            </div>
            <input type="number" name="price" id="price" v-model="deposit"
              class="block w-full border-gray-300 bg-gray-100 text-right focus:border-primary focus:ring-primary sm:text-base" />
          </div>
        </li>
        <!-- Reserva -->
        <li class="flex justify-between gap-x-6 py-2">
          <div>
            <p class="text-base font-semibold text-gray-950 mt-4">Reserva:</p>
          </div>
          <div class="relative mt-1 shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span class="text-secondary sm:text-base"> Q. </span>
            </div>
            <input type="number" name="reserve" id="reserve" v-model="reserve"
              class="block w-full border-gray-300 bg-gray-100 text-right focus:border-primary focus:ring-primary sm:text-base" />
          </div>
        </li>
      </ul>
    </div>
    
  </div>
  <div class="mt-0 border-l-4 border-four  bg-blue-600/10 p-4 mb-4">
    <div class="flex w-full">
      <div class="ml-1 w-full text-left">
        <div class="flex">
          <div class="flex-shrink-0">
            <CashIcon class="h-5 w-5 text-four" aria-hidden="true" />
          </div>
          <div class="ml-2 flex-1 md:flex md:justify-between">
            <p class="text-base text-four">
              Su cuota mensual de enganche queda en:
               {{ currencyFormater((deposit) / months ) }} a {{ months }} meses.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  CashIcon,
  RefreshIcon,
} from "@heroicons/vue/outline";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      months: 0,
      deposit: 0,
      reserve: 0,
    };
  },
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    InformationCircleIcon,
    CalendarIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    CashIcon,
    RefreshIcon,
  },
  methods: {
    toStep(s) {
      this.$store.commit("ui/CHANGE_TO_STEP", s);
    },
    resetMonths() {
      this.months = this.projectProfile[0].initial_fee_month_fractionation;
    },
    resetDeposit() {
      this.deposit = this.totalDeposit;
    },
    resetReserve() {
      this.reserve = this.viewProperty.reservation;
    },

    currencyFormater(value) {
      let newVal2 = Math.round(value)
      const res = newVal2.toLocaleString("es-GT", {
        style: "currency",
        currency: "GTQ",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return res;
    },


  },
  watch: {
    months() {
      if (
        this.months > this.projectProfile[0].initial_fee_month_fractionation
      ) {
        this.resetMonths();
      } else {
        this.$store.commit("user/FINAL_MONTH_INPUT", this.months);
      }
    },
    deposit() {
      setTimeout(() => {
        if (this.deposit < this.totalDeposit) {
          this.resetDeposit();
          this.$store.commit("user/FINAL_DEPOSIT_INPUT", this.deposit);
        } else {
          this.$store.commit("user/FINAL_DEPOSIT_INPUT", this.deposit);
        }
      }, 6000);
    },
    reserve() {
      setTimeout(() => {
        if (this.reserve < this.viewProperty.reservation) {
          this.resetReserve();
          this.$store.commit(
            "user/FINAL_RESERVE_INPUT",
            this.viewProperty.reservation
          );
        } else {
          this.$store.commit("user/FINAL_RESERVE_INPUT", this.reserve);
        }
      }, 3000);
    },
  },
  computed: {
    ...mapState("user", [
      "projectProfile",
      "selectedExtraParking",
      "viewProperty",
      "finalReserveInput",
      "finalDepositInput",
    ]),
    ...mapGetters("user", ["totalDeposit"]),
    getMaxMonth() {
      const max = this.projectProfile[0].initial_fee_month_fractionation;
      this.months = max;
      return max;
    },
    getDeposit() {
      const minDeposit = this.totalDeposit;
      this.deposit = minDeposit;
      return minDeposit;
    },
    getReservation() {
      const minReservation = this.viewProperty.reservation;
      this.reserve = minReservation;
      return minReservation;
    },
  },
  mounted() {
    const minReservation = this.viewProperty.reservation;
    this.reserve = minReservation;
    const minDeposit = this.totalDeposit;
    this.deposit = minDeposit;
    const max = this.projectProfile[0].initial_fee_month_fractionation;
    this.months = max;
  },
};
</script>
