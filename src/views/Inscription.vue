<template>
    <div class="inscription-form">
        <h1>Inscription</h1>
        <form @submit.prevent="creerCompte">
                <input v-model="name" required type="text" placeholder="Nom">
                <input v-model="firstname" required type="text" placeholder="Prénom">
                <input v-model="username" required type="text" placeholder="Pseudo">
                <input v-model="mail" required type="email" placeholder="Mail">
                <input v-model="password" required type="password" placeholder="Mot de passe">
                <input v-model="confirmPassword" required type="password" placeholder="Confirmer le mot de passe" ref="password">
                <span v-if="password != confirmPassword">Passwords don't match</span>
                <button>Créer mon compte</button>
        </form> 
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            name:'',
            firstname:'',
            username:'',
            mail:'',
            password:'',
            confirmPassword: ''
        }
    },
    methods:
    {
        creerCompte()
        {
            if(this.password == this.confirmPassword)
            {
                api.post('user',
                {
                    name: this.name,
                    firstname: this.firstname,
                    username: this.username,
                    mail: this.mail,
                    password: this.password
                }).then(response=>
                {
                    alert('Votre compte a été crée vous pouvez vous connecter');
                    console.log(response.data); //contenu des data
                    this.$router.push('/connexion');
                }).catch(error=>
                {
                    alert(error.response.data.message); //Contenu de de l'erreur
                })
            }
            else
            {
                this.$refs.passwords.classList.add("wrong-passwords");
            }
        }
    }
}
</script>

<style lang="scss">

.inscription-form{

    @media screen and (min-width:320px) and(max-width: 700px) {
        width: 70%;
    }
    
    width: 50%;
    margin: auto;
    margin-top: 80px;
    box-shadow: 0px 0px 1em 0px;
    border-radius: .7em;
    padding: 1em;

    form {
        display: flex; justify-content: center; align-items: center; flex-direction: column;

        span {
            color: #ff0033;
            font-size: small;
        }

        input{
            width: 90%;
            height: 40px;
            margin: .7em 0;
            border-radius: .3em;
            border: 1px solid #CCC;
            padding: .3em;
        }   
        button{
            width: 40%;
            height: 50px;
            color: white;
            background-color: rgb(110, 101, 230);
            border: none;
            border-radius: .3em;
            opacity: 0.9;
        }
        button:hover {
            cursor: pointer;
            opacity: 1;
            transition: .3s ease-in;
        }

        .wrong-passwords {
            border: 1px solid red;
        }
    }

    h1{
        text-align: center;
    }
}
    
</style>