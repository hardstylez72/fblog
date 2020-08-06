import requester from "@/store/requester";
import {Method} from "axios";

export interface Module1State {
    name: null | string
}
export default {
    namespaced: true as true,
    state: {
        name: null
    } as Module1State,
    getters: {
        message: state => `Hello, ${state.name}!`
    },
    mutations: {
        SET_NAME(state, newName: string) {
            state.name = newName
        },
    },
    actions: {
        makeRequest({commit}, payload: { method: Method, url: string, data: any }): Promise<any> {
            console.log(payload)
            return requester(payload.method, payload.url, payload.data)
        },
    }
}
