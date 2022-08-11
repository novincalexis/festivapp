<template>
    <div class="container login">
        <img src="/img/joey-thompson-4zN_-PKsbWw-unsplash.jpg" alt="">
        <div class="sidebar">
            <div class="sidebar-content">
                <h2>Tu nous as manqué !</h2>
                <p>Plus de 200 festivals attendent que tu en découvre plus sur eux !</p>
                <form>
                    <div class="input-text email">
                        <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off" placeholder="Email">
                        <!--<span>Email</span>-->
                    </div>
                    <div class="input-text password">
                        <input id="password" type="password" class="form-control" v-model="password" required
                                           autofocus autocomplete="off" placeholder="Mot de passe">
                        <!--<span>Mot de passe</span>-->
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
        <!--<div class="row jutify-content-center">
            <div class="col-md-8">
                <div v-if="error !== null" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                
                    <strong>{{error}}</strong>
                </div>
                
                <div class="card card-default">
                    <div class="card-header"><h5>Connexion</h5></div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">Adresse mail</label>
                                <div class="col-md-8">
                                    <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off" placeholder="Entrer votre email">
                                </div>
                            </div>


                            <div class="form-group row mt-1">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Mot de passe</label>
                                <div class="col-md-8">
                                    <input id="password" type="password" class="form-control" v-model="password"
                                           required autocomplete="off" placeholder="Entrer votre mot de passe">
                                </div>
                            </div>

                            <div class="form-group row mt-1 mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-success" @click="handleSubmit">
                                        Connexion
                                    </button>
                                </div>
                            </div>

                            <div class="row mt-1">
                                <div class="col-md-8 offset-md-4">
                                    <small class="text-muted">
                                        Vous n'avez pas de compte ? 
                                        <router-link to="/register" >Inscription</router-link>
                                    </small>
                                </div>
                            </div>


                        </form>
                    </div>
                </div>
                
            </div>
        </div>-->
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