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
            left-toolbar="undo redo | image"
            @upload-image="handleUploadImage"
            class="markdown-editor"
            height="500px"
            lang="en-US")
          b-form-invalid-feedback(:tooltip="true" :state="bodyValidation") Body required.
          div(class="article-save-button")
            b-button(v-if="!saveButton.isLoading" @click='onSave'  type="submit" :variant="saveButton.variant") Save
            b-button(v-else disabled)
              b-spinner( small type="grow")
              | Saving...

</template>

<script>
import store from "@/store/store";
import objectStorage from "@/store/modules/objectStorage";

export default {
  name: "MarkdownEditor",
  data() {
    return {
      saveButton: {
        isLoading: false,
        variant: "primary"
      },
      body: " ",
      title: null,
      preface: null
    };
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
      if (this.preface === " ") {
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
      // Get the files and upload them to the file server, then insert the corresponding content into the editor
      console.log(files);

      const uploadedFiles = await store.dispatch.objectStorage.uploadFiles(
        files
      );

      const file = uploadedFiles.files[0];
      insertImage({
        url: file.url
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

      store.dispatch.article
        .saveArticle({
          preface: this.preface,
          body: this.body,
          title: this.title,
          userId: store.getters.auth.userId
        })
        .then(() => {
          this.saveButton.variant = "success";
        })
        .catch(() => {
          this.saveButton.variant = "danger";
        })
        .finally(() => {
          setTimeout(() => {
            this.saveButton.isLoading = false;
          }, 1000);
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
