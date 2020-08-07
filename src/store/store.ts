import Vue from "vue";
import Vuex from 'vuex'

import { createDirectStore } from "direct-vuex"
import article from "./modules/article"
import {Method} from "axios";
import requester from "@/store/requester";

Vue.use(Vuex)

  const { store, rootActionContext, moduleActionContext } = createDirectStore({
    actions: {
      makeRequest({commit}, payload: { method: Method, url: string, data: any }): Promise<any> {
        return requester(payload.method, payload.url, payload.data)
      },
    },
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
