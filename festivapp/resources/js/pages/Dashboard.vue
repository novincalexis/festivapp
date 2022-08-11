<template>

<div class="festlist">
    <h5 class="">Tout les festivals</h5>
    <div class="cards">
        <div v-for="(post) in posts" :key="post.id" class="card">
            <div v-if="post.image" class="card-img">
                <img alt="post-img" width="100" v-bind:src="'/img/' +post.image">
            </div>
            <div class="card-detail">
                <p class="name">{{post.name}}</p>
                <p class="description">{{post.description}}</p>
                <p class="date">Posté le {{post.created_at}}</p>
            </div>
        </div>
    </div>
</div>


</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                posts: []
            }
        },
        created() {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                this.$axios.get('/api/posts')
                .then(response => {
                    this.posts = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
            });
        },
        methods: {
        },
        beforeRouteEnter(to, from, next) {
            if (!window.Laravel.isLoggedin) {
                window.location.href = "/";
            }
            next();
        }
    }

</script>