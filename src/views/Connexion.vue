<template>
    <div class="connexionForm">

        <div class="content">
            <img class="logo" src="../assets/icons/logoprojet.png" alt="">
            <h1 class="name">KUREO</h1>
            <p><span>K</span>eep<span>Y</span>our<span>E</span>yes<span>O</span>pen</p>
        </div>

        <div class="form-content">

            <form @submit.prevent="setConnexion()">
                <input v-model="login" type="text" name="txt_login" required placeholder="Saisir votre login">
                <br>
                <input v-model="password" type="password" name="txt_login" required placeholder="Saisir votre mot de passe">
                <br>
                <button class="buttonConn">CONNEXION</button>
            </form>
            <a class="ForgetPass" href=""><p>Mot de passe oublié</p></a>
            <router-link to="/inscription"><button class="buttonInsc">INSCRIPTION</button></router-link>
        </div>
        
    </div>

</template>

<script>
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            login: '',
            password:''
        }
    },

    methods: {
        setConnexion(){

            let token = Buffer.from(this.login+':'+this.password+'', 'utf8').toString('base64');

            if(this.login == "" || this.password == ""){
                alert('Veuillez saisir votre login où mot de passe')
            }else{
                api.post('/signIn',
                {
                }, {
                    headers:{
                        'Authorization' : 'Basic '+token
                    }
                }
                ).then(response=>
                {
                    console.log(response.data); //contenu des data
                    let decoded = jwt_decode(response.data);
                    this.$store.commit('setToken', response.data);
                    this.$store.commit('setUserCo', decoded);
                    console.log(decoded);
                    this.$router.push('/');
                }).catch(error=>
                {
                    alert("Veuillez saisir le bon login et password");
                })
            }
        }
    },
}
</script>


<style lang="scss">

div.connexionForm{
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    width: 80%;
    margin: auto;
    margin-top: 10%;

    & div.content{
        width: 70%;
        margin: auto;
        grid-column-start: 1;
        grid-column-end: 5;
        
        img{
            display: block;
            margin: auto;
        }

        h1.name{
            text-align:center;
        }

        p{
            text-align: center;

            span{
                color: rgb(110, 101, 230);
                font-size: 20px;
            }
        }
    }

    & div.form-content{
        width: 70%;
        border-radius: 10px;
        height: auto;
        box-shadow: 0px 0px 1em 0px;
        border: none;
        display: flex; justify-content: center; flex-direction: column; align-items: center;
        grid-column-start: 6;
        grid-column-end: 11;
        input{
            height: 3em;
            margin-top: 20px;
            border-radius: .7em;
            width: 80%;
            border: 1px solid #ccc;
            padding: .3em;
        }
        input:first-of-type{
            margin-top: 30px;
        }

        form {
            text-align: center; width: 100%;
        }

        button{
            margin-top: 1em;
            background-color: rgb(110, 101, 230);
            color: white;
            border: none;
            border-radius: 10px;
            padding: 1em;
            opacity: 0.9;
        }
        button:hover {
            cursor: pointer;
            opacity: 1;
            transition: 0.3s ease-in;
        }

        p{
            text-align: center;
            margin-top: 20px
        }
        button.buttonInsc{
            margin-bottom: 30px;
        }
    }
}
@media screen and (min-width:450px) and(max-width: 600px) {
    div.connexionForm{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 80%;
        margin: auto;
        //margin-top: 10%;

        & div.content{
            grid-column-start: 1;
            grid-column-end: 4;
        }
        & div.form-content{
            grid-column-start: 1;
            grid-column-end: 4;
            margin: auto;
            margin-top: 10%;
        }
    }       
}
    
</style>
