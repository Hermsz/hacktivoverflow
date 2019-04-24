<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
        </v-flex>
        <v-flex xs12 md4 style="border: 1px solid #C2C5C3; border-radius: 20px; margin-top: 100px"
          class="p-5 shadow">
          <div class="text-xs-center mb-4">
            <h3>Welcome back my Friend</h3>
          </div>
          <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules"
            required></v-text-field>
          <div class="text-center">
            <v-btn color="pink" class="text-light mt-2" @click="signIn">Sign In</v-btn><br>
            <span>No Account <router-link to='/register'>Register</router-link></span>
          </div>
        </v-flex>
        <v-flex xs12 md4>
          <div class="text-xs center">
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import axios from 'axios'
  let baseUrl = `http://localhost:3001`


  export default {
    data() {
      return {
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
        ]
      }
    },
    methods: {
      signIn() {
        this.$store.dispatch('signIn', {email: this.email, password: this.password})
        this.$router.push('/dashboard')
      }
    },
  }

</script>

<style>

</style>
