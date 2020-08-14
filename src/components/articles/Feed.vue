<template lang="pug">
    div
      div(v-for="articlePreview in articlesPreviews")
        ArticlePreviewBlock(:article="articlePreview" @openArticle="openArticle")

      b-modal(v-model="showArticleCard" size="xl" :ok-only="true" :no-close-on-backdrop="true")
        ArticleCard(:articleId="articleId" @editArticle="editArticle")

      b-modal(v-model="showArticleEditor" size="xl" :hide-footer="true" :no-close-on-backdrop="true")
        MarkdownEditor(@onUpdate="onArticleUpdate" :articleId="articleId" editorType="updating")
</template>

<script lang="ts">
import store from "@/store/store";
import MarkdownEditor from "@/components/articles/MarkdownEditor.vue";
import ArticlePreviewBlock from "@/components/articles/ArticlePreview.vue";
import ArticleCard from "@/components/articles/ArticleCard.vue";
import { ArticlePreview } from "@/store/modules/article";
import Vue from "vue";
import { now, getDate } from "@/store/date";

export default Vue.extend({
  name: "FeedWithArticles",
  components: {
    ArticlePreviewBlock,
    ArticleCard,
    MarkdownEditor
  },
  data() {
    return {
      articlesPreviews: Array<ArticlePreview>(0),
      showArticleCard: false,
      showArticleEditor: false,
      articleId: null
    };
  },
  methods: {
    onArticleUpdate() {
      this.showArticleEditor = false;
    },
    openArticle(articleId) {
      this.showArticleCard = true;
      this.articleId = articleId;
    },
    editArticle(articleId) {
      this.showArticleEditor = true;
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
