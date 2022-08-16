<template>
    <div class="container register">
        <img class="desktop" src="/img/joey-thompson-4zN_-PKsbWw-unsplash.jpg" alt="">
        <div class="sidebar">
            <div class="sidebar-content">
                <h2>Tu nous as manqué !</h2>
                <p>Plus de 200 festivals attendent que tu en découvre plus sur eux !</p>
                <form>
                    <div class="input-text name">
                        <input id="name" type="name" class="form-control" v-model="name" required
                                           autofocus autocomplete="off" placeholder="Nom">
                    </div>
                    <div class="input-text email">
                        <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off" placeholder="Email">
                    </div>
                    <div class="input-text password">
                        <input id="password" type="password" class="form-control" v-model="password" required
                                           autofocus autocomplete="off" placeholder="Mot de passe">
                    </div>
                    <button type="submit" class="btn btn-success" @click="handleSubmit">
                        Inscription
                    </button>
                    <p>
                        Vous avez déjà un compte ?
                        <router-link to="/login">Connexion</router-link>
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
                name: "",
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
                        this.$axios.post('api/register', {
                            name: this.name,
                            email: this.email,
                            password: this.password
                        })
                        .then(response => {
                            if (response.data.success) {
                                 window.location.href = "/login"
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
