import { createStore } from "vuex";

export default createStore({
  state: {
    uuidStream: ""
  },
  mutations: {
    setUuidStream(state, uuid) {
      state.uuidStream = uuid
    }
  },
  actions: {},
  modules: {}
});
