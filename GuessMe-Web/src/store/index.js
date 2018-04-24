import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'

const state = {
  id: '',
  token: ''
};

Vue.use(Vuex)

const mutations = {
  [type.CHANGE_ID] (state, newValue){
    state.id = newValue;
  },
  [type.CHANGE_TOKEN] (state, newValue){
    state.token = newValue;
  }
};



export default new Vuex.Store({
  state,
  mutations
})