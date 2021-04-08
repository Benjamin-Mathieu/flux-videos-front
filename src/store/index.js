import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage : window.localStorage
})


export default createStore({
  plugins : [vuexLocal.plugin],
  state: {
    streams_public: [],
    streams_urgency: [],
    videos: [],
    token : false,
    UserCo : false,
  },
  mutations: {
    setStreams(state,streams_public, streams_urgency)
    {
      state.streams_public= streams_public;
      state.streams_urgency= streams_urgency;
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
