<template>
    <div class="editcard">
        <div class="card-body">
            <div class="d-flex justify-content-between pb-2 mb-2">
                <div class="back">
                    <router-link :to="{name: 'posts'}" class="btn btn-success">&#x2190;</router-link>
                    <h5 class="card-title">Éditez votre profil</h5>
                </div>
            </div>

            <div v-if="strSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>{{strSuccess}}</strong>
            </div>

            <div v-if="strError" class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <strong>{{strError}}</strong>
            </div>


            <form @submit.prevent="updateUser" enctype="multipart/form-data" method="POST">
                <div class="form-group input-text">
                    <input type="text" class="form-control" v-model="username" placeholder="Votre nom">
                </div>

                <div class="form-group input-text">
                    <input type="text" class="form-control" v-model="useremail" placeholder="Votre Email">
                </div>


                <button type="submit" class="btn btn-primary mt-4 mb-4">Mettre à jour</button>
            </form>
            
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            id:'',
            username: window.Laravel.user.name,
            useremail: window.Laravel.user.email,
            strError: '',
            strSuccess: ''
        }
    },

    created() {
    },
    methods: {
        updateUser(e) {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                const formData = new FormData();
                formData.append('name', this.username);
                formData.append('email', this.useremail);

                this.$axios.post(`/api/user/edit/${window.Laravel.user.id}`, formData, config)
                .then(response => {
                    existingObj.strError = "";
                    window.location.href = "/"
                })
                .catch(function(error) {
                    existingObj.strSuccess = "";
                    existingObj.strError = error.response.data.message;
                });
            });
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