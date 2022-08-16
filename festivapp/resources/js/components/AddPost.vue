<template>

    <div class="editcard">
        <div class="card-body">
            <div class="d-flex justify-content-between pb-2 mb-2">
                <div class="back">
                    <router-link :to="{name: 'posts'}" class="btn btn-success">&#x2190;</router-link>
                    <h5 class="card-title">Nouveau post</h5>
                </div>
            </div>

            <div v-if="strSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{{strSuccess}}</strong>
            </div>

            <div v-if="strError" class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{{strError}}</strong>
            </div>


            <form @submit.prevent="addPost" enctype="multipart/form-data">
                <div class="input-text">
                    <input type="text" class="form-control" v-model="name" placeholder="Nom">
                </div>

                <div class="input-text mb-2">
                   <textarea class="form-control" rows="3" v-model="description" placeholder="Description"></textarea>
                </div>

                <div class="input-text form-gorup mb-2">
                    <input type="file" class="form-control mb-2" v-on:change="onChange">

                    <div v-if="img">
                        <img v-bind:src="imgPreview" width="100" height="100"/>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary mt-4 mb-4"> Add Post</button>

            </form>
            
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            name: '',
            description: '',
            img: '',
            strSuccess: '',
            strError: '',
            imgPreview: null
        }
    },
    methods: {
        onChange(e) {
            this.img = e.target.files[0];
            let reader = new FileReader();
            reader.addEventListener("load", function () {
                this.imgPreview = reader.result;
            }.bind(this), false);

            if (this.img) {
                if ( /\.(jpe?g|png|gif)$/i.test( this.img.name ) ) {
                    reader.readAsDataURL( this.img );
                }
            }
        },
        addPost(e) {
            this.$axios.get('/sanctum/csrf-cookie').then(response => {
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }

                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('description', this.description);
                formData.append('file', this.img);
                formData.append('userid', window.Laravel.user.id)

                this.$axios.post('/api/posts/add', formData, config)
                .then(response => {
                    existingObj.strError = "";
                    existingObj.strSuccess = response.data.success;
                })
                .catch(function(error) {
                    existingObj.strSuccess ="";
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