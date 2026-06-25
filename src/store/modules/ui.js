export default {
  namespaced: true,
  state: () => ({
    popupImage: false,
    imageSelected: {},
    imageGallery: [],
    individualImage: [],
    individualImagePopup: false,
    quoterStep: 1,
    authContainerStep: 0,
    showLoadingProperties: false,
    showQuoter: false,
    filterPropeties: [],
    tourToggle: false,
    utms: [],
    typeSelection: "Modelo A"
  }),
  getters: {},
  mutations: {
    IMAGE_TO_POPUP(state, payload) {
      state.imageSelected = payload.img;
      state.imageGallery = payload.gallery;
    },
    TOGGLE_POPUP_IMAGE(state, payload) {
      state.popupImage = payload;
    },
    CHANGE_SINGLE_IMAGE(state, payload) {
      state.imageSelected = payload;
    },
    AUTH_QUOTER_CONTAINER_STEP(state, payload) {
      state.authContainerStep = payload;
    },
    UTMS(state, payload) {
      state.utms = payload;
    },
    SHOW_LOADING_AT_PROPERTIES(state, payload) {
      state.showLoadingProperties = payload;
    },
    TOGGLE_QUOTER(state, payload) {
      state.showQuoter = payload;
    },
    FILTER_PROPERTIES(state, payload) {
      state.filterPropeties = payload;
    },
    CHANGE_TO_STEP(state, payload){
      state.quoterStep = payload;
    },
    TOGGLE_POPUP_INDIVIDUAL_IMAGE(state, payload){
      state.individualImagePopup = payload
    },
    INDIVIDUAL_POPUP_IMAGE(state, payload){
      state.individualImage = payload
    },
    TOGGLE_TOUR(state, payload){
      state.tourToggle = payload
    },
    TYPE_SELECTION(state, payload){
      state.typeSelection = payload
    }
  },
  actions: {},
};
