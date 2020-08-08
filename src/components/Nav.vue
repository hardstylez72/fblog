<template lang="pug">
    div
        b-navbar(toggleable='lg' type='dark' variant='info')
            b-navbar-brand(href='#') Eblog {{isAuthorized}}
            b-navbar-toggle(target='nav-collapse')
            b-collapse#nav-collapse(is-nav='')
                b-navbar-nav.ml-auto
                    b-nav-form
                        b-form-input.mr-sm-2(size='sm' placeholder='Search')
                        b-button.my-2.my-sm-0(size='sm' type='submit') Search
                    b-nav-item-dropdown(right='')
                        // Using 'button-content' slot
                        template(v-slot:button-content='')
                            em User
                        b-dropdown-item(v-if="!isAuthorized" @click="login") Log in
                        b-dropdown-item(v-if="isAuthorized" @click="logout") Sign Out
</template>

<script lang="ts">
import store from "@/store/store";
import Vue from "vue";
export default Vue.extend({
  name: "Nav",
  computed: {
    isAuthorized(): boolean {
      return store.getters.auth.isAuthorized;
    }
  },
  methods: {
    login() {
      return store.dispatch.auth.authorizeWithGoogle();
    },
    logout() {
      return store.dispatch.auth.logout();
    }
  }
});
</script>

<style scoped></style>
