<template>
    <div class="container">
        <nav class="navbar">
            <div>
                <div class="home">
                    <a v-if="isLoggedIn" class="burger-menu mobile" @click="this.open = !this.open"><img src="/img/icon/burger.png" alt="burger-menu"></a>
                    <a class="navbar-brand" href="/"><b>Festiv</b>app</a>
                </div>
                <div class="navbar-nav" v-if="isLoggedIn">
                    <a class="item add desktop" type="button" @click="this.$router.push('/posts/add')">Nouveau post</a>
                    <a class="item add mobile" type="button" @click="this.$router.push('/posts/add')">+</a>
                    <a class="nav-item nav-link mobile" style="cursor: pointer;" @click="logout"><img src="../..//public/img/icon/logout.svg" alt=""></a>
                    <a class="nav-item nav-link desktop" style="cursor: pointer;" @click="logout">Deconnexion</a>
                </div>
                <div class="navbar-nav" v-else>
                    <router-link to="/register" class="item">
                        <img class="desktop" src="/img/icon/add-user-svgrepo-com.svg"/>
                        Inscription
                    </router-link>
                    <router-link to="/login" class="item">Connexion</router-link>
                </div>
            </div>
        </nav>

        <div class="appcontainer">
            <div v-if="isLoggedIn" class="sidebar menu" :class="{ open: this.open }">
                <div>
                    <p>MENU</p>
                    <router-link @click="this.open = !this.open" active-class="active" to="/dashboard" exact>
                        Dashboard
                    </router-link>
                    <router-link @click="this.open = !this.open" active-class="active" to="/posts" exact>
                        Mes posts
                    </router-link>
                </div>
            </div>

            <div :class="{ content: isLoggedIn }">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "App",
        data() {
            return {
                isLoggedIn: false,
                open: false
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