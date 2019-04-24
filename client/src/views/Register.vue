<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
        </v-flex>
        <v-flex xs12 md4 style="border: 1px solid #C2C5C3; border-radius: 20px; margin-top: 100px"
          class="p-5 shadow">
          <div class="text-xs-center mb-4">
            <h3>Register to discuss your brightest Idea</h3>
          </div>
          <v-text-field v-model="firstName" label="First Name" type="text" :rules="firstNameRules"
            required></v-text-field>
          <v-text-field v-model="lastName" label="Last Name" type="text" :rules="lastNameRules"
            required></v-text-field>
          <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" :rules="passwordRules"
            required></v-text-field>
          <div class="text-center">
            <v-btn color="pink" class="text-light mt-2" @click="register">Register</v-btn><br>
            <span>or go back to <router-link to='/login'>Login</router-link></span>
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
        firstName: '',
        firstNameRules: [
          v => !!v || 'First Name is required',
        ],
        lastName: '',
        lastNameRules: [
          v => !!v || 'Last Name is required',
        ],
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
      register() {
        axios.post(`${baseUrl}/users/register`, {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          })
          .then(newUser => {
            this.$swal({
              position: 'center',
              type: 'success',
              title: 'Success Register',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          })
      }
    },
  }

</script>

<style>

</style>
