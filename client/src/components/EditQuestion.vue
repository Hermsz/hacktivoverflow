<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success" > Update </v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit Question</h2>
      </v-card-title>
      <v-form class="px-3">
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-text-field label="Description" v-model="description"></v-text-field>
        <v-btn flat class="success mx-0 mt-3" @click="editQuestion">Edit</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  let baseUrl = `http://localhost:3001`
  
export default {
  created() {
    this.populateForm()
  },
  props: ['questionId'],
  data() {
    return {
      title: this.productName,
      description: this.description,
    }
  },
  methods: {

    populateForm() {
      axios.get(`${baseUrl}/questions/${this.questionId}`)
      .then(({ data }) => {
        console.log(data)
        this.title = data.title
        this.description = data.description

        console.log(`Success`)
      })
      .catch(err => {
        console.log(err.message)
      })
    },
    editQuestion() {

      let updatedQuestion = {
        title : this.title,
        description : this.description
      }

      axios.put(`${baseUrl}/questions/${this.questionId}`, updatedQuestion, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log('success Update')
        console.log(data)
          Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Success Update',
              showConfirmButton: false,
              timer: 500
            })
      this.$store.dispatch('getAllQuestions')

      })
      .catch(err => {
        console.log(`Error di update =====`)
        console.log(err.response)
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'You cannot upvote twice!',
            })
      })

    },

  }
}
</script>

<style>

</style>


