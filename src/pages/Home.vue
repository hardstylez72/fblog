<template lang="pug">
    b-container(align-v="start")
        b-row
            b-col(align-self="start" lg="lg")
              b-button(v-if="isAddArticleBtnVisible" @click="modalShow = !modalShow" size="md" pill variant="success" class="add-article-button") +
              b-modal(v-model="modalShow"  size="xl" :hide-footer="true" :no-close-on-backdrop="true")
                MarkdownEditor(@onSave="onArticleSave")
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
  data() {
    return {
      modalShow: false
    };
  },
  methods: {
    onArticleSave(err) {
      this.modalShow = false;
    }
  },
  computed: {
    isAddArticleBtnVisible(): boolean {
      return store.getters.user.isAdmin;
    }
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
