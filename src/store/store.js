import { createStore } from "vuex";

import user from "./modules/user"
import ui from "./modules/ui";
import quoter from "./modules/quoter";

const store = createStore({
  modules:{
      user,
      ui,
      quoter
  }
})

export default store