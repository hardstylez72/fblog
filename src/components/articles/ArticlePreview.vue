<template lang="pug">
  b-container.article-card(fluid='lg')
    b-card.mb-2( img-alt='Image' img-top='' tag='article')
      b-card-header {{article.createdAt}}
      b-card-title(@click="openArticle(article.id)" class="article-preview-title") {{ article.title }}
      b-card-text(@click="openArticle(article.id)" class="article-preview-preface") {{article.preface}}

</template>

<script lang="ts">
import Vue from "vue";
import { Article } from "@/store/modules/article";
import articleCard from "@/components/articles/ArticleCard.vue";

export default Vue.extend({
  props: {
    article: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      type: Article,
      required: true,
      default: {}
    }
  },
  components: {
    articleCard
  },
  name: "ArticlePreview",
  data() {
    return {};
  },
  methods: {
    openArticle(articleId) {
      return this.$emit("openArticle", articleId);
    }
  }
});
</script>

<style scoped>
.article-preview-title {
  cursor: pointer;
}
.article-preview-preface {
  cursor: pointer;
}
.article-card {
  margin: 3%;
  width: 90%;
}
</style>
