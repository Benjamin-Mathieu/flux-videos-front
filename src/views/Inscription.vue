<template>
    <div>
        <h1>Créer un compte</h1>
        <form @submit.prevent="creerCompte">
        <div>
            <label>Nom</label>
            <input v-model="name" required type="text" placeholder="Nom">
        </div>
        <div>
            <label>Prénom</label>
            <input v-model="firstname" required type="text" placeholder="Prénom">
        </div>
        <div>
            <label>Pseudo</label>
            <input v-model="username" required type="text" placeholder="Pseudo">
        </div>
        <div>
            <label>Mail</label>
            <input v-model="mail" required type="email" placeholder="Mail">
        </div>
        <div>
            <label>Mot de passe</label>
            <input v-model="password" required type="password" placeholder="Mot de passe">
        </div>
        <div>
            <label>Confirmer mot de passe</label>
            <input v-model="confirmPassword" required type="password" placeholder="Confirmer le mot de passe">
        </div>
        <div>
            <button class="button">Créer mon compte</button>
        </div>
        </form>
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            name:'dzazad',
            firstname:'dazadzadz',
            username:'dazadzadz',
            mail:'dazadz@mdr.fr',
            password:'mdr',
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
                    //this.$router.push('/se-connecter');
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