<template>
  <section>
    <div v-if="this.isOpen"  class="sidebar">
      <img
        class="icons"
        src="../assets/icons/home-white-36dp.svg"
        alt="Acceuil"
      /><router-link to="/" class="link">Accueil</router-link>
      <img
        class="icons"
        src="../assets/icons/library_add-white-36dp.svg"
        alt="Bibliothéques"
      /><router-link to="/video">Bibliothéques</router-link>
      <img
        class="icons"
        src="../assets/icons/subscriptions-white-36dp.svg"
        alt="Abonnements"
      /><router-link to="/subs">Abonnements</router-link>
      <img
        class="icons"
        src="../assets/icons/settings-white-36dp.svg"
        alt="Paramètres"
      /><router-link to="/settings">Paramètres</router-link>
    </div>

  </section>
</template>

<script>
export default {
  props:['isOpen'],
  mounted() {

  },
};
</script>

<style lang="scss" >

.sidebar {
  width: 10%;
  background-color: #474747;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: height 0.15, ease-out;
  position: absolute;
  top: 80px;
  left: 0%;

  a {
    color: whitesmoke;
  }
  .icons {
    vertical-align: middle;
    margin-top: 1em;
  }
}

.sidebar-toggled-of {
  height : 0px;
  transition: height 0.25s ease-in;
}

.sidebar-toggled-on {
  height : 300px;
  transition: height 0.25s ease-in;
}
</style>
