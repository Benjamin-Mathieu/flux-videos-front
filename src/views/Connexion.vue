<template>
    <div>
        <h1>Connexion à son compte</h1>
        <form @submit.prevent="connexionCompte">
        <div>
            <label>Login</label>
            <input v-model="username" required type="text" placeholder="Saisir votre Login">
        </div>
        <div>
            <label>Mot de passe</label>
            <input v-model="password" required type="text" placeholder="Saisir votre mot de passe">
        </div>
        <div>
            <button class="button">Connexion</button>
        </div>
        <div>
            Mot de passe oublié ?
        </div>
        </form>
        <div>
            <button class="button">Inscription</button>
        </div>
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            username : 'test',
            password : 'test'
        }
    },
    methods:
    {
        connexionCompte()
        {
            console.log(this.password)
            api.post('signin',{
                username: this.username,
                password : this.password
            }).then(response => {
                console.log(response.data.username)
                this.$store.commit('setUser',response.data.username);
                this.$store.commit('settoken',response.data.token);
                this.$router.push('/se-connecter');
            }).catch(error => {
                alert(error.response.data.message);
            })
        }
    }
}
</script>