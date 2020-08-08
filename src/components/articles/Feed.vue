<template lang="pug">
    div
      div(v-for="articlePreview in articlesPreviews")
        articlePreview(:article="articlePreview" @openArticle="openArticle")
      b-modal(v-model="showArticle" id="article-card" size="xl" :ok-only="true" :no-close-on-backdrop="true")
        articleCard(:articleId="articleId")
</template>

<script lang="ts">
import store from "@/store/store";
import articlePreview from "@/components/articles/ArticlePreview.vue";
import articleCard from "@/components/articles/ArticleCard.vue";
import { ArticlePreview } from "@/store/modules/article";
import Vue from "vue";
import { now, getDate } from "@/store/date";

export default Vue.extend({
  name: "FeedWithArticles",
  components: {
    articlePreview,
    articleCard
  },
  data() {
    return {
      articlesPreviews: Array<ArticlePreview>(0),
      showArticle: false,
      articleId: null
    };
  },
  methods: {
    openArticle(articleId) {
      this.showArticle = true;
      this.articleId = articleId;
    }
  },
  mounted() {
    const to = getDate(now()).endOf("month");
    const from = getDate(now()).startOf("month");
    store.dispatch.article
      .getArticlesByPeriod({ from: from, to: to })
      .then(articles => {
        this.articlesPreviews = articles;
      });
  }
});
</script>

<style scoped></style>
