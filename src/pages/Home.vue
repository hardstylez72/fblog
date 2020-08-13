<template lang="pug">
    b-container(align-v="start")
        b-row
            b-col(align-self="start")
              b-button(v-b-modal="'markdown-editor-modal'" size="md" pill variant="success" class="add-article-button") +
              b-modal(id="markdown-editor-modal" size="xl" :hide-footer="true" :no-close-on-backdrop="true")
                MarkdownEditor
              FeedWithArticles
</template>

<script lang="ts">
import Vue from "vue";
import NavigationPanel from "@/components/nav/Nav.vue";
import RefList from "../components/RefList.vue";
import FeedWithArticles from "../components/articles/Feed.vue";
import MarkdownEditor from "../components/articles/MarkdownEditor.vue";
import store from "@/store/store";

export default Vue.extend({
  name: "Home",
  components: {
    NavigationPanel,
    RefList,
    FeedWithArticles,
    MarkdownEditor
  },
  mounted() {
    store.dispatch.user.getMe();
  }
});
</script>

<style scoped>
.home-container {
}
.ref-list-container {
}
.add-article-button {
  float: right;
  margin: 1%;
}
</style>
