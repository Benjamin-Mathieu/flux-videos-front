import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage : window.localStorage
})


export default createStore({
  plugins : [vuexLocal.plugin],
  state: {
    streams: [],
    videos: [],
    token : false,
    UserCo : false,
  },
  mutations: {
    setStreams(state,streams)
    {
      state.streams= streams;
    },
    setVideos(state,videos)
    {
      state.videos= videos;
    },

    setToken(state,token)
    {
      state.token= token;
    },

    setUserCo(state,UserCo)
    {
      state.UserCo= UserCo;
    }
  },
  actions: {
  },
  modules: {
  }
})
