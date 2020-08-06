import Vue from "vue";
import Vuex from 'vuex'

import { createDirectStore } from "direct-vuex"
import article from "./modules/article"

Vue.use(Vuex)

  const { store, rootActionContext, moduleActionContext } = createDirectStore({
    modules: {
      article: article,
    }
  })

export default store

export { rootActionContext, moduleActionContext }

export type AppStore = typeof store
declare module "vuex" {
  interface Store<S> {
    direct: AppStore
  }
}
