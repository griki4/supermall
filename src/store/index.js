import Vue from "vue";
import Vuex from 'vuex'

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

Vue.use(Vuex)


const state = {
  cartList: []
}
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})


export default store
