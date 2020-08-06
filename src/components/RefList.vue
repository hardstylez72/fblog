<template lang="pug">
    div(class="ref-list")
        b-list-group
            b-list-group-item(href='#some-link') Awesome link
            b-list-group-item(href='#' active='') Link with active state
            b-list-group-item(href='#') Action links are easy
            b-list-group-item(href='#foobar' disabled='') Disabled link
</template>

<script>
    export default {
        name: "RefList"
    }
</script>

<style scoped>
    .ref-list {
        min-width: 15%;
        margin: 1%;
    }
</style>