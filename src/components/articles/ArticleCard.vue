<template lang="pug">
    div
      b-overlay(:show="showOverlay" rounded="sm")
        b-card(:aria-hidden="showOverlay ? 'true' : null")
          template(v-slot:header)
            h4(class="mb-0") {{article.title}}
              b-button(v-if="isEditButtonVisible" class="edit-article-btn" size="sm")
                b-icon(icon="pencil-square" @click="editArticle")
          b-card-header {{article.createdAt}}
          v-md-preview(:text="article.body")
</template>

<script lang="ts">
//
import Vue from "vue";
import store from "@/store/store";
import { Article } from "@/store/modules/article";

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
      article: {} as Article,
      showOverlay: false
    };
  },
  methods: {
    isEditButtonVisible() {
      return store.getters.user.isAdmin;
    },
    editArticle() {
      return this.$emit("editArticle", this.article.id);
    }
  },
  mounted() {
    this.showOverlay = true;
    store.dispatch.article
      .getArticleById(this.articleId)
      .then(article => {
        this.article = article;
      })
      .finally(() => (this.showOverlay = false));
  }
});
</script>

<style scoped>
.edit-article-btn {
  float: right;
}
</style>
