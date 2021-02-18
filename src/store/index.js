import { createStore } from 'vuex'

export default createStore({
  state: {
    streams: [],
    videos: []
  },
  mutations: {
    setStreams(state,streams)
    {
      state.streams= streams;
    },
    setVideos(state,videos)
    {
      state.videos= videos;
    }
  },
  actions: {
  },
  modules: {
  }
})
