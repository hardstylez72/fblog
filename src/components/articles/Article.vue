<template lang="pug">
  b-container.article-card(fluid='lg')
    b-card.mb-2( img-alt='Image' img-top='' tag='article')
      b-card-title {{ article.title }}
      b-card-body {{ article.body }}
      b-card-text b-card-text.
</template>

<script lang="ts">
import Vue from "vue";
import { Article } from "@/store/modules/article";

export default Vue.extend({
  props: {
    article: {
      type: Article,
      required: true,
      default: {}
    }
  },
  name: "Article",
  data() {
    return {};
  }
});
</script>

<style scoped>
.article-card {
  margin: 3%;
  min-width: 80%;
}
</style>
