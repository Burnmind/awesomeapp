import { createStore } from 'vuex'

import { AppData } from '@/types';

import main from './pages/main'
import readingClub from './pages/reading-club'

export default createStore({
  state: {
      isAuth: false
  } as AppData,
  mutations: {
      setAuth(state, payload) {
          state.isAuth = payload;
      }
  },
  actions: {
      setData({ commit }) {
          // @ts-ignore
          if (APP_DATA) {
              // @ts-ignore
              const data = APP_DATA as AppData;

              commit('setAuth', data.isAuth);
          }
      }
  },
  modules: {
      main,
      readingClub
  }
})
