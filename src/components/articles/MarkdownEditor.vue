<template lang="pug">
    div
      b-form(@submit="onSave")
        b-form-group
          b-form-input(v-model="title" type="text" :state="titleValidation" required placeholder="Enter article's title")
          b-form-invalid-feedback(:tooltip="true" :state="titleValidation") Title required.
          br
        b-form-group
          b-form-textarea(v-model="preface" type="text" :state="prefaceValidation" placeholder="Enter article's preface")
          b-form-invalid-feedback(:tooltip="true" :state="prefaceValidation") Preface required.
          br
        b-form-group
          v-md-editor(
            v-model='body'
            :state="bodyValidation"
            :disabled-menus="[]"
            @upload-image="handleUploadImage"
            class="markdown-editor"
            height="500px")
          b-form-invalid-feedback(:tooltip="true" :state="bodyValidation") Body required.
          div(class="article-save-button")
            div(v-if="editorType === 'saving'")
              b-button(v-if="!saveButton.isLoading" @click='onSave'  type="submit" :variant="saveButton.variant") Save
              b-button(v-else disabled)
                b-spinner( small type="grow")
                | Saving...
            div(v-if="editorType === 'updating'")
              b-button(v-if="!updateButton.isLoading" @click='onUpdate'  type="submit" :variant="updateButton.variant") Update
              b-button(v-else disabled)
                b-spinner( small type="grow")
                | Updating...


</template>

<script>
import store from "@/store/store";
import objectStorage from "@/store/modules/objectStorage";

export default {
  name: "MarkdownEditor",
  props: {
    editorType: {
      default: "saving"
    },
    articleId: {
      default: null
    }
  },
  data() {
    return {
      saveButton: {
        isLoading: false,
        variant: "primary"
      },
      updateButton: {
        isLoading: false,
        variant: "primary"
      },
      body: " ",
      title: null,
      preface: null
    };
  },
  mounted() {
    if (this.editorType === "updating") {
      store.dispatch.article.getArticleById(this.articleId).then(article => {
        this.body = article.body;
        this.title = article.title;
        this.preface = article.preface;
      });
    }
  },
  computed: {
    titleValidation() {
      if (this.title === null) {
        return null;
      }
      return this.title.length > 0;
    },
    prefaceValidation() {
      if (this.preface === null) {
        return null;
      }

      return this.preface.length > 0;
    },
    bodyValidation() {
      if (this.body === " ") {
        return null;
      }
      return this.body.length > 0;
    },
    isFormValid() {
      return (
        this.titleValidation && this.prefaceValidation && this.bodyValidation
      );
    }
  },
  methods: {
    async handleUploadImage(event, insertImage, files) {
      const uploadedFiles = await store.dispatch.objectStorage.uploadFiles(
        files
      );

      console.log("uploadedFiles", uploadedFiles);

      if (files.length === 0) {
        return;
      }
      const file = uploadedFiles[0];
      insertImage({
        url: file.url
      });
    },
    toast(text, variant, append = false) {
      this.$bvToast.toast(text, {
        autoHideDelay: 3000,
        title: `Saving an article`,
        solid: true,
        variant: variant,
        appendToast: append
      });
    },
    onUpdate() {
      if (!this.isFormValid) {
        if (this.body === " ") {
          this.body = "";
        }
        if (this.title === null) {
          this.title = "";
        }
        if (this.preface === null) {
          this.preface = "";
        }
        return;
      }

      this.updateButton.isLoading = true;
      let updatingErr = null;

      store.dispatch.article
        .updateArticle({
          id: this.articleId,
          preface: this.preface,
          body: this.body,
          title: this.title,
          userId: store.getters.user.userId
        })
        .then(() => {
          const variant = "success";
          this.toast("The article was successfully updated", variant);
          this.updateButton.variant = variant;
        })
        .catch(err => {
          updatingErr = err;
          const variant = "danger";
          this.toast("Error while updating an article", variant);
          this.updateButton.variant = variant;
        })
        .finally(() => {
          setTimeout(() => {
            this.updateButton.isLoading = false;
            if (!updatingErr) {
              this.$emit("onUpdate");
            }
          }, 400);
        });
    },
    onSave() {
      if (!this.isFormValid) {
        if (this.body === " ") {
          this.body = "";
        }
        if (this.title === null) {
          this.title = "";
        }
        if (this.preface === null) {
          this.preface = "";
        }
        return;
      }

      this.saveButton.isLoading = true;
      let savingErr = null;

      store.dispatch.article
        .saveArticle({
          preface: this.preface,
          body: this.body,
          title: this.title,
          userId: store.getters.user.userId
        })
        .then(() => {
          const variant = "success";
          this.toast("The article was successfully saved", variant);
          this.saveButton.variant = variant;
        })
        .catch(err => {
          savingErr = err;
          const variant = "danger";
          this.toast("Error while saving an article", variant);
          this.saveButton.variant = variant;
        })
        .finally(() => {
          setTimeout(() => {
            if (!savingErr) {
              this.saveButton.isLoading = false;
              this.$emit("onSave");
            }
          }, 400);
        });
    }
  }
};
</script>

<style scoped>
.article-save-button {
  float: right;
  margin: 2%;
}
/*.markdown-editor {*/
/*    height: 70%;*/
/*}*/
</style>
