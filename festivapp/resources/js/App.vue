<template>
    <div class="container">
        <nav class="navbar">
            <a class="navbar-brand" href="/"><b>Festiv</b>app</a>
            <div class="navbar-nav" v-if="isLoggedIn">
                <router-link to="/dashboard" class="nav-item nav-link">Dashboard</router-link>
                <router-link to="/posts" class="nav-item nav-link">Festivals</router-link>
                <a class="nav-item nav-link" style="cursor: pointer;" @click="logout">Deconnexion</a>
            </div>
            <div class="navbar-nav" v-else>
                <router-link to="/register" class="item">
                    <img src="/img/icon/add-user-svgrepo-com.svg"/>
                    Inscription
                </router-link>
                <router-link to="/login" class="item">Connexion</router-link>
            </div>
        </nav>


        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                isLoggedIn: false,
            }
        },
        created() {
            if (window.Laravel.isLoggedin) {
                this.isLoggedIn = true
            }
        },
        methods: {
            logout(e) {
                e.preventDefault()
                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('/api/logout')
                    .then(response => {
                        if(response.data.success) {
                            window.location.href = "/"
                        } else {
                            console.log(response);
                        }
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
                })
            }
        },
    }


</script>