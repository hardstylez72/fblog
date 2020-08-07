<template lang="pug">
    div
        b-navbar(toggleable='lg' type='dark' variant='info')
            b-navbar-brand(href='#') Eblog
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
                        b-dropdown-item(href='#') Log in
                        b-dropdown-item(href='#') Sign Out
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Nav"
});
</script>

<style scoped></style>
