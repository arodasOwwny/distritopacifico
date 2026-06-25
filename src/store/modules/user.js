export default {
  namespaced: true,
  state: () => ({
    projectProfile:[],
    userProfile:[],
    properties:[],
    viewProperty:[],
    selectedExtraParking:[],
    firstName:"",
    unitPropertyPrice: 0,
    extraParkingPrice: 0,
    preassignedParkingPrice: 0,
    finalMonthInput:0,
    finalReserveInput: 0,
    finalDepositInput: 0,
    totalFinancing:0,
    financingMonthAmount: 0,
    taxes:[],
    entitySelected: []
  }),
  getters: {
    propertyTotalAmount: (state) => {
      const val = state.unitPropertyPrice + state.extraParkingPrice + state.preassignedParkingPrice + state.taxesAmount
      return val
    },
    propertyTotalAmountWithTaxes: (state) => {
      const val = state.unitPropertyPrice + state.extraParkingPrice + state.preassignedParkingPrice
      return val
    },
    totalDeposit:(state) => {
      const propertyTotalValue = state.unitPropertyPrice + state.extraParkingPrice + state.preassignedParkingPrice
      //const tax = (state.projectProfile[0].taxes[0].percentValue == undefined ? 0 : state.projectProfile[0].taxes[0].percentValue) * propertyTotalValue
      //const propertyWithTaxes = propertyTotalValue + tax
      const percent = state.projectProfile[0].initial_fee_percentage / 100
      const deposit = (propertyTotalValue * percent) - state.finalReserveInput
      return deposit.toFixed(2)
    }
    
  },
  mutations: {
    ///carga inicial de proyecto
    PROJECT_DATA(state, payload){
      state.projectProfile = payload
    },
    PROPERTY_VIEW(state, payload){
      state.viewProperty = payload
    },
    UNIT_PROPERTY_PRICE(state, payload){
      state.unitPropertyPrice = payload
    },
    PREASSIGNED_PARKING_PRICE(state, payload){
      state.preassignedParkingPrice = payload
    },
    SEND_PROFILE_DATA(state, payload){
      state.userProfile = payload;
    },
    SEND_FIRST_NAME(state, payload){
      state.firstName = payload
    },
    SEND_PROPERTIES(state, payload){
      state.properties = payload
    },
    SELECTED_BEDROOMS_NUMBER(state, payload){
      state.bedRoomNumbersSelected = payload
    },
    SELECTED_LEVEL(state, payload){
      state.levelSelected = payload
    },
    ALL_PROPERTIES(state, payload){
      state.allProperties = payload
    },
    SELECTED_PARKING_EXTRA(state, payload){
      state.selectedExtraParking = payload
    },
    SELECTED_EXTRA_PARKING_PRICE(state, payload){
      state.extraParkingPrice = payload
    },
    FINAL_MONTH_INPUT(state, payload){
      state.finalMonthInput = payload
    },
    FINAL_DEPOSIT_INPUT(state, payload){
      state.finalDepositInput = payload
    },
    FINAL_RESERVE_INPUT(state, payload){
      state.finalReserveInput = payload
    },
    TOTAL_FINANCING(state, payload){
      state.totalFinancing = payload
    },
    FINANCING_MONTH_AMOUNT(state, payload){
      state.financingMonthAmount = payload
    },
    ENTITY_SELECTED(state, payload){
      state.entitySelected = payload
    }
  },
  actions: {},
};
