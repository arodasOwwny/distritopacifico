export default {
    namespaced: true,
    state: () => ({
      project: [],
      propertiesToQuote: [],
      addedPropeties: [],
      warehouses: [],
      initialDepositFractions: 10,
      extraProperties: [],
      aditionalAmounts: [],
      discountsSelected: [],
      extraSelection: [],
      planSelected: [],
      financingEntity: [],
      currecyOnResume: "",
      currencyLangOnResume:"",
      advance:0,
      positiveBalance:0,
      depositByClient:0,
      depositPercent:0,
      financingPercent:0,
      amountInFavor:0,
      previewModal:false
    }),
    getters: {
      unitPrices(state) {
        const sum = state.propertiesToQuote.reduce((accumulator, e) => {
          return accumulator + e.price; 
        }, 0);
        return sum;
      },
      unitPricesWithOutTaxes(state) {
        const sum = state.propertiesToQuote.reduce((accumulator, e) => {
          return accumulator + e.price_base;
        }, 0);
        return sum;
      },
      unitSQM(state) {
        const sum = state.propertiesToQuote.reduce((accumulator, e) => {
          return accumulator + e.construction_area;
        }, 0);
        return sum;
      },
      unitSQMLivingArea(state) {
        const sum = state.propertiesToQuote.reduce((accumulator, e) => {
          return accumulator + e.living_area + e.balcony_area + e.garden_area;
        }, 0);
        return sum;
      },
      sumAddedProperties(state) {
        const sum = state.addedPropeties.reduce((accumulator, e) => {
          return accumulator + e.price;
        }, 0);
        return sum;
      },
      sumAddedPropertiesWithOutTaxes(state) {
        const sum = state.addedPropeties.reduce((accumulator, e) => {
          return accumulator + e.price_base;
        }, 0);
        return sum;
      },
      sumAddedPropertiesSQM(state) {
        const sum = state.addedPropeties.reduce((accumulator, e) => {
          return accumulator + e.area;
        }, 0);
        return sum;
      },
      sumExtraProperties(state) {
        const sum = state.extraProperties.reduce((accumulator, e) => {
          return accumulator + e.price;
        }, 0);
        return sum;
      },
      sumExtraPropertiesSQM(state) {
        const sum = state.extraProperties.reduce((accumulator, e) => {
          return accumulator + e.area;
        }, 0);
        return sum;
      },
      sumExtraPropertiesWithOutTaxes(state) {
        const sum = state.extraProperties.reduce((accumulator, e) => {
          return accumulator + e.price_base;
        }, 0);
        return sum;
      },
      sumAditionalAmounts(state) {
        const sum = state.aditionalAmounts.reduce((accumulator, e) => {
          return accumulator + e.amount;
        }, 0);
        return sum;
      },
      sumExtraSelection(state) {
        const sum = state.extraSelection.reduce((accumulator, e) => {
          return accumulator + e.price;
        }, 0);
        return sum;
      },
      totalReserves(state) {
        const sum = state.propertiesToQuote.reduce((a, property) => {
          return a + property.reservation;
        }, 0);
        return sum;
      },
      totalDiscounts(state) {
        const sum = state.discountsSelected.reduce((accumulator, e) => {
          return accumulator + e.amount;
        }, 0);
        return sum;
      },
      totalAmount(state, getters) {
        const sum =
          getters.unitPrices +
          getters.sumAddedProperties +
          getters.sumExtraProperties +
          getters.sumAditionalAmounts +
          getters.sumExtraSelection;
        return sum;
      },
      totalAmountWithOutExtras(state, getters) {
        const sum =
          getters.unitPrices +
          getters.sumAddedProperties +
          getters.sumExtraProperties +
          getters.sumAditionalAmounts
        return sum;
      },
  
      totalSQM(state, getters) {
        const sum =
          getters.unitSQM +
          getters.sumAddedPropertiesSQM +
          getters.sumExtraPropertiesSQM
        return sum;
      },
      totalSQMonlyLiving(state, getters) {
        const sum =
          getters.unitSQMLivingArea +
          getters.sumAddedPropertiesSQM +
          getters.sumExtraPropertiesSQM
        return sum;
      },
      
      totalWithDiscount(state, getters) {
        const sum =
          getters.unitPrices +
          getters.sumAddedProperties +
          getters.sumExtraProperties +
          getters.sumAditionalAmounts +
          getters.sumExtraSelection - 
          getters.totalDiscounts
        return sum;
      },
      totalWithOutTaxesWithDiscount(state, getters) {
        const sum =
          getters.sumAddedPropertiesWithOutTaxes +
          getters.sumExtraPropertiesWithOutTaxes +
          getters.unitPricesWithOutTaxes -
          getters.totalDiscounts
        return sum;
      },
      totalFirstDepositWithOutReserve(state){
        const val = state.depositByClient - state.advance
        return val;
      },
      minDeposit(state, getters){
        const val = getters.totalWithDiscount * (state.depositPercent / 100);
        const res = val
        return res;
      },
      totalFirstDeposit(state, getters) {
        if (getters.totalFirstDepositWithOutReserve > getters.minDeposit) {
          const reserves = getters.totalReserves;
        const res = (getters.totalFirstDepositWithOutReserve - reserves) - state.propertiesToQuote[0].signature_price  ;
         if (res < 0) {
            state.amountInFavor = res
            return res
         } else {
          return res;  
         }
        
        } else {
          const reserves = getters.totalReserves;
          const res = (getters.totalFirstDepositWithOutReserve - reserves) - state.propertiesToQuote[0].signature_price    ;
          if (res < 0) {
            state.amountInFavor = res
            return res
         } else {
          return res;  
         }
        }
        
      },
      getFinancingAmount(state, getters) {
        if (state.positiveBalance > 0) {
          const res = getters.totalWithDiscount - state.advance 
        return res
        } else {
          const res = getters.totalWithDiscount - (getters.totalFirstDepositWithOutReserve + state.advance )
          return res 
        }
      },
      getFinancingMonthAmount(state, getters) {
        const res =
          getters.getIndividualFinancingAmount ;
        return res;
      },
      getIndividualFinancingAmount(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = state.financingEntity.max_financing_years * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount30(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 30 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount25(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 25 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount20(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 20 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount15(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 15 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount10(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 10 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIndividualFinancingAmount5(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = 5 * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      FinancingAmountWithSecureAndTaxes(state, getters) {
        const tasaDecimal = state.financingEntity.monthly_interest_fee / 100;
        const tasaMensual = tasaDecimal / 12;
        const numPagos = state.financingEntity.max_financing_years * 12;
    
        const cuota = (getters.getFinancingAmount * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numPagos));
        return cuota;
      },
      getIusiAmount(state, getters){
        if (getters.getFinancingAmount == 0) {
          return 0
        } else {
          const res = +((getters.totalWithDiscount/1.11)*0.7)*(0.009/12)
          return res
        }
      },
      secureAmount(state, getters){
        const res = +(((getters.getFinancingAmount) * 0.0035)/12);
        return res
      },
      anualSecureAmount(state, getters){
        const res = +(((getters.getFinancingAmount) * 0.0035));
        return res
      },
      anualIusiAmount(state, getters){
        if (getters.getFinancingAmount == 0) {
          return 0
        } else {
          const res = +((getters.totalWithDiscount/1.11)*0.7)*(0.009)
          return res
        }
      },
    },
    mutations: {
      selectedProject(state, payload) {
        state.project = payload;
      },
      PROPERTIES_TO_QUOTER(state, payload) {
        state.advance = 0,
          state.amountInFavor = 0
          state.positiveBalance = 0
          state.extraProperties = [],
          state.discountsSelected = [],
        state.propertiesToQuote.push(payload);
        const property = payload;
  
        if (property.parkings_relation.length != 0) {
          property.parkings_relation.forEach((element) => {
            state.addedPropeties.push(element);
          });
        }
  
        if (property.warehouses_relation.length != 0) {
          property.warehouses_relation.forEach((element) => {
            state.addedPropeties.push(element);
          });
        }
      },
      CLEAN_PROPERTIES_ON_QUOTER(state, payload) {
        state.propertiesToQuote = payload;
      },
      CLEAN_ADDED_PROPERTIES(state, payload) {
        state.addedPropeties = payload;
      },
      REMOVE_PROPERTY_ON_QUOTER(state, payload) {
        const pos = state.propertiesToQuote.findIndex(
          (el) => el.id === payload.id
        );
        if (pos >= 0) state.propertiesToQuote.splice(pos, 1);
  
        if (payload.parkings_relation.length != 0) {
          payload.parkings_relation.forEach((element) => {
            let pos = state.addedPropeties.findIndex(
              (el) => el.id === element.id
            );
            if (pos >= 0) state.addedPropeties.splice(pos, 1);
          });
        }
  
        if (payload.warehouses_relation.length != 0) {
          payload.warehouses_relation.forEach((element) => {
            let pos = state.addedPropeties.findIndex(
              (el) => el.id === element.id
            );
            if (pos >= 0) state.addedPropeties.splice(pos, 1);
          });
        }
      },
      REMOVE_RELATIONAL_PROPERTY_ON_QUOTER(state, payload) {
          
            let pos = state.addedPropeties.findIndex(
              (el) => el.id === payload.id
            );
            if (pos >= 0) state.addedPropeties.splice(pos, 1);
          
      },
      SET_INITIAL_DEPOSIT_FRACTIONS(state, payload) {
        state.initialDepositFractions = payload;
      },
      ADD_EXTRA_PROPERTY(state, payload) {
        state.extraProperties.push(payload);
      },
      REMOVE_EXTRA_PROPERTY(state, payload) {
        const pos = state.extraProperties.findIndex((el) => el.id === payload);
        if (pos >= 0) state.extraProperties.splice(pos, 1);
      },
      ADITIONAL_AMOUNTS(state, payload) {
        state.aditionalAmounts.push(payload);
      },
      REMOVE_ADITIONAL_AMOUNTS(state, payload) {
        const pos = state.aditionalAmounts.findIndex((el) => el.id === payload);
        if (pos >= 0) state.aditionalAmounts.splice(pos, 1);
      },
      DISCOUNT_ADDED(state, payload) {
        state.discountsSelected.push(payload);
      },
      REMOVE_DISCOUNT(state, payload) {
        const pos = state.discountsSelected.findIndex((el) => el.id === payload);
        if (pos >= 0) state.discountsSelected.splice(pos, 1);
      },
      SEND_EXTRA_SELECTION(state, payload) {
        state.extraSelection = payload;
      },
      CLEAN_VALUES(state) {
          (state.propertiesToQuote = []),
          (state.addedPropeties = []),
          (state.warehouses = []),
          (state.extraProperties = []),
          (state.aditionalAmounts = []),
          (state.discountsSelected = []),
          (state.extraSelection = []),
          (state.financingEntity = [])
          state.advance = 0,
          state.amountInFavor = 0
          state.positiveBalance = 0
      },
      CLEAN_DISCOUNTS(state){
        (state.discountsSelected = [])
        state.positiveBalance = 0
      },
      PLAN_SELECTION(state, payload) {
        state.planSelected = payload;
      },
      FINANCING_ENTITY_SELECTED(state, payload) {
        state.financingEntity = payload;
      },
      CHANGE_CURRENCY_ON_RESUME(state, payload) {
        state.currecyOnResume = payload.currency,
        state.currencyLangOnResume = payload.lang
      },
      SEND_ADVANCE_AMOUNT(state, payload){
        state.advance = payload
      },
      DEPOSIT_BY_CLIENT(state, payload){
          state.depositByClient = payload
      },
      SET_POSITIVE_BALANCE(state, payload){
        state.positiveBalance = payload
      },
      SET_DEPOSIT_PERCENT(state, payload){
        state.depositPercent = payload
      },
      SET_FINANCING_PERCENT(state, payload){
        state.financingPercent = payload
      },
      OPEN_MODAL_PREVIEW_PDF(state, payload){
        state.previewModal = payload
      }
    },
    actions: {},
  };
  