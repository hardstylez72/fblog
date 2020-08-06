<template >
    <b-container class="article-card" fluid="lg">
        <b-card class="mb-2" title="Card Title" img-alt="Image" img-top="" tag="article">
            <b-card-header>card header</b-card-header>
            <b-card-body>b-card-body</b-card-body>
            <b-card-sub-title>b-card-sub-title</b-card-sub-title>
            <b-card-footer>b-card-footer</b-card-footer>
            <b-card-text>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </b-container>
</template>

<script>
    export default {
        name: "Article"
    }
</script>

<style scoped>
    .article-card{
        margin: 3%;
        width: 90%;
    }
</style>