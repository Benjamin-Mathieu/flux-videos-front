<template>
  <header>
    <button @click="toggleSidebar">
      <img class="icons" src="../assets/icons/menu-white-36dp.svg" alt="menu" />
    </button>
    <form action="" class="search">
      <input type="text" placeholder="Rechercher" />
      <img
        class="icons"
        src="../assets/icons/search-black-36dp.svg"
        alt="search"
      />
    </form>
    <button class="stream-buttons">URGENCE</button>
    <button class="stream-buttons">
      <router-link to="/stream">Lancer Stream</router-link>
    </button>
    <!--<button class="stream-buttons">
      <router-link to="/stream">Regarder Stream</router-link>
    </button>-->
    <img
      class="icons"
      src="../assets/icons/notifications_none-white-36dp.svg"
      alt="notifications"
    />
    <img
      class="icons"
      src="../assets/icons/account_circle-white-36dp.svg"
      alt="profil"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      sidebarOpen: true
    };
  },

  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      this.emitter.emit("toggle-sidebar", this.sidebarOpen);
    }
  }
};
</script>

<style lang="scss">
header {
  height: 80px;
  background-color: #474747;
  display: flex;
  justify-content: center;
  align-items: center;

  .icons {
    height: 30px;
    width: 30px;
  }

  .stream-buttons {
    background-color: #ff2828;
    color: whitesmoke;
    padding: 0.7em;
    border-radius: 0.3em;
    border: none;
    margin: 1em;
  }

  form.search {
    position: relative;
    margin-right: auto;
    display: flex;
    align-items: center;

    img {
      transform: translateX(-30px);
    }

    input[type="text"] {
      height: 100%;
      width: 150px;
      padding: 0.5em;
      font-size: 1em;
      border: 1px solid grey;
      float: left;
      background: #f1f1f1;
      transition: width 0.7s ease-in-out;
    }

    input[type="text"]:focus {
      width: 600px;
    }
  }
}
</style>
