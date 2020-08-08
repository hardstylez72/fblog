<template lang="pug">
    div
      div(v-for="article in articles")
        articlePreface(:article="article")

</template>

<script lang="ts">
import store from "@/store/store";
import articlePreface from "./ArticlePreface.vue";
import { Article } from "@/store/modules/article";
import Vue from "vue";
import { now, getDate } from "@/store/date";

export default Vue.extend({
  name: "FeedWithArticles",
  components: {
    articlePreface
  },
  data() {
    return {
      articles: Array<Article>(0)
    };
  },
  mounted() {
    const to = getDate(now()).endOf("month");
    const from = getDate(now()).startOf("month");
    store.dispatch.article
      .getArticlesByPeriod({ from: from, to: to })
      .then(articles => {
        this.articles = articles;
      });
  }
});
</script>

<style scoped></style>
