import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import enUS from "@kangc/v-md-editor/lib/lang/en-US";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import * as vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress";

import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

Vue.config.productionTip = false;
VMdPreview.use(vuepressTheme);
VMdEditor.lang.use("en-US", enUS);
VMdEditor.use(vuepressTheme);
Vue.use(VMdPreview);
Vue.use(VMdEditor);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store: store.original,
  render: h => h(App)
}).$mount("#app");
