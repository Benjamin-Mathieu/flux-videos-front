<template>
    <div class="connexionForm">

        <div class="content">
            <img class="logo" src="../assets/icons/logoprojet.png" alt="">
            <h1 class="name">KUREO</h1>
            <p><span>K</span>eep<span>Y</span>our<span>E</span>yes<span>O</span>pen</p>
        </div>

        <div class="form-content">

            <form @submit.prevent="setConnexion">
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
                    //this.$router.push('/se-connecter');
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
    margin-top: 10% ;
    

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
        margin: auto;
        border: 1px solid black;
        border-radius: 10px;
        height: auto;
        box-shadow: 0px 0px 50px 0px;
        grid-column-start: 5;
        grid-column-end: 11;

        input{
            width: 70%;
            height: 45px;
            margin-top: 20px;
            margin-left: 15%;
        }
        input:first-of-type{
            margin-top: 30px;
        }

        button{
            margin-top: 20px;
            width: 50%;
            height: 55px;
            margin-left: 25%;
            background-color: rgb(110, 101, 230);
            color: white;
            border-radius: 10px;
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
    
</style>
