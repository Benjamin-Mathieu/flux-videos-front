<template>
    <div>
        <h1>Connexion à son compte</h1>
        <form @submit.prevent="connexion">
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
        <div>
            <button class="button">Inscription</button>
        </div>
        </form>
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
            api.post('user/signin',{
                login: this.username,
                password : this.password
            }).then(response => {
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