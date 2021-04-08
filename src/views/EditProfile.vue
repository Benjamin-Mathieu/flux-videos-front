<template>
    <div>
        <div class="form">
            <h1>Modifier votre profil</h1>
            <form @submit.prevent="setEditProfile()">
                <input v-model="username" type="text" name="txt_username" required placeholder="Saisir votre login">
                <br>
                <textarea v-model="desc" name="txt_description" id=""  placeholder="Votre bio..."></textarea>
                <br>
                <button class="buttonModif">Modifier</button>
            </form>
        </div>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            username : this.$store.state.UserCo['username'],
            desc : this.$store.state.UserCo['description'],
        }
    },
    methods: {
        setEditProfile(){
            if(this.desc.length > 255){
                alert("Description trop grande veuillez ne pas dépasser les 255 caractères, vous en avez : "+this.desc.length)
            }else{
                api.put('/user/'+this.$store.state.UserCo['id'],
                {
                    username : this.username,
                    description : this.desc,
                }, {
                    headers:{
                        'Authorization' : 'Bearer '+this.$store.state.token
                    }
                }
                ).then(response=>
                {
                    let decoded = jwt_decode(response.data.token);
                    this.$store.commit('setToken', response.data.token);
                    this.$store.commit('setUserCo', decoded);
                    this.$router.push('/profile/'+this.$store.state.UserCo['id']);
                }).catch(error=>
                {
                    alert("error");
                })
            }

        }
    },
}
</script>

<style lang="scss">

div.form{
    width: 40%;
    margin: auto;
    margin-top: 80px;
    box-shadow: 0px 0px 1em 0px;
    border-radius: .7em;
    padding: 1em;

    h1{
        text-align: center;
    }

    input{
        display: block;
        height: 3em;
        margin: auto;
        margin-top: 20px;
        border-radius: .7em;
        width: 80%;
        border: 1px solid #ccc;
        padding: .3em;
    }

    textarea{
        display: block;
        width: 80%;
        margin: auto;
        height: 15em;
        border: 1px solid #ccc;
        border-radius: .7em;
    }

    button{
        display:block;
        margin: auto;
        margin-top: 1em;
        background-color: rgb(110, 101, 230);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 1em;
        opacity: 0.9;
        width: 40%;
    }
    button:hover {
        cursor: pointer;
        opacity: 1;
        transition: 0.3s ease-in;
    }
}
    
</style>