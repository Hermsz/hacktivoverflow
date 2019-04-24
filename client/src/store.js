import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
let baseUrl = `http://localhost:3001`
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(Vuex);
Vue.use(VueSweetalert2);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token') !== null,
    allQuestions: [],
  },
  mutations: {
    changeLoginState(state, data) {
      state.isLogin = true
      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.foundUser._id)
      localStorage.setItem('firstName', data.foundUser.firstName)
      Vue.swal({
        position: 'center',
        type: 'success',
        title: 'Success Login',
        showConfirmButton: false,
        timer: 1500
      })
      if (localStorage.getItem('token')) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    signOut(state) {
      localStorage.clear()
      state.isLogin = false
      Vue.swal({
        position: 'center',
        type: 'success',
        title: 'Success Sign Out',
        showConfirmButton: false,
        timer: 1500,
      });
    },
    getAllQuestions(state, payload) {
      state.allQuestions = payload;
    },
  },
  actions: {
    signIn({ commit, dispatch }, payload) {
      console.log('Masuk sign in store ');

      axios.post(`${baseUrl}/users/webLogin`, {
          email: payload.email,
          password: payload.password,
        })
        .then(({ data }) => {
          commit('changeLoginState', data)
          dispatch('getAllQuestions')
        })
        .catch(err => {
          Vue.swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
          console.log(err)
        })
    },
    getAllQuestions(context, payload) {
      axios.get(`${baseUrl}/questions`)
        .then(({ data }) => {
          context.commit('getAllQuestions', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
});
