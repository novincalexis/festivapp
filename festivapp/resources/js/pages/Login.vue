<template>
    <div class="container login">
        <img class="desktop" src="/img/joey-thompson-4zN_-PKsbWw-unsplash.jpg" alt="">
        <div class="sidebar">
            <div class="sidebar-content">
                <h2>Tu nous as manqué !</h2>
                <p>Plus de 200 festivals attendent que tu en découvre plus sur eux !</p>
                <form>
                    <div class="input-text email">
                        <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off" placeholder="Email">
                    </div>
                    <div class="input-text password">
                        <input id="password" type="password" class="form-control" v-model="password" required
                                           autofocus autocomplete="off" placeholder="Mot de passe">
                    </div>
                    <button type="submit" class="btn btn-success" @click="handleSubmit">
                        Connexion
                    </button>
                    <p>
                        Vous n'avez pas de compte ?
                        <router-link to="/register">Inscription</router-link>
                    </p>
                    <p v-show="error">
                        Connexion impossible
                    </p>
                </form>    
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                email: "",
                password: "",
                error: null
            }
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault()
                if(this.password.length > 0) {
                    this.$axios.get('/sanctum/csrf-cookie').then(response => {
                        this.$axios.post('api/login', {
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            if (response.data.success) {
                                this.$router.go('/login')
                            } else {
                                this.error = response.data.message
                            }
                        })
                        .catch(function (error) {
                            this.error = true
                        });
                    })
                }
            }
        },

        beforeRouteEnter(to, from, next) {
            if (window.Laravel.isLoggedin) {
                return next('dashboard');
            }
            next();
        }
    }
</script>