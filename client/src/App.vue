<template>
  <v-app>

    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase font-weight-bold">
        <span>Hacktiv</span>
        <span class="font-weight-light"> OVERFLOW</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat small dark color="error" style="width: 0.2%" v-on:click="signOut" v-if="isLogin">
        <span>Sign Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn flat small dark color="success" ma-0 v-on:click="changePage('/addQuestion')"
        v-if="isLogin">
        <span>Ask Question</span>
        <v-icon>create</v-icon>
      </v-btn>
      <v-btn flat small dark color="success" ma-0 v-on:click="changePage('/login')" v-if="!isLogin">
        <span>Login</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn flat small dark color="warning" ma-0 v-on:click="changePage('/register')" v-if="!isLogin">
        <span>Register</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-btn flat small dark color="success" ma-0 v-on:click="changePage('/dashboard')"
        v-if="isLogin">
        <span>Dashboard</span>
      </v-btn>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  let baseUrl = `http://localhost:3001`

  export default {
    name: 'App',
    components: {

    },
    data() {
      return {
        //
      }
    },
    methods: {
      signOut() {
        this.$store.commit('signOut')
        this.$router.push('/')
      },
      changePage(path) {
        this.$router.push(path)
      }
    },
    computed: mapState(['isLogin']),
  }

</script>
