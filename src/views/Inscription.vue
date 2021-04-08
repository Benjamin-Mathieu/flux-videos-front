<template>
    <div>
        <div class="content">

            <h1>Inscription</h1>
            <form @submit.prevent="creerCompte">
            <div>
                <input v-model="name" required type="text" placeholder="Nom">
            </div>
            <div>
                <input v-model="firstname" required type="text" placeholder="Prénom">
            </div>
            <div>
                <input v-model="username" required type="text" placeholder="Pseudo">
            </div>
            <div>
                <input v-model="mail" required type="email" placeholder="Mail">
            </div>
            <div>
                <input v-model="password" required type="password" placeholder="Mot de passe">
            </div>
            <div>
                <input v-model="confirmPassword" required type="password" placeholder="Confirmer le mot de passe">
            </div>
            <div>
                <button class="button">Créer mon compte</button>
            </div>
            </form>

        </div>

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
                alert('Erreur de confirmation de mot de passe');
            }
        }
    }
}
</script>

<style lang="scss">

div.content{
    border: 1px solid black;
    width: 30%;
    margin: auto;
    margin-top: 80px;
    box-shadow: 0px 0px 50px 0px;
    

    h1{
        text-align: center;
    }
    input{
        width: 80%;
        height: 40px;
        margin-top: 30px;
        margin-left: 10%
    }
    button{
        width: 40%;
        height: 50px;
        color: white;
        background-color: rgb(110, 101, 230);
        margin-top: 30px;
        margin-left: 30%;
        margin-bottom: 30px;
    }
}
    
</style>