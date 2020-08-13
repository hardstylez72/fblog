<template lang="pug">
    div
        b-navbar(toggleable='lg' type='dark' variant='info')
            b-navbar-brand(href='#') Eblog
            b-navbar-toggle(target='nav-collapse')
            b-collapse#nav-collapse(is-nav='')
                b-navbar-nav.ml-auto
                    b-nav-item-dropdown(right='' :text="userLogin")
                        // Using 'button-content' slot
                        template(v-slot:button-content='')
                            em(v-if="!isAuthorized") User
                            em(v-else) {{userLogin}}
                              AuthLogo(style="display: inline; margin-left: 1%;" :authType="user.externalAuthType")

                        b-dropdown-item(v-if="!isAuthorized" @click="loginWithGoogle") Log in with google
                          AuthLogo(style="display: inline; margin-left: 1%;" authType="Google")
                        b-dropdown-item(v-if="!isAuthorized" @click="loginWithGitHub") Log in with github
                          AuthLogo(style="display: inline; margin-left: 1%;" authType="Github")
                        b-dropdown-item(v-if="isAuthorized" @click="logout") Sign Out
</template>

<script lang="ts">
import store from "@/store/store";
import Vue from "vue";
import { User } from "@/store/modules/user";
import AuthLogo from "@/components/nav/AuthLogo.vue";
export default Vue.extend({
  name: "Nav",
  components: {
    AuthLogo
  },
  computed: {
    isAuthorized(): boolean {
      return store.getters.user.isAuthorized;
    },
    user(): User {
      return store.getters.user.user;
    },
    userLogin(): string {
      console.log(this.user);
      if (this.user.login) {
        return this.user.login;
      }
      if (this.user.email) {
        return this.user.email;
      }
      return "";
    }
  },
  methods: {
    loginWithGoogle() {
      return store.dispatch.user.authorizeWithGoogle();
    },
    loginWithGitHub() {
      return store.dispatch.user.authorizeWithGitHub();
    },
    logout() {
      return store.dispatch.user.logout();
    }
  }
});
</script>

<style scoped></style>
