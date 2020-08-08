<template lang="pug">
    div
      b-card(:title="article.title")
        b-card-header {{article.createdAt}}
        v-md-preview(:text="article.body")
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/store";
import Article from "@/store/modules/article";

export default Vue.extend({
  props: {
    articleId: {
      type: String,
      required: true,
      default: ""
    }
  },
  name: "ArticleCard",
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      //@ts-ignore next-line
      article: {} as Article
    };
  },
  mounted() {
    store.dispatch.article.getArticleById(this.articleId).then(article => {
      this.article = article;
    });
  }
});
</script>

<style scoped></style>
