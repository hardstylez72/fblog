<template lang="pug">
    b-container(align-v="start")
        b-button(v-b-modal="'markdown-editor-modal'" pill variant="success" class="add-article-button") Add
        b-modal(id="markdown-editor-modal" size="xl")
            MarkdownEditor
        b-row
            b-col(align-self="start")
                RefList(class="ref-list-container")
            FeedWithArticles

</template>

<script lang="ts">

    import Vue from "vue";
    import NavigationPanel from '../components/Nav.vue'
    import RefList from "../components/RefList.vue";
    import FeedWithArticles from "../components/articles/Feed.vue";
    import MarkdownEditor from "../components/articles/MarkdownEditor.vue";

    export default Vue.extend({
      name: "Home",
      components: {
        NavigationPanel,
        RefList,
    FeedWithArticles,
        MarkdownEditor
      }
    })
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
    #markdown-editor-modal {
        width: 2000px;
    }
</style>
