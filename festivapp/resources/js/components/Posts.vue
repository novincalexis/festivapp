<template>

<div class="festlist">
    <h5 class="">Tout les festivals</h5>
    <input type="text" v-model="search" placeholder="Rechercher">
    <h5>Trier par nom</h5>
    <div>
        <button @click="sortLowest">A-Z</button>
        <button @click="sortHighest">Z-A</button>
    </div>
    <h5>Trier par date</h5>
    <div>
        <button @click="dateLow">Récent</button>
        <button @click="dateHigh">Ancien</button>
    </div>

    <div class="cards">
        <div v-for="(post) in filteredPosts" :key="post.id" class="card">
            <router-link :to="`/posts/${post.id}`" v-if="post.image" class="card-img">
                <img alt="post-img" width="100" v-bind:src="'/img/' +post.image">
            </router-link>
            <router-link :to="`/posts/${post.id}`" class="card-detail">
                <p class="name">{{post.name}}</p>
                <p class="description">{{post.description}}</p>
                <p class="date">Posté le {{post.created_at}}</p>
            </router-link>
            <div class="card-actions">
                <router-link :to="{name:'editpost', params: {id:post.id}}"><img width="20" src="/img/icon/crayon.png" /></router-link>
                <a @click="deletePost(post.id)"><img width="20" src="/img/icon/trash.png" /></a>
            </div>
        </div>
    </div>
</div>


</template>

<script>
    export default {
        data() {
            return {
                posts: [],
                search: [],
                strSuccess: '',
                strError: ''
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
            deletePost(id) {
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    let existingObj = this;

                    if(confirm("Do you really want to delete this data?")) {
                        this.$axios.delete(`/api/posts/delete/${id}`)
                        .then(response => {

                            let i = this.posts.map(item => item.id).indexOf(id); // find index of your object
                            this.posts.splice(i, 1);
                            existingObj.strError = "";
                            existingObj.strSuccess = response.data.success;

                        })
                        .catch(function(error) {
                            existingObj.strError = "";
                            existingObj.strSuccess = error.response.data.message;
                        });
                    }
                });
            },
            sortLowest() {
                this.posts.sort((a,b) => a.name > b.name ? 1 : -1);
            },
            sortHighest() {
                this.posts.sort((a,b) => a.name < b.name ? 1 : -1);
            },
            dateHigh() {
                this.posts.sort((a,b) => a.created_at > b.created_at ? 1 : -1);
            },
            dateLow() {
                this.posts.sort((a,b) => a.created_at < b.created_at ? 1 : -1);
            }
        },

        computed: {
            filteredPosts: function(){
                return this.posts.filter((posts) => {
                    return posts.description.match(this.search) || posts.name.match(this.search);
                })
            }
        },

        beforeRouteEnter(to, from, next) {
            if (!window.Laravel.isLoggedin) {
                window.location.href = "/";
            }
            next();
        }
    }

</script>