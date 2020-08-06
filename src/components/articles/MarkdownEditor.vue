<template lang="pug">
    div
        b-form-input(v-model="title" placeholder="Enter article's title")
        br
        v-md-editor(v-model='body' class="markdown-editor" height="500px" lang="en-US")
        b-button(@click='onSave') Save
</template>

<script>
import store from '@/store/store'
    export default {
        name: "MarkdownEditor",
        data() {
            return {
                body: '',
                title: '',
            };
        },
        methods: {
            onSave() {
                console.log(this.body + this.title)
              store.dispatch.article.makeRequest({
                    method: 'post',
                    url: '/api/v1/article',
                    data: {
                        body: this.body,
                        title: this.title,
                        userId: 'cfdbd4f3-b910-4bf4-aa6b-a79a5372998c'
                    },
                })
                    .catch(console.error)
                    .finally(() => {
                      // eslint-disable-next-line no-undef
                      cosnole.error('gg')
                    })

            }
        }
    }
</script>

<style scoped>
    /*.markdown-editor {*/
    /*    height: 70%;*/
    /*}*/

</style>
