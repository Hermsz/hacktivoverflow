<template>
    <v-card>
      <v-card-title>
        <h2>Ask a Question</h2>
      </v-card-title>
      <v-form class="px-3">
        <v-text-field label="title" v-model="title"></v-text-field>
        <v-text-field label="description" v-model="description"></v-text-field>
        <v-btn flat class="success mx-0 mt-3" @click="addquestion">Add Question</v-btn>
      </v-form>
    </v-card>
</template>

<script>
import axios from 'axios'
let baseUrl = `http://localhost:3001`

export default {
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addquestion() {
      axios.post(`${baseUrl}/questions`, {
        title: this.title,
        description: this.description,
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        console.log(`Berhasil add Question`)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style>

</style>
