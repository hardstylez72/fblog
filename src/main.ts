import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import * as vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress';

Vue.config.productionTip = false;

VMdEditor.use(vuepressTheme);
Vue.use(VMdEditor);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store: store.original,
  render: h => h(App)
}).$mount("#app");
