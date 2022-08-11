<template>
    <div class="container register">
        <img src="/img/joey-thompson-4zN_-PKsbWw-unsplash.jpg" alt="">
        <div class="sidebar">
            <div class="sidebar-content">
                <h2>Tu nous as manqué !</h2>
                <p>Plus de 200 festivals attendent que tu en découvre plus sur eux !</p>
                <form>
                    <div class="input-text name">
                        <input id="name" type="name" class="form-control" v-model="name" required
                                           autofocus autocomplete="off" placeholder="Nom">
                        <!--<span>Email</span>-->
                    </div>
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
    <!--<div class="container">
        <div class="row jutify-content-center">
            <div class="col-md-8">
                

                <div class="card card-default">
                    <div class="card-header"><h5>Inscription</h5></div>
                    <div class="card-body">
                        <form>

                            <div class="form-group row">
                                <label for="name" class="col-sm-4 col-form-label text-md-right">Nom</label>
                                <div class="col-md-8">
                                    <input id="name" type="text" class="form-control" v-model="name" required
                                           autofocus autocomplete="off"  placeholder="Entrer votre prenom">
                                </div>
                            </div>

                            <div class="form-group row mt-1">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">Adresse mail</label>
                                <div class="col-md-8">
                                    <input id="email" type="email" class="form-control" v-model="email" required
                                           autofocus autocomplete="off" placeholder="Entrer votre mail">
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
                                        S'inscrire
                                    </button>
                                </div>
                            </div>

                            <div class="row mt-1">
                                <div class="col-md-8 offset-md-4">
                                    <small class="text-muted">
                                        Vous avez un compte ? 
                                        <router-link to="/login" >Connexion</router-link>
                                    </small>
                                </div>
                            </div>
                            
                            <p v-show="error">
                                Création du compte impossible
                            </p>


                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>-->
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
