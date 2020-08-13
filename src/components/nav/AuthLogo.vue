<template lang="pug">
div
  img(:src='getImageUrl' height="20")

</template>

<script lang="ts">
import { UserAuthTypes } from "@/store/modules/user";
import Vue from "vue";

export default Vue.extend({
  name: "AuthLogo",

  props: {
    authType: {
      required: true,
      default: null
    }
  },
  computed: {
    getImageUrl(): string {
      if (this.$props.authType === UserAuthTypes.GOOGLE) {
        return `${process.env.BASE_URL}google-logo.png`;
      }
      if (this.$props.authType === UserAuthTypes.GITHUB) {
        return `${process.env.BASE_URL}github-logo.png`;
      }
      return "";
    }
  }
});
</script>

<style scoped></style>
