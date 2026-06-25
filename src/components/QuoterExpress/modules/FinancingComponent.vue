<template>
  <div class="mt-0">
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-four/20"></div>
      </div>

    </div>
    <div class="bg-secondary text-lg text-white px-4 py-2 tracking-wide mt-0">
      Financiamiento
    </div>
    <div class="p-2 mt-1">
      <ul role="list" class="divide-y divide-four/20">
        <!-- Precio sin impuestos -->
        <li class="flex justify-between gap-x-6 py-2">
          <div>
            <p class="text-base font-semibold text-gray-950 mt-2">Banco:</p>
          </div>
          <div class="text-base text-gray-900">
            <Listbox as="div" v-model="selected">

              <div class="-mt-1 ml-0 block">
                <ListboxButton
                  class="relative w-[13.5rem] cursor-default   border  bg-gray-100 py-2.5 pl-3 pr-10 text-left   sm:text-base">
                  <span class="block truncate">{{ selected.bankDetail.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-secondary" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                  leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-[13.5rem] overflow-auto  bg-white py-2 text-base  sm:text-base">
                    <ListboxOption as="template" v-for="b in projectProfile[0].financingEntities" :key="b.id" :value="b"
                      v-slot="{ active, selected }">
        <li :class="[
          active ? 'bg-secondary text-white' : 'text-secondary',
          'relative cursor-default select-none py-2 pl-3 pr-9',
        ]">
          <span :class="[
            selected ? 'font-semibold' : 'font-normal',
            'block truncate',
          ]">
            {{ b.bankDetail.name }}
          </span>

          <span v-if="selected" :class="[
            active ? 'text-white' : 'text-secondary',
            'absolute inset-y-0 right-0 flex items-center pr-4',
          ]">
            <CheckIcon class="h-5 w-5" aria-hidden="true" />
          </span>
        </li>
        </ListboxOption>
        </ListboxOptions>
        </transition>

    </div>
    </Listbox>
  </div>
  </li>
  <li class="flex justify-between gap-x-6 py-2">
    <div>
      <p class="text-base font-semibold text-gray-950 mt-4">Años:</p>
    </div>
    <div class="relative mt-1">
      <div class="relative mt-1">
        <div class="pointer-events-none absolute inset-y-0 left-0 text-right flex items-center pl-3">
          <CalendarIcon class="h-5 w-5 text-secondary" aria-hidden="true" />
        </div>
        <input type="number" v-model="years" name="years" id="years"
          class="block w-[13.5rem] border-gray-300 bg-gray-100 pl-10 text-right focus:border-secondary sm:text-base" />
      </div>

    </div>
  </li>


  </ul>
  </div>

  <div class="mt-4 border-secondary bg-none p-2 md:ml-3">
    <div class="flex">
      <div class="flex-shrink-0">
        <InformationCircleIcon class="h-5 w-5 text-secondary" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm font-semibold text-secondary">
          La tasa de interes de la entidad es de:
          {{ selected.monthly_interest_fee }}%
        </p>
      </div>
    </div>
  </div>

  <div class="mt-2 rounded-md border-secondary bg-none p-2 md:ml-3">
    <div class="flex">
      <div class="flex-shrink-0">
        <CalendarIcon class="h-5 w-5 text-secondary" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p class="text-sm font-semibold text-secondary">
          El plazo máximo de la entidad es de:
          {{ selected.max_financing_years }} años
        </p>
      </div>
    </div>
  </div>
  <div class="mt-6 border-l-4 border-four  bg-blue-600/10 p-4">
    <div class="flex w-full">
      <div class="ml-1 w-full text-left">
        <div class="flex">
          <div class="flex-shrink-0">
            <CashIcon class="h-5 w-5 text-four" aria-hidden="true" />
          </div>
          <div class="ml-2 flex-1 md:flex md:justify-between">
            <p class="text-base text-four">
              Su cuota mensual de financiamiento queda en:
              {{ currencyFormater(financingQuote) }} al mes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="mr-2 mt-6 flex justify-between md:mt-8">
    <button @click="toStep(2)">
      <ArrowLeftIcon class="-mt-7 ml-4 h-6 w-6 text-secondary" aria-hidden="true" />
    </button>
    <button v-if="finalDepositInput == 0" type="button" disabled
      class="mb-8 flex justify-center border border-transparent bg-primary/20 px-8 py-2 text-lg font-light tracking-wider text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto md:text-lg">
      <RefreshIcon class="mt- mr-2 mt-1 h-5 w-5 animate-spin" aria-hidden="true" />
      Calculando...
    </button>
    <button v-else @click="getUserData()" type="button"
      class="mb-8 flex justify-center border border-transparent bg-secondary px-8 py-2 text-lg font-normal tracking-wider text-white shadow-lg shadow-four/30 hover:animate-none hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto md:text-base">

      Recibir por Whatsapp
    </button>
  </div>
  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  ArrowLeftIcon,
  MailOpenIcon,
  CheckIcon,
  SelectorIcon,
  CashIcon,
  InformationCircleIcon,
  CalendarIcon,
  RefreshIcon,
  UserGroupIcon
} from "@heroicons/vue/outline";
import { mapGetters, mapState } from "vuex";
import clientApi from "@/graphql/client";
import quotesApi from "@/graphql/quotes";
export default {
  data() {
    return {
      selected: [],
      randomId: "",
      dateCreatedQuote: "",
      actualSeller: [],
      years: 0
    };
  },
  components: {
    ArrowLeftIcon,
    MailOpenIcon,
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
    InformationCircleIcon,
    CashIcon,
    CalendarIcon,
    RefreshIcon,
    UserGroupIcon
  },
  watch: {
    years() {
      setTimeout(() => {
        if (this.years > this.selected.max_financing_years) {
          this.years = this.selected.max_financing_years
        }
      }, 1000);
    },
    selected() {
      this.$store.commit("quoter/FINANCING_ENTITY_SELECTED", this.selected)
    }
  },
  methods: {

    toStep(s) {
      this.$store.commit("ui/CHANGE_TO_STEP", s);
    },
    currencyFormater(value) {
      const res = value.toLocaleString("es-GT", {
        style: "currency",
        currency: "GTQ",
      });
      return res;
    },
    async getUserData() {
      const email = this.userProfile.email;
      const res = await clientApi.getClient(email).then((v) => {
        if (v.length == 0) {
          this.$router.push("/");
        } else {
          this.actualSeller = v[0].companyRelations[0].sellerProfile;
          this.postData(v[0]);
          this.saveQuoteToClient(v[0]);
          this.$store.commit("ui/TOGGLE_QUOTER", false);
        }
      });
    },
    async saveQuoteToClient(user) {
      const fileUploadName = `${this.randomId}${user.phone}`;
      const monthDeposit = (this.finalDepositInput /
        this.finalMonthInput);
      const res = await quotesApi.createQuoteToClient(
        this.viewProperty.id,
        user.email,
        this.viewProperty.price,
        this.viewProperty.living_area,
        this.viewProperty.bedrooms,
        this.viewProperty.bathrooms,
        this.finalReserveInput,
        this.finalDepositInput,
        this.finalMonthInput,
        monthDeposit,
        this.selected.bankDetail.name,
        this.selected.monthly_interest_fee,
        this.financingMonthAmount,
        this.years,
        `https://owwny-b2b-base-files.s3.amazonaws.com/${fileUploadName}.pdf`,
        "quoter-express"
      );
    },
    async postData(user) {
      console.log(user)
      const url = "https://sq1.owwny.com/webhook/#";
      const totalArea = (this.viewProperty.construction_area + this.getAreaParkings()).toFixed(2)
      const aditionalParking =
        this.selectedExtraParking.length == 0
          ? 0
          : [this.selectedExtraParking].length;
      const parkingAssignedCount =
        this.viewProperty.parkings_relation.length == undefined
          ? 0
          : this.viewProperty.parkings_relation.length;
      const totalParkings = aditionalParking + parkingAssignedCount;
      const aditionalWarehouse = 0;
      const warehouseCount = 0;
      const totalWarehouses = aditionalWarehouse + warehouseCount;
      const monthDeposit = await (this.finalDepositInput /
        this.finalMonthInput);
      const familyIncoming = monthDeposit * 3;
      const fileUploadName = `${this.randomId}${user.phone}`;
      const formatFinalDeposit = Number(this.finalDepositInput);
      const formatFinalDepositWithReserve = (Number(this.finalDepositInput) + Number(this.finalReserveInput))
      let formData = new FormData();
      formData.append("dateCreated", this.dateCreatedQuote);
      formData.append("utm_source", this.utms.utm_source);
      formData.append("utm_medium", "Owwny");
      formData.append("utm_campaign", this.utms.utm_campaign);
      formData.append("utm_id", this.utms.utm_id);
      formData.append("utm_term", this.utms.utm_term);
      formData.append("utm_content", this.utms.utm_content);
      formData.append("first_name", this.firstName);
      formData.append("email", user.email);
      formData.append("complete_name", user.displayName);
      formData.append("phone", `${Number(user.area_code)}${user.phone}`);
      formData.append("proyectId", this.viewProperty.proyect_id);
      formData.append("companyId", this.projectProfile[0].company_id)
      formData.append("planeImgUrl", this.viewProperty.base_plane);
      formData.append("tower", this.viewProperty.tower);
      formData.append("unitNumber", this.viewProperty.unit_name);
      formData.append("bedrooms", this.viewProperty.bedrooms);
      formData.append("bathrooms", this.viewProperty.bathrooms);
      formData.append("UnitNameAndRooms", `${this.viewProperty.unit_name} - ${this.viewProperty.bedrooms}HAB.`);
      formData.append("typology", this.viewProperty.typology);
      formData.append("level", this.viewProperty.level);
      formData.append("livingArea", this.viewProperty.living_area);
      formData.append("balconyArea", this.viewProperty.balcony_area);
      formData.append("gardenArea", this.viewProperty.garden_area == null ? 0 : this.viewProperty.garden_area);
      formData.append("warehouseArea", 0);
      formData.append("parking1", `Parqueo: ${this.viewProperty.parkings_relation[0].unit_name}`);
      formData.append("parking2", this.viewProperty.parkings_relation[1] == undefined ? "-" : `Parqueo: ${this.viewProperty.parkings_relation[1].unit_name}`);
      formData.append("parking3", this.viewProperty.parkings_relation[2] == undefined ? "-" : `Parqueo: ${this.viewProperty.parkings_relation[2].unit_name}`);
      formData.append("priceWithOutTaxes", this.currencyFormater(this.viewProperty.price_base));
      formData.append("parkingArea", this.getAreaParkings())
      formData.append("unitPrice", this.currencyFormater(this.viewProperty.price));
      formData.append("parkingsCount", totalParkings);
      formData.append("totalArea", totalArea);
      formData.append("warehouseCount", totalWarehouses);
      formData.append("reserveAmount", this.currencyFormater(this.finalReserveInput));
      formData.append("familyAmount", familyIncoming);
      formData.append("monthDepoistFractions", this.finalMonthInput);
      formData.append("monthDepositAmount", this.currencyFormater(monthDeposit));
      formData.append("fileName", fileUploadName);
      formData.append("SellerName", "");
      formData.append("SellerLastname", "-");
      formData.append("SellerEmail", "-");
      formData.append("SellerPhone", "-");
      formData.append("interestEntitie", this.selected.monthly_interest_fee);
      formData.append("ref", this.viewProperty.reference);
      formData.append("depositPercent", "12%");
      formData.append("depositTotalAmount", this.currencyFormater(formatFinalDeposit));
      formData.append("depositTotalAmountWithReserve", this.currencyFormater(formatFinalDepositWithReserve));
      formData.append(
        "financingYearSelected",
        this.years
      );
      formData.append("financingEntitie", this.selected.bankDetail.name);
      formData.append("financingPercent", this.selected.monthly_interest_fee);
      formData.append("financingMaxYears", this.selected.max_financing_years);
      formData.append("financingMonthAmount", this.currencyFormater(this.financingMonthAmount));
      formData.append("financingAmount", this.currencyFormater(this.getFinancingAmount));
      formData.append("iusiAmount", this.currencyFormater(this.getIusiAmount));
      formData.append("secureAmount", this.currencyFormater(this.secureAmount));
      formData.append("financingIndividual30", this.currencyFormater(this.getIndividualFinancingAmount30));
      formData.append("financingIndividual25", this.currencyFormater(this.getIndividualFinancingAmount25));
      formData.append("financingIndividual20", this.currencyFormater(this.getIndividualFinancingAmount20));
      formData.append("financingIndividual15", this.currencyFormater(this.getIndividualFinancingAmount15));
      formData.append("financingIndividual10", this.currencyFormater(this.getIndividualFinancingAmount10));
      formData.append("financingIndividual5", this.currencyFormater(this.getIndividualFinancingAmount5));
      formData.append("financingMonth30", this.currencyFormater(this.financingMonth30));
      formData.append("financingMonth25", this.currencyFormater(this.financingMonth25));
      formData.append("financingMonth20", this.currencyFormater(this.financingMonth20));
      formData.append("financingMonth15", this.currencyFormater(this.financingMonth15));
      formData.append("financingMonth10", this.currencyFormater(this.financingMonth10));
      formData.append("financingMonth5", this.currencyFormater(this.financingMonth5));
      formData.append("familyIncome30", this.currencyFormater(this.financingMonth30 * 2));
      formData.append("familyIncome25", this.currencyFormater(this.financingMonth25 * 2));
      formData.append("familyIncome20", this.currencyFormater(this.financingMonth20 * 2));
      formData.append("familyIncome15", this.currencyFormater(this.financingMonth15 * 2));
      formData.append("familyIncome10", this.currencyFormater(this.financingMonth10 * 2));
      formData.append("familyIncome5", this.currencyFormater(this.financingMonth5 * 2));
    
      const request = new Request(url, {
        method: "POST",
        mode: "no-cors",
        body: formData,
        headers: {
          accept: "application/json;odata=verbose",
          contentType: "text/xml",
        },
      });
      this.$store.commit("ui/CHANGE_TO_STEP", 1);
      this.$store.commit("user/PROPERTY_VIEW", []);
      this.$store.commit("user/UNIT_PROPERTY_PRICE", 0);
      this.$store.commit("user/PREASSIGNED_PARKING_PRICE", 0);
      this.$store.commit("user/FINAL_DEPOSIT_INPUT", 0);
      this.$store.commit("user/FINAL_MONTH_INPUT", 0);
      this.$store.commit("user/FINAL_RESERVE_INPUT", 0);
      // pass request object to `fetch()`
      fetch(request)
      this.$moshaToast("Cotización enviada 📨📬", {
        type: "success",
        transition: "slide",
        position: "bottom-right",
        showIcon: true,
        hideProgressBar: false,
      });
      //.then((res) => res.json())
      //.then((res) => console.log(res));
    },
    getAreaParkings() {
      const area = this.viewProperty.parkings_relation.reduce(
        (accumulator, e) => {
          return accumulator + e.area;
        },
        0
      );
      return area
    }
  },
  created() {
    this.selected = this.projectProfile[0].financingEntities[0];
    this.years = this.selected.max_financing_years
  },
  computed: {
    ...mapState("user", [
      "projectProfile",
      "viewProperty",
      "extraParkingPrice",
      "preassignedParkingPrice",
      "unitPropertyPrice",
      "finalDepositInput",
      "finalMonthInput",
      "finalReserveInput",
      "financingMonthAmount",
      "userProfile",
      "entitySelected",
      "selectedExtraParking",
    ]),
    ...mapState("ui", ["utms"]),
    ...mapGetters("user", ["propertyTotalAmountWithTaxes"]),
    ...mapGetters("quoter", ["getFinancingAmount"]),
    financingMonth30(){
      const res = this.getIndividualFinancingAmount30 + this.getIusiAmount + this.secureAmount
      return res
    },
    financingMonth25(){
      const res = this.getIndividualFinancingAmount25 + this.getIusiAmount + this.secureAmount
      return res
    },
    financingMonth20(){
      const res = this.getIndividualFinancingAmount20 + this.getIusiAmount + this.secureAmount
      return res
    },
    financingMonth15(){
      const res = this.getIndividualFinancingAmount15 + this.getIusiAmount + this.secureAmount
      return res
    },
    financingMonth10(){
      const res = this.getIndividualFinancingAmount10 + this.getIusiAmount + this.secureAmount
      return res
    },
    financingMonth5(){
      const res = this.getIndividualFinancingAmount5 + this.getIusiAmount + this.secureAmount
      return res
    },

    totalFinancing() {
      let total =
        this.viewProperty.price -
        this.finalDepositInput -
        this.finalReserveInput;
      const quote =
        (total * (this.selected.monthly_interest_fee / 1200)) /
        (1 -
          Math.pow(
            1 + this.selected.monthly_interest_fee / 1200,
            -(this.selected.max_financing_years * 12)
          ));
      const res = quote * 12 * this.selected.max_financing_years;
      this.$store.commit("user/TOTAL_FINANCING", res);
      return res;
    },
    
    getIusiAmount(){
        if (this.getFinancingAmount == 0) {
          return 0
        } else {
          const res = +((this.viewProperty.price/1.11)*0.7)*(0.009/12)
          return res
        }
      },
    getFinancingAmount() {
      const res = ((this.viewProperty.price - (Number(this.finalDepositInput))))
      return this.currencyFormater(res)
    },
    secureAmount(){
        const res = ((((this.viewProperty.price - (Number(this.finalDepositInput)))) * 0.0035)/12);
        return Number(res)
      },
    financingQuote() {
      let total =
        this.propertyTotalAmountWithTaxes -
        this.finalDepositInput -
        this.finalReserveInput;

      const val =
        (total * (this.selected.monthly_interest_fee / 1200)) /
        (1 -
          Math.pow(
            1 + this.selected.monthly_interest_fee / 1200,
            -(this.years * 12)
          ));
      this.$store.commit("user/FINANCING_MONTH_AMOUNT", val);
      return val;
    },
    getIndividualFinancingAmount30() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 30 * 12;
    
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },

      getIndividualFinancingAmount25() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 25 * 12;
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },

      getIndividualFinancingAmount20() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 20 * 12;
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount15() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 15 * 12;
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount10() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 10 * 12;
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount5() {
        const tasaDecimal = this.selected.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 5 * 12;
        const cuota = ((this.viewProperty.price - (Number(this.finalDepositInput) + Number(this.finalReserveInput))) * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
  },
  mounted() {
    const t = new Date();
    let d = t.getDate();
    let month = t.getMonth();
    let year = t.getFullYear();
    let m = t.getMinutes();
    let s = t.getSeconds();
    let ss = t.getMilliseconds();
    this.dateCreatedQuote = `${d}/${month + 1}/${year}`;
    this.randomId = `${d}${m}${s}${ss}`;
  },
};
</script>

<style lang="scss" scoped></style>
