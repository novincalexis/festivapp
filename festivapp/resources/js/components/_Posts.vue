<template>

<div class="festlist">
    <p id="href" v-text="this.$route.query.page"></p>
    <div class="cards full">

        <template style="width: calc(100% - 50px);" v-for="(post) in posts" :key="post.id">
            <div style="width:100%" v-if="post.id == postId">
                <div v-if="post.image" class="card-img">
                    <img alt="post-img" width="100" v-bind:src="'/img/' +post.image">
                    <p class="name">{{post.name}}</p>
                </div>
                <div class="card-detail">
                    <p class="description">{{post.description}}</p>
                    <p class="date">Posté le {{post.created_at}}</p>
                </div>
            </div>
        </template>
    </div>
</div>


</template>

<script>
    export default {
        name: "PostsDetail",
        data() {
            return {
                posts: [],
                postId,
                pathArray
            }
        },
        created() {
            let pathArray = window.location.pathname.split('/');
            var postId = pathArray[2];
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.get('/api/posts')
                .then(response => {
                    this.pathArray = window.location.pathname.split('/');
                    this.postId = pathArray[2];
                    console.log(postId);
                    this.posts = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
            });
        }
    }

    let pathArray = window.location.pathname.split('/');
    var postId = pathArray[2];

</script>