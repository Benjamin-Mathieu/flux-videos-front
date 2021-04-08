<template>
  <div class="settings-form">
    <h1>Editer profil</h1>
      <form @submit.prevent="creerCompte">
        <input v-model="pseudo" required type="text" placeholder="Pseudo">
        <input v-model="description" required type="text" placeholder="Description">
        <form>
          <button>Enregistrer</button>
        </form>
      </form> 
  </div>
</template>

<script>
export default {
  data()
  {
    return{
      pseudo: '',
      description: ''
    }
  }
}
</script>

<style lang="scss">

  .settings-form{
    width: 30%;
    margin: auto;
    margin-top: 80px;
    box-shadow: 0px 0px 1em 0px;
    border-radius: .7em;
    padding: 1em;
    
    form {
      display: flex; justify-content: center;  flex-direction: column;

      input{
        width: 90%;
        height: 40px;
        margin: .7em 0;
        border-radius: .3em;
        border: 1px solid #CCC;
        padding: .3em;
      }

      form {
        display: flex; justify-content: center;  flex-direction: column;

        button{
          position: relative;
          left: 100px;
          right: 100px;
          width: 40%;
          height: 50px;
          color: white;
          background-color: rgb(110, 101, 230);
          border: none;
          border-radius: .3em;
          opacity: 0.9;
        }
      }
    }
  }
</style>